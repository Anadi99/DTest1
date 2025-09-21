"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Users, Gamepad2 } from "lucide-react"
import { HotSeatLobby } from "@/components/game/hot-seat-lobby"
import { HotSeatMode } from "@/components/game/hot-seat-mode"
import { EnhancedGameBoard } from "@/components/game/enhanced-game-board"
import { WinCelebration } from "@/components/game/win-celebration"
import { GameTimer } from "@/components/game/game-timer"
import { GameLog, type GameLogEvent } from "@/components/game/game-log"
import { ClueInput } from "@/components/game/clue-input"
import { GameLogic, type GameState } from "@/lib/game-logic"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HotSeatPlayer {
  id: string
  name: string
  team: "red" | "blue"
  role: "operative" | "spymaster"
  isActive: boolean
}

interface GameConfig {
  players: HotSeatPlayer[]
  difficulty: "A1" | "A2" | "B1" | "B2"
  timerEnabled: boolean
  clueTimeLimit: number
  guessTimeLimit: number
  highContrast: boolean
  colorblindMode: boolean
  soundEnabled: boolean
}

export default function HotSeatPage() {
  const [gamePhase, setGamePhase] = useState<"setup" | "playing" | "transition" | "ended">("setup")
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null)
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<HotSeatPlayer | null>(null)
  const [gameEvents, setGameEvents] = useState<GameLogEvent[]>([])
  const [gameStartTime] = useState(new Date())
  
  const router = useRouter()

  const handleStartGame = (config: GameConfig) => {
    setGameConfig(config)
    
    // Create initial game state
    const gameId = `hotseat_${Date.now()}`
    const wordCards = GameLogic.createGameBoard(config.difficulty, gameId)
    
    const initialState: GameState = {
      game: {
        id: gameId,
        room_code: "HOTSEAT",
        status: "in_progress",
        current_turn: "red", // Red always starts
        red_spymaster: config.players.find(p => p.team === "red" && p.role === "spymaster")?.id,
        blue_spymaster: config.players.find(p => p.team === "blue" && p.role === "spymaster")?.id,
        red_score: 0,
        blue_score: 0,
        difficulty_level: config.difficulty.toLowerCase() as "beginner" | "intermediate" | "advanced",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      players: config.players.map(p => ({
        id: p.id,
        game_id: gameId,
        player_id: p.id,
        team: p.team,
        role: p.role,
        joined_at: new Date().toISOString(),
      })),
      wordCards,
      clues: [],
      currentClue: undefined,
      guessesRemaining: 0,
      gamePhase: "clue_giving",
    }
    
    setGameState(initialState)
    setCurrentPlayer(config.players.find(p => p.team === "red" && p.role === "spymaster") || config.players[0])
    setGamePhase("playing")
    
    // Add game start event
    const startEvent: GameLogEvent = {
      id: "start",
      type: "game_start",
      message: "Hot-seat game started - Red team goes first",
      timestamp: new Date(),
      team: "red",
    }
    setGameEvents([startEvent])
  }

  const handleGiveClue = (clue: string, number: number) => {
    if (!gameState || !currentPlayer) return

    const result = GameLogic.giveClue(gameState, currentPlayer.id, clue, number)
    if (result.success && result.newState) {
      setGameState(result.newState)
      
      const clueEvent: GameLogEvent = {
        id: `clue_${Date.now()}`,
        type: "clue_given",
        message: `${currentPlayer.team.toUpperCase()} Spymaster (${currentPlayer.name}) gave clue: "${clue}" - ${number}`,
        timestamp: new Date(),
        team: currentPlayer.team,
        player: currentPlayer.name,
        metadata: {
          clue,
          clueNumber: number,
          playerId: currentPlayer.id,
          playerName: currentPlayer.name
        }
      }
      setGameEvents(prev => [clueEvent, ...prev])
      
      // Switch to operatives for guessing
      const operatives = gameConfig?.players.filter(p => p.team === currentPlayer.team && p.role === "operative") || []
      if (operatives.length > 0) {
        setCurrentPlayer(operatives[0])
      }
    }
  }

  const handleCardClick = (cardId: string) => {
    if (!gameState || !currentPlayer) return

    const result = GameLogic.makeGuess(gameState, currentPlayer.id, cardId)
    if (result.success && result.newState) {
      setGameState(result.newState)
      
      const card = gameState.wordCards.find(c => c.id === cardId)
      if (card) {
        const isCorrect = card.card_type === currentPlayer.team
        const cardEvent: GameLogEvent = {
          id: `card_${Date.now()}`,
          type: "card_revealed",
          message: `${currentPlayer.team.toUpperCase()} team revealed "${card.german_word}" (${card.english_translation}) - ${
            card.card_type === "assassin" ? "ASSASSIN! Game Over!" :
            isCorrect ? "Correct!" :
            card.card_type === "neutral" ? "Neutral card" : "Wrong team!"
          }`,
          timestamp: new Date(),
          team: currentPlayer.team,
          metadata: {
            cardWord: card.german_word,
            cardType: card.card_type,
            isCorrect
          }
        }
        setGameEvents(prev => [cardEvent, ...prev])
        
        // Check for game end
        if (result.newState.winner) {
          const winEvent: GameLogEvent = {
            id: `win_${Date.now()}`,
            type: "team_won",
            message: `🎉 ${result.newState.winner.toUpperCase()} TEAM WINS! 🎉`,
            timestamp: new Date(),
            team: result.newState.winner,
          }
          setGameEvents(prev => [winEvent, ...prev])
          setGamePhase("ended")
        } else if (!isCorrect || result.newState.guessesRemaining <= 0) {
          // Switch turns
          switchToNextPlayer()
        }
      }
    }
  }

  const handleEndTurn = () => {
    if (!gameState || !currentPlayer) return

    const result = GameLogic.endTurn(gameState, currentPlayer.id)
    if (result.success && result.newState) {
      setGameState(result.newState)
      
      const endEvent: GameLogEvent = {
        id: `end_${Date.now()}`,
        type: "turn_ended",
        message: `${currentPlayer.team.toUpperCase()} team ended their turn`,
        timestamp: new Date(),
        team: currentPlayer.team,
      }
      setGameEvents(prev => [endEvent, ...prev])
      
  const handleNewGame = () => {
    // Reset game state for a new game
    setGamePhase("setup")
    setGameState(null)
    setCurrentPlayer(null)
    setGameEvents([])
  }
      switchToNextPlayer()
  const handleReturnHome = () => {
    router.push("/")
  }
    }
  const handleExportLog = () => {
    const gameData = {
      gameId: gameState?.game.id,
      roomCode: gameState?.game.room_code,
      gameStartTime: gameStartTime.toISOString(),
      gameEndTime: new Date().toISOString(),
      duration: Math.round((new Date().getTime() - gameStartTime.getTime()) / 1000 / 60),
      players: gameConfig?.players.map(p => ({
        name: p.name,
        team: p.team,
        role: p.role
      })),
      events: gameEvents.map(event => ({
        timestamp: event.timestamp.toISOString(),
        type: event.type,
        message: event.message,
        team: event.team,
        metadata: event.metadata
      })),
      finalBoard: gameState?.wordCards.map(card => ({
        word: card.german_word,
        translation: card.english_translation,
        team: card.card_type,
        revealed: card.revealed
      }))
    }
  }
    const blob = new Blob([JSON.stringify(gameData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `deutchnames-hotseat-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const switchToNextPlayer = () => {
    if (!gameState || !gameConfig) return

    const nextTeam = gameState.game.current_turn
    const nextRole = gameState.gamePhase === "clue_giving" ? "spymaster" : "operative"
    
    const nextPlayer = gameConfig.players.find(p => 
      p.team === nextTeam && p.role === nextRole
    )
    
    if (nextPlayer) {
      setCurrentPlayer(nextPlayer)
      setGamePhase("transition")
      
      // Auto-continue after 3 seconds
      setTimeout(() => {
        setGamePhase("playing")
      }, 3000)
    }
  }

  const getCurrentPhase = (): "clue_giving" | "guessing" | "paused" | "ended" => {
    if (!gameState) return "ended"
    if (gameState.winner) return "ended"
    if (gameState.currentClue && gameState.guessesRemaining > 0) return "guessing"
    return "clue_giving"
  }

  const handleTimeUp = (phase: "clue_giving" | "guessing") => {
    const timeEvent: GameLogEvent = {
      id: `timeout_${Date.now()}`,
      type: "timer_expired",
      message: `Time's up! ${currentPlayer?.team.toUpperCase()} team's turn ended`,
      timestamp: new Date(),
      team: currentPlayer?.team,
    }
    setGameEvents(prev => [timeEvent, ...prev])
    
    handleEndTurn()
  }

  if (gamePhase === "setup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Navigation */}
        <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <span className="text-xl font-bold text-white">Deutchnames</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-white/10 border-white/20 text-white">
                <Users className="w-3 h-3 mr-1" />
                Hot-Seat Mode
              </Badge>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <HotSeatLobby onStartGame={handleStartGame} />
        </div>
      </div>
    )
  }

  if (gamePhase === "transition") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Pass the Device</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className={cn(
              "w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white text-xl font-bold",
              currentPlayer?.team === "red" ? "bg-red-500" : "bg-blue-500"
            )}>
              {currentPlayer?.team === "red" ? "R" : "B"}
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {currentPlayer?.name}, it's your turn!
              </h3>
              <p className="text-muted-foreground">
                {currentPlayer?.role === "spymaster" 
                  ? "Give your team a clue" 
                  : "Make your guesses based on the clue"
                }
              </p>
            </div>
            <Button onClick={() => setGamePhase("playing")}>
              I'm Ready
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!gameState || !currentPlayer || !gameConfig) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading game...</p>
        </div>
      </div>
    )
  }

  // Show win celebration if game is over
  if (gamePhase === "ended" && gameState.winner) {
    return (
      <div className="min-h-screen bg-background">
        <WinCelebration
          gameState={gameState}
          players={gameConfig.players.map(p => ({
            id: p.id,
            name: p.name,
            team: p.team,
            role: p.role
          }))}
          gameStartTime={gameStartTime}
          onNewGame={handleNewGame}
          onReturnHome={handleReturnHome}
          onExportLog={handleExportLog}
        />
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Game Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit Game
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <div>
                <h1 className="font-bold">Deutchnames</h1>
                <p className="text-xs text-muted-foreground">Hot-Seat Mode • {gameConfig.difficulty}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className={cn(
              "gap-1",
              gameState.game.current_turn === "red" ? "border-red-300 text-red-600" : "border-blue-300 text-blue-600"
            )}>
              <Users className="w-3 h-3" />
              {gameState.game.current_turn?.toUpperCase()} Turn
            </Badge>
            {gameState.winner && (
              <Badge className={cn(
                "gap-1",
                gameState.winner === "red" ? "bg-red-500" : "bg-blue-500"
              )}>
                🎉 {gameState.winner.toUpperCase()} WINS!
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Current Player Panel */}
          <div className="col-span-3">
            <HotSeatMode
              currentPhase={gamePhase === "ended" ? "ended" : getCurrentPhase()}
              currentTeam={gameState.game.current_turn || "red"}
              currentRole={currentPlayer.role}
              players={gameConfig.players.map(p => ({...p, isActive: p.id === currentPlayer.id}))}
              onRoleSwitch={() => {}}
              onPlayerReady={() => {}}
              onNextPhase={() => setGamePhase("playing")}
              gameState={gameState}
            />
            
            {/* Timer */}
            {gameConfig.timerEnabled && (
              <div className="mt-4">
                <GameTimer
                  clueTimeLimit={gameConfig.clueTimeLimit}
                  guessTimeLimit={gameConfig.guessTimeLimit}
                  isEnabled={gameConfig.timerEnabled}
                  currentPhase={getCurrentPhase()}
                  currentTeam={gameState.game.current_turn || "red"}
                  onTimeUp={handleTimeUp}
                  onTimerToggle={() => {}}
                  canControl={true}
                />
              </div>
            )}
          </div>

          {/* Game Board */}
          <div className="col-span-6">
            <EnhancedGameBoard
              gameState={gameState}
              currentPlayer={currentPlayer}
              onCardClick={handleCardClick}
              canInteract={
                currentPlayer.role === "operative" && 
                gameState.game.current_turn === currentPlayer.team &&
                gameState.gamePhase === "guessing"
              }
              highContrast={gameConfig.highContrast}
              colorblindMode={gameConfig.colorblindMode}
              soundEnabled={gameConfig.soundEnabled}
              showTranslations={true}
            />
            
            {/* Action Panel */}
            <div className="mt-6">
              {currentPlayer.role === "spymaster" && 
               gameState.game.current_turn === currentPlayer.team && 
               gameState.gamePhase === "clue_giving" && (
                <ClueInput
                  onGiveClue={handleGiveClue}
                  team={currentPlayer.team}
                />
              )}
              
              {currentPlayer.role === "operative" && 
               gameState.game.current_turn === currentPlayer.team && 
               gameState.gamePhase === "guessing" && 
               gameState.currentClue && (
                <div className="text-center">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleEndTurn}
                    className="bg-orange-100 border-orange-300 text-orange-800 hover:bg-orange-200"
                  >
                    End Turn ({gameState.guessesRemaining} guesses left)
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Game Log */}
          <div className="col-span-3">
            <GameLog
              events={gameEvents}
              gameId={gameState.game.id}
              roomCode={gameState.game.room_code}
              players={gameConfig.players.map(p => ({
                id: p.id,
                name: p.name,
                team: p.team,
                role: p.role
              }))}
              gameStartTime={gameStartTime}
            />
          </div>
        </div>
      </div>
    </div>
  )
}