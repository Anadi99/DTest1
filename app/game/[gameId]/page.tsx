"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Settings, Users, Crown } from "lucide-react"
import { GameBoard } from "@/components/game/game-board"
import { useGameState } from "@/hooks/use-game-state"
import { useRouter } from "next/navigation"
import { RulesModal } from "@/components/game/rules-modal"
import { GameTimer } from "@/components/game/game-timer"
import { GameLog, type GameLogEvent } from "@/components/game/game-log"
import type { GameState } from "@/lib/game-logic"
import { GameLogic } from "@/lib/game-logic"
import cn from "classnames"

interface GamePageProps {
  params: { gameId: string }
}

interface ChatMessage {
  id: string
  playerId: string
  playerName: string
  role: "spymaster" | "operative"
  message: string
  timestamp: Date
  isClue?: boolean
  clueNumber?: number
}

export default function GamePage({ params }: GamePageProps) {
  const [gameId] = useState<string>(params.gameId)
  const [currentClue, setCurrentClue] = useState("")
  const [clueNumber, setClueNumber] = useState("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  
  // Timer settings (in a real app, these would come from game settings)
  const [timerEnabled, setTimerEnabled] = useState(true)
  const [clueTimeLimit] = useState(60)
  const [guessTimeLimit] = useState(120)
  // Game start time for duration tracking
  const [gameStartTime] = useState(new Date())
  
  // Enhanced game events with metadata
  const [gameEvents, setGameEvents] = useState<GameLogEvent[]>([
    {
      id: "1",
      type: "game_start",
      message: "Game started - Red team goes first",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      team: "red",
    },
    {
      id: "2",
      type: "clue_given",
      message: 'Red Spymaster gave clue: "Tiere" - 2',
      timestamp: new Date(Date.now() - 240000), // 4 minutes ago
      team: "red",
      player: "Spymaster",
      metadata: {
        clue: "Tiere",
        clueNumber: 2,
        playerId: "player2",
        playerName: "Spymaster"
      }
    },
    {
      id: "3",
      type: "card_revealed",
      message: 'Red team revealed "Katze" (Cat) - Correct!',
      timestamp: new Date(Date.now() - 180000), // 3 minutes ago
      team: "red",
      metadata: {
        cardWord: "Katze",
        cardType: "red",
        isCorrect: true
      }
    },
    {
      id: "4",
      type: "card_revealed",
      message: 'Red team revealed "Hund" (Dog) - Correct!',
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
      team: "red",
      metadata: {
        cardWord: "Hund",
        cardType: "red",
        isCorrect: true
      }
    },
    {
      id: "5",
      type: "turn_ended",
      message: "Red team ended their turn",
      timestamp: new Date(Date.now() - 60000), // 1 minute ago
      team: "red",
    },
    {
      id: "6",
      type: "clue_given",
      message: 'Blue Spymaster gave clue: "Getränke" - 1',
      timestamp: new Date(Date.now() - 30000), // 30 seconds ago
      team: "blue",
      player: "Spymaster",
      metadata: {
        clue: "Getränke",
        clueNumber: 1,
        playerId: "player4",
        playerName: "Spymaster"
      }
    },
  ])

  const router = useRouter()

  // Create a proper game state with real German word cards
  const createInitialGameState = (): GameState => {
    // Generate word cards for the game
    const wordCards = GameLogic.createGameBoard("beginner", gameId)
    
    // Calculate initial scores based on revealed cards
    const redScore = wordCards.filter(c => c.card_type === "red" && c.revealed).length
    const blueScore = wordCards.filter(c => c.card_type === "blue" && c.revealed).length
    
    return {
      game: {
        id: gameId,
        room_code: GameLogic.generateRoomCode(),
        status: "in_progress",
        current_turn: "red", // Red team always starts first
        red_spymaster: "player2",
        blue_spymaster: "player4",
        red_score: redScore,
        blue_score: blueScore,
        difficulty_level: "beginner",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      players: [
        {
          id: "1",
          game_id: gameId,
          player_id: "player1",
          team: "red",
          role: "operative",
          joined_at: new Date().toISOString(),
        },
        {
          id: "2",
          game_id: gameId,
          player_id: "player2",
          team: "red",
          role: "spymaster",
          joined_at: new Date().toISOString(),
        },
        {
          id: "3",
          game_id: gameId,
          player_id: "player3",
          team: "blue",
          role: "operative",
          joined_at: new Date().toISOString(),
        },
        {
          id: "4",
          game_id: gameId,
          player_id: "player4",
          team: "blue",
          role: "spymaster",
          joined_at: new Date().toISOString(),
        },
      ],
      wordCards,
      clues: [],
      currentClue: undefined,
      guessesRemaining: 0,
      gamePhase: "clue_giving", // Start with clue giving phase
    }
  }

  const [initialGameState] = useState(() => createInitialGameState())

  const { gameState, isLoading, error, giveClue, makeGuess, endTurn, canPlayerAct, getGameStats } =
    useGameState(initialGameState)

  const [currentPlayer, setCurrentPlayer] = useState({
    id: "player1",
    name: "Alex",
    team: "red" as const,
    role: "operative" as const,
  })
  
  // Log expansion state
  const [isLogExpanded, setIsLogExpanded] = useState(false)

  useEffect(() => {
    const playerData = localStorage.getItem("deutchnames_player")
    if (playerData) {
      const player = JSON.parse(playerData)
      setCurrentPlayer({
        id: player.id,
        name: player.name,
        team: "red",
        role: "operative",
      })
    }
  }, [])

  const stats = getGameStats()
  const redPlayers = gameState.players.filter((p) => p.team === "red")
  const bluePlayers = gameState.players.filter((p) => p.team === "blue")

  const handleGiveClue = async () => {
    if (!currentClue.trim() || !clueNumber.trim()) return

    const result = await giveClue(currentPlayer.id, currentClue, Number.parseInt(clueNumber))
    if (result.success) {
      const newEvent: GameLogEvent = {
        id: `event_${Date.now()}`,
        type: "clue_given",
        message: `${currentPlayer.team === "red" ? "Red" : "Blue"} Spymaster gave clue: "${currentClue}" - ${clueNumber}`,
        timestamp: new Date(),
        team: currentPlayer.team,
        player: currentPlayer.name,
        metadata: {
          clue: currentClue,
          clueNumber: Number.parseInt(clueNumber),
          playerId: currentPlayer.id,
          playerName: currentPlayer.name
        }
      }
      setGameEvents((prev) => [newEvent, ...prev])

      setCurrentClue("")
      setClueNumber("")
    }
  }

  const handleCardClick = async (cardId: string) => {
    if (!canPlayerAct(currentPlayer.id, "make_guess")) return

    const result = await makeGuess(currentPlayer.id, cardId)
    if (result.success) {
      const card = gameState.wordCards.find((c) => c.id === cardId)
      if (card) {
        const isCorrect = card.card_type === currentPlayer.team
        const newEvent: GameLogEvent = {
          id: `event_${Date.now()}`,
          type: "card_revealed",
          message: `${currentPlayer.team === "red" ? "Red" : "Blue"} team revealed "${card.german_word}" - ${isCorrect ? "Correct!" : card.card_type === "assassin" ? "ASSASSIN! Game Over!" : card.card_type === "neutral" ? "Neutral card" : "Wrong team!"}`,
          timestamp: new Date(),
          team: currentPlayer.team,
          metadata: {
            cardWord: card.german_word,
            cardType: card.card_type,
            isCorrect
          }
        }
        setGameEvents((prev) => [newEvent, ...prev])
      }

      if (result.newState?.winner) {
        const winEvent: GameLogEvent = {
          id: `event_${Date.now()}_win`,
          type: "team_won",
          message: `🎉 ${result.newState.winner.toUpperCase()} TEAM WINS! 🎉`,
          timestamp: new Date(),
          team: result.newState.winner as "red" | "blue",
        }
        setGameEvents((prev) => [winEvent, ...prev])
      }
    }
  }

  const handleEndTurn = async () => {
    await endTurn(currentPlayer.id)
    const newEvent: GameLogEvent = {
      id: `event_${Date.now()}`,
      type: "turn_ended",
      message: `${currentPlayer.team === "red" ? "Red" : "Blue"} team ended their turn`,
      timestamp: new Date(),
      team: currentPlayer.team,
    }
    setGameEvents((prev) => [newEvent, ...prev])
  }

  const handleTimeUp = (phase: "clue_giving" | "guessing") => {
    const newEvent: GameLogEvent = {
      id: `event_${Date.now()}`,
      type: "timer_expired",
      message: `Time's up! ${currentPlayer.team === "red" ? "Red" : "Blue"} team's turn ended`,
      timestamp: new Date(),
      team: currentPlayer.team,
    }
    setGameEvents((prev) => [newEvent, ...prev])
    
    // Automatically end the turn
    handleEndTurn()
  }

  // Determine current game phase for timer
  const getCurrentPhase = (): "clue_giving" | "guessing" | "paused" | "ended" => {
    if (gameState.winner) return "ended"
    if (gameState.currentClue && gameState.guessesRemaining > 0) return "guessing"
    return "clue_giving"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header - Clean Codenames style */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Game Info */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Deutchnames</h1>
                <p className="text-sm text-gray-600">Room: {gameState.game.room_code}</p>
              </div>
            </div>
            
            {/* Current Turn & Score */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={cn("w-3 h-3 rounded-full", gameState.game.current_turn === "red" ? "bg-red-500" : "bg-red-300")}></div>
                <span className="text-sm font-semibold">Red: {stats.red.remaining}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn("w-3 h-3 rounded-full", gameState.game.current_turn === "blue" ? "bg-blue-500" : "bg-blue-300")}></div>
                <span className="text-sm font-semibold">Blue: {stats.blue.remaining}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline" size="sm"
              onClick={() => {
                setCurrentPlayer(prev => ({
                  ...prev,
                  role: prev.role === "spymaster" ? "operative" : "spymaster"
                }))
              }}
            >
              Switch Role
            </Button>
            <RulesModal />
            <Button
              variant="outline" size="sm"
              onClick={() => router.push(`/game/${gameId}/lobby`)}
            >
              Lobby
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Game Status */}
        <div className="text-center mb-6">
          <div className={cn(
            "inline-block px-6 py-3 rounded-lg font-semibold text-lg",
            gameState.winner 
              ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-300"
              : gameState.game.current_turn === "red"
                ? "bg-red-100 text-red-800 border-2 border-red-300"
                : "bg-blue-100 text-blue-800 border-2 border-blue-300"
          )}>
            {gameState.winner
              ? `🎉 ${gameState.winner.toUpperCase()} TEAM WINS! 🎉`
              : gameState.currentClue
                ? `Clue: "${gameState.currentClue.clue_word}" - ${gameState.currentClue.clue_number} (${gameState.guessesRemaining} guesses left)`
                : gameState.game.current_turn === currentPlayer.team
                  ? currentPlayer.role === "spymaster"
                    ? "Give your operatives a clue"
                    : "Waiting for spymaster's clue..."
                  : `${gameState.game.current_turn.toUpperCase()} team's turn`}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Team Info Sidebar */}
          <div className="col-span-3">
            {/* Game Timer */}
            <div className="mb-4">
              <GameTimer
                clueTimeLimit={clueTimeLimit}
                guessTimeLimit={guessTimeLimit}
                isEnabled={timerEnabled}
                currentPhase={getCurrentPhase()}
                currentTeam={gameState.game.current_turn}
                onTimeUp={handleTimeUp}
                onTimerToggle={setTimerEnabled}
                canControl={true}
              />
            </div>
            {/* Red Team */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
              <div className="bg-red-50 border-b border-red-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <h3 className="font-bold text-red-800">RED TEAM</h3>
                  {gameState.game.current_turn === "red" && <div className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">ACTIVE</div>}
                </div>
                <div className="text-2xl font-bold text-red-600 mb-2">{stats.red.remaining} cards left</div>
              </div>
              <div className="p-4 space-y-2">
                {redPlayers.map((player) => (
                  <div key={player.id} className="flex items-center justify-between text-sm">
                    <span>Player {player.player_id.slice(-1)}</span>
                    <div className="flex items-center gap-1">
                      <span className="capitalize text-gray-600">{player.role}</span>
                      {player.role === "spymaster" && <Crown className="w-3 h-3 text-yellow-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Blue Team */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="bg-blue-50 border-b border-blue-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <h3 className="font-bold text-blue-800">BLUE TEAM</h3>
                  {gameState.game.current_turn === "blue" && <div className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">ACTIVE</div>}
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-2">{stats.blue.remaining} cards left</div>
              </div>
              <div className="p-4 space-y-2">
                {bluePlayers.map((player) => (
                  <div key={player.id} className="flex items-center justify-between text-sm">
                    <span>Player {player.player_id.slice(-1)}</span>
                    <div className="flex items-center gap-1">
                      <span className="capitalize text-gray-600">{player.role}</span>
                      {player.role === "spymaster" && <Crown className="w-3 h-3 text-yellow-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Game Board - Center Focus */}
          <div className="col-span-6">
            <GameBoard
              showSpymasterView={currentPlayer.role === "spymaster"}
              onCardClick={handleCardClick}
              gameState={gameState}
              canInteract={canPlayerAct(currentPlayer.id, "make_guess")}
              playerRole={currentPlayer.role}
            />
          </div>

          {/* Enhanced Game Log */}
          <div className="col-span-3">
            <GameLog
              events={gameEvents}
              isExpanded={isLogExpanded}
              onToggleExpanded={() => setIsLogExpanded(!isLogExpanded)}
              gameId={gameId}
              roomCode={gameState.game.room_code}
              players={gameState.players.map(p => ({
                id: p.id,
                name: `Player ${p.player_id.slice(-1)}`,
                team: p.team,
                role: p.role
              }))}
              gameStartTime={gameStartTime}
              className={isLogExpanded ? "fixed inset-4 z-50" : ""}
            />
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-6 text-center">
          {/* Clue input for spymasters */}
          {currentPlayer.role === "spymaster" && gameState.game.current_turn === currentPlayer.team && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl mx-auto">
              <div className="text-sm text-gray-600 mb-3">Give your team a clue</div>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Your clue word"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-center font-semibold focus:border-blue-500 focus:outline-none"
                  value={currentClue}
                  onChange={(e) => setCurrentClue(e.target.value)}
                />
                <div className="text-2xl font-bold text-gray-400">—</div>
                <input
                  type="number"
                  min="1"
                  max="9"
                  placeholder="#"
                  className="w-20 px-4 py-3 border-2 border-gray-300 rounded-lg text-center font-bold focus:border-blue-500 focus:outline-none"
                  value={clueNumber}
                  onChange={(e) => setClueNumber(e.target.value)}
                />
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold"
                  onClick={handleGiveClue}
                  disabled={!currentClue.trim() || !clueNumber.trim()}
                >
                  Give Clue
                </Button>
              </div>
            </div>
          )}

          {/* End turn button for operatives */}
          {currentPlayer.role === "operative" &&
            gameState.game.current_turn === currentPlayer.team &&
            gameState.currentClue && (
              <Button
                size="lg"
                variant="outline"
                className="bg-orange-100 border-orange-300 text-orange-800 hover:bg-orange-200"
                onClick={handleEndTurn}
              >
                End Turn
              </Button>
            )}
        </div>
      </div>
    </div>
  )
}
