"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Game, GamePlayer, WordCard, Clue, GameEvent } from "@/lib/types"
import type { RealtimeChannel } from "@supabase/supabase-js"

interface RealtimeGameState {
  game: Game | null
  players: GamePlayer[]
  wordCards: WordCard[]
  clues: Clue[]
  events: GameEvent[]
  isConnected: boolean
  isLoading: boolean
  error: string | null
}

export function useRealtimeGame(gameId: string) {
  const [state, setState] = useState<RealtimeGameState>({
    game: null,
    players: [],
    wordCards: [],
    clues: [],
    events: [],
    isConnected: false,
    isLoading: true,
    error: null,
  })

  const supabase = createClient()
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)

  // Load initial game data
  const loadGameData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      // Load game
      const { data: game, error: gameError } = await supabase.from("games").select("*").eq("id", gameId).single()

      if (gameError) throw gameError

      // Load players
      const { data: players, error: playersError } = await supabase
        .from("game_players")
        .select("*")
        .eq("game_id", gameId)

      if (playersError) throw playersError

      // Load word cards
      const { data: wordCards, error: cardsError } = await supabase
        .from("word_cards")
        .select("*")
        .eq("game_id", gameId)
        .order("position")

      if (cardsError) throw cardsError

      // Load clues
      const { data: clues, error: cluesError } = await supabase
        .from("clues")
        .select("*")
        .eq("game_id", gameId)
        .order("created_at")

      if (cluesError) throw cluesError

      // Load recent events
      const { data: events, error: eventsError } = await supabase
        .from("game_events")
        .select("*")
        .eq("game_id", gameId)
        .order("created_at", { ascending: false })
        .limit(50)

      if (eventsError) throw eventsError

      setState((prev) => ({
        ...prev,
        game,
        players: players || [],
        wordCards: wordCards || [],
        clues: clues || [],
        events: events || [],
        isLoading: false,
      }))
    } catch (error) {
      console.error("Error loading game data:", error)
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to load game data",
        isLoading: false,
      }))
    }
  }, [gameId, supabase])

  // Set up real-time subscriptions
  useEffect(() => {
    if (!gameId) return

    const gameChannel = supabase.channel(`game:${gameId}`)

    // Subscribe to game updates
    gameChannel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "games",
          filter: `id=eq.${gameId}`,
        },
        (payload) => {
          console.log("Game update:", payload)
          if (payload.eventType === "UPDATE" && payload.new) {
            setState((prev) => ({
              ...prev,
              game: payload.new as Game,
            }))
          }
        },
      )
      // Subscribe to player updates
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "game_players",
          filter: `game_id=eq.${gameId}`,
        },
        (payload) => {
          console.log("Player update:", payload)
          setState((prev) => {
            let newPlayers = [...prev.players]
            if (payload.eventType === "INSERT" && payload.new) {
              newPlayers.push(payload.new as GamePlayer)
            } else if (payload.eventType === "DELETE" && payload.old) {
              newPlayers = newPlayers.filter((p) => p.id !== payload.old.id)
            } else if (payload.eventType === "UPDATE" && payload.new) {
              const index = newPlayers.findIndex((p) => p.id === payload.new.id)
              if (index !== -1) {
                newPlayers[index] = payload.new as GamePlayer
              }
            }
            return { ...prev, players: newPlayers }
          })
        },
      )
      // Subscribe to word card updates
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "word_cards",
          filter: `game_id=eq.${gameId}`,
        },
        (payload) => {
          console.log("Card update:", payload)
          if (payload.eventType === "UPDATE" && payload.new) {
            setState((prev) => ({
              ...prev,
              wordCards: prev.wordCards.map((card) => (card.id === payload.new.id ? (payload.new as WordCard) : card)),
            }))
          }
        },
      )
      // Subscribe to clue updates
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "clues",
          filter: `game_id=eq.${gameId}`,
        },
        (payload) => {
          console.log("Clue update:", payload)
          if (payload.eventType === "INSERT" && payload.new) {
            setState((prev) => ({
              ...prev,
              clues: [...prev.clues, payload.new as Clue],
            }))
          }
        },
      )
      // Subscribe to game events
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "game_events",
          filter: `game_id=eq.${gameId}`,
        },
        (payload) => {
          console.log("Game event:", payload)
          if (payload.new) {
            setState((prev) => ({
              ...prev,
              events: [payload.new as GameEvent, ...prev.events.slice(0, 49)],
            }))
          }
        },
      )
      .subscribe((status) => {
        console.log("Subscription status:", status)
        setState((prev) => ({
          ...prev,
          isConnected: status === "SUBSCRIBED",
        }))
      })

    setChannel(gameChannel)

    // Load initial data
    loadGameData()

    return () => {
      gameChannel.unsubscribe()
    }
  }, [gameId, supabase, loadGameData])

  // Game actions
  const joinGame = useCallback(
    async (playerId: string, playerName: string, team: "red" | "blue", role: "spymaster" | "operative") => {
      try {
        const { error } = await supabase.from("game_players").insert({
          game_id: gameId,
          player_id: playerId,
          team,
          role,
        })

        if (error) throw error

        // Log event
        await supabase.from("game_events").insert({
          game_id: gameId,
          event_type: "player_joined",
          player_id: playerId,
          event_data: { player_name: playerName, team, role },
        })

        return { success: true }
      } catch (error) {
        console.error("Error joining game:", error)
        return { success: false, error: error instanceof Error ? error.message : "Failed to join game" }
      }
    },
    [gameId, supabase],
  )

  const leaveGame = useCallback(
    async (playerId: string) => {
      try {
        const { error } = await supabase.from("game_players").delete().eq("game_id", gameId).eq("player_id", playerId)

        if (error) throw error

        // Log event
        await supabase.from("game_events").insert({
          game_id: gameId,
          event_type: "player_left",
          player_id: playerId,
          event_data: {},
        })

        return { success: true }
      } catch (error) {
        console.error("Error leaving game:", error)
        return { success: false, error: error instanceof Error ? error.message : "Failed to leave game" }
      }
    },
    [gameId, supabase],
  )

  const giveClue = useCallback(
    async (spymasterId: string, clueWord: string, clueNumber: number) => {
      try {
        const { data, error } = await supabase
          .from("clues")
          .insert({
            game_id: gameId,
            spymaster_id: spymasterId,
            team: state.game?.current_turn || "red",
            clue_word: clueWord,
            clue_number: clueNumber,
            turn_number: state.clues.length + 1,
          })
          .select()
          .single()

        if (error) throw error

        // Log event
        await supabase.from("game_events").insert({
          game_id: gameId,
          event_type: "clue_given",
          player_id: spymasterId,
          event_data: { clue_word: clueWord, clue_number: clueNumber },
        })

        return { success: true, data }
      } catch (error) {
        console.error("Error giving clue:", error)
        return { success: false, error: error instanceof Error ? error.message : "Failed to give clue" }
      }
    },
    [gameId, supabase, state.game?.current_turn, state.clues.length],
  )

  const revealCard = useCallback(
    async (cardId: string, playerId: string) => {
      try {
        const { data, error } = await supabase
          .from("word_cards")
          .update({
            revealed: true,
            revealed_at: new Date().toISOString(),
            revealed_by: playerId,
          })
          .eq("id", cardId)
          .select()
          .single()

        if (error) throw error

        // Log event
        await supabase.from("game_events").insert({
          game_id: gameId,
          event_type: "card_revealed",
          player_id: playerId,
          event_data: { card_id: cardId, word: data.german_word },
        })

        return { success: true, data }
      } catch (error) {
        console.error("Error revealing card:", error)
        return { success: false, error: error instanceof Error ? error.message : "Failed to reveal card" }
      }
    },
    [gameId, supabase],
  )

  const updateGameState = useCallback(
    async (updates: Partial<Game>) => {
      try {
        const { data, error } = await supabase
          .from("games")
          .update({
            ...updates,
            updated_at: new Date().toISOString(),
          })
          .eq("id", gameId)
          .select()
          .single()

        if (error) throw error

        return { success: true, data }
      } catch (error) {
        console.error("Error updating game:", error)
        return { success: false, error: error instanceof Error ? error.message : "Failed to update game" }
      }
    },
    [gameId, supabase],
  )

  return {
    ...state,
    actions: {
      joinGame,
      leaveGame,
      giveClue,
      revealCard,
      updateGameState,
      refresh: loadGameData,
    },
  }
}
