"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { GameLogic } from "@/lib/game-logic"
import type { Game } from "@/lib/types"

interface LobbyState {
  activeGames: Game[]
  isLoading: boolean
  error: string | null
}

export function useGameLobby() {
  const [state, setState] = useState<LobbyState>({
    activeGames: [],
    isLoading: true,
    error: null,
  })

  const supabase = createClient()

  const loadActiveGames = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      const { data, error } = await supabase
        .from("games")
        .select(
          `
          *,
          game_players(count)
        `,
        )
        .in("status", ["waiting", "in_progress"])
        .order("created_at", { ascending: false })
        .limit(20)

      if (error) throw error

      setState((prev) => ({
        ...prev,
        activeGames: data || [],
        isLoading: false,
      }))
    } catch (error) {
      console.error("Error loading active games:", error)
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to load games",
        isLoading: false,
      }))
    }
  }, [supabase])

  const createGame = useCallback(
    async (creatorId: string, difficultyLevel: "beginner" | "intermediate" | "advanced" = "beginner") => {
      try {
        const roomCode = GameLogic.generateRoomCode()

        // Create the game
        const { data: game, error: gameError } = await supabase
          .from("games")
          .insert({
            room_code: roomCode,
            status: "waiting",
            difficulty_level: difficultyLevel,
            red_score: 0,
            blue_score: 0,
          })
          .select()
          .single()

        if (gameError) throw gameError

        // Add creator as first player
        const { error: playerError } = await supabase.from("game_players").insert({
          game_id: game.id,
          player_id: creatorId,
          team: "red",
          role: "operative",
        })

        if (playerError) throw playerError

        // Generate word cards for the game
        const { data: vocabularyWords, error: vocabError } = await supabase
          .from("vocabulary_words")
          .select("german_word, english_translation")
          .eq("difficulty_level", difficultyLevel)
          .limit(50)

        if (vocabError) throw vocabError

        if (vocabularyWords && vocabularyWords.length >= 25) {
          const wordCards = GameLogic.createGameBoard(vocabularyWords)
          const cardsWithGameId = wordCards.map((card) => ({
            ...card,
            game_id: game.id,
          }))

          const { error: cardsError } = await supabase.from("word_cards").insert(cardsWithGameId)

          if (cardsError) throw cardsError
        }

        await loadActiveGames()
        return { success: true, game }
      } catch (error) {
        console.error("Error creating game:", error)
        return { success: false, error: error instanceof Error ? error.message : "Failed to create game" }
      }
    },
    [supabase, loadActiveGames],
  )

  const joinGameByCode = useCallback(
    async (roomCode: string, playerId: string, playerName: string) => {
      try {
        // Find the game
        const { data: game, error: gameError } = await supabase
          .from("games")
          .select("*")
          .eq("room_code", roomCode.toUpperCase())
          .eq("status", "waiting")
          .single()

        if (gameError) throw gameError

        // Check if player is already in the game
        const { data: existingPlayer } = await supabase
          .from("game_players")
          .select("*")
          .eq("game_id", game.id)
          .eq("player_id", playerId)
          .single()

        if (existingPlayer) {
          return { success: true, game, alreadyJoined: true }
        }

        // Count current players by team
        const { data: players, error: playersError } = await supabase
          .from("game_players")
          .select("team")
          .eq("game_id", game.id)

        if (playersError) throw playersError

        const redCount = players?.filter((p) => p.team === "red").length || 0
        const blueCount = players?.filter((p) => p.team === "blue").length || 0

        // Assign to team with fewer players
        const team = redCount <= blueCount ? "red" : "blue"

        // Add player to game
        const { error: joinError } = await supabase.from("game_players").insert({
          game_id: game.id,
          player_id: playerId,
          team,
          role: "operative",
        })

        if (joinError) throw joinError

        // Log event
        await supabase.from("game_events").insert({
          game_id: game.id,
          event_type: "player_joined",
          player_id: playerId,
          event_data: { player_name: playerName, team, role: "operative" },
        })

        await loadActiveGames()
        return { success: true, game }
      } catch (error) {
        console.error("Error joining game:", error)
        return { success: false, error: error instanceof Error ? error.message : "Failed to join game" }
      }
    },
    [supabase, loadActiveGames],
  )

  // Set up real-time subscription for lobby updates
  useEffect(() => {
    const channel = supabase
      .channel("lobby")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "games",
        },
        () => {
          loadActiveGames()
        },
      )
      .subscribe()

    loadActiveGames()

    return () => {
      channel.unsubscribe()
    }
  }, [supabase, loadActiveGames])

  return {
    ...state,
    actions: {
      createGame,
      joinGameByCode,
      refresh: loadActiveGames,
    },
  }
}
