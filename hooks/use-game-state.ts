"use client"

import { useState, useCallback } from "react"
import { type GameState, GameLogic } from "@/lib/game-logic"

export function useGameState(initialState: GameState) {
  const [gameState, setGameState] = useState<GameState>(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const giveClue = useCallback(
    async (spymasterId: string, clueWord: string, clueNumber: number) => {
      setIsLoading(true)
      setError(null)

      try {
        const result = GameLogic.giveClue(gameState, spymasterId, clueWord, clueNumber)

        if (result.success && result.newState) {
          setGameState(result.newState)
          // TODO: Sync with Supabase
          return { success: true }
        } else {
          setError(result.error || "Failed to give clue")
          return { success: false, error: result.error }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error"
        setError(errorMessage)
        return { success: false, error: errorMessage }
      } finally {
        setIsLoading(false)
      }
    },
    [gameState],
  )

  const makeGuess = useCallback(
    async (playerId: string, cardId: string) => {
      setIsLoading(true)
      setError(null)

      try {
        const result = GameLogic.makeGuess(gameState, playerId, cardId)

        if (result.success && result.newState) {
          setGameState(result.newState)
          // TODO: Sync with Supabase
          return { success: true, newState: result.newState }
        } else {
          setError(result.error || "Failed to make guess")
          return { success: false, error: result.error }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error"
        setError(errorMessage)
        return { success: false, error: errorMessage }
      } finally {
        setIsLoading(false)
      }
    },
    [gameState],
  )

  const endTurn = useCallback(
    async (playerId: string) => {
      setIsLoading(true)
      setError(null)

      try {
        const result = GameLogic.endTurn(gameState, playerId)

        if (result.success && result.newState) {
          setGameState(result.newState)
          // TODO: Sync with Supabase
          return { success: true }
        } else {
          setError(result.error || "Failed to end turn")
          return { success: false, error: result.error }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error"
        setError(errorMessage)
        return { success: false, error: errorMessage }
      } finally {
        setIsLoading(false)
      }
    },
    [gameState],
  )

  const canPlayerAct = useCallback(
    (playerId: string, action: "give_clue" | "make_guess" | "end_turn") => {
      return GameLogic.canPlayerAct(gameState, playerId, action)
    },
    [gameState],
  )

  const getGameStats = useCallback(() => {
    return GameLogic.getGameStats(gameState)
  }, [gameState])

  return {
    gameState,
    isLoading,
    error,
    giveClue,
    makeGuess,
    endTurn,
    canPlayerAct,
    getGameStats,
    setError,
  }
}
