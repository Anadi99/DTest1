"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  Download, 
  Share2,
  Star,
  Target,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Confetti, Fireworks } from "@/components/ui/confetti"
import type { GameState } from "@/lib/game-logic"

interface WinCelebrationProps {
  gameState: GameState
  players: Array<{
    id: string
    name: string
    team: "red" | "blue"
    role: "operative" | "spymaster"
  }>
  gameStartTime: Date
  onNewGame: () => void
  onReturnHome: () => void
  onExportLog: () => void
  className?: string
}

export function WinCelebration({
  gameState,
  players,
  gameStartTime,
  onNewGame,
  onReturnHome,
  onExportLog,
  className
}: WinCelebrationProps) {
  const [showEffects, setShowEffects] = useState(true)
  const [gameStats, setGameStats] = useState<any>(null)

  useEffect(() => {
    // Calculate game statistics
    const gameDuration = Math.round((new Date().getTime() - gameStartTime.getTime()) / 1000 / 60)
    const totalCards = gameState.wordCards.length
    const revealedCards = gameState.wordCards.filter(c => c.revealed).length
    const cluesGiven = gameState.clues.length
    const winningTeam = gameState.winner
    const winningPlayers = players.filter(p => p.team === winningTeam)
    
    setGameStats({
      duration: gameDuration,
      totalCards,
      revealedCards,
      cluesGiven,
      winningTeam,
      winningPlayers,
      efficiency: cluesGiven > 0 ? Math.round((revealedCards / cluesGiven) * 100) : 0
    })

    // Auto-hide effects after 5 seconds
    const timer = setTimeout(() => {
      setShowEffects(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [gameState, players, gameStartTime])

  if (!gameState.winner || !gameStats) return null

  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-4", className)}>
      {/* Celebration Effects */}
      <Confetti active={showEffects} />
      <Fireworks active={showEffects} />
      
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Win Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative z-10 w-full max-w-2xl"
      >
        <Card className="overflow-hidden">
          <CardHeader className={cn(
            "text-center py-8",
            gameStats.winningTeam === "red" 
              ? "bg-gradient-to-r from-red-500 to-red-600 text-white" 
              : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          )}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4"
            >
              <Trophy className="w-8 h-8" />
            </motion.div>
            
            <CardTitle className="text-3xl font-bold mb-2">
              🎉 {gameStats.winningTeam.toUpperCase()} TEAM WINS! 🎉
            </CardTitle>
            
            <div className="text-lg opacity-90">
              Congratulations to the winning team!
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Winning Team */}
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-3">Winning Team Members</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {gameStats.winningPlayers.map((player: any) => (
                  <Badge 
                    key={player.id}
                    variant="outline" 
                    className={cn(
                      "gap-1 px-3 py-1",
                      gameStats.winningTeam === "red" 
                        ? "border-red-300 text-red-600" 
                        : "border-blue-300 text-blue-600"
                    )}
                  >
                    {player.role === "spymaster" ? <Star className="w-3 h-3" /> : <Target className="w-3 h-3" />}
                    {player.name} ({player.role})
                  </Badge>
                ))}
              </div>
            </div>

            {/* Game Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold">{gameStats.duration}</div>
                <div className="text-sm text-muted-foreground">Minutes Played</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold">{gameStats.cluesGiven}</div>
                <div className="text-sm text-muted-foreground">Clues Given</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold">{gameStats.revealedCards}</div>
                <div className="text-sm text-muted-foreground">Cards Revealed</div>
              </div>
            </div>

            {/* Final Board State */}
            <div>
              <h4 className="font-semibold mb-3 text-center">Final Board</h4>
              <div className="grid grid-cols-5 gap-2">
                {gameState.wordCards.map((card) => (
                  <div
                    key={card.id}
                    className={cn(
                      "aspect-square rounded text-xs font-medium flex flex-col items-center justify-center text-center p-1",
                      card.card_type === "red" && "bg-red-500 text-white",
                      card.card_type === "blue" && "bg-blue-500 text-white",
                      card.card_type === "neutral" && "bg-yellow-500 text-white",
                      card.card_type === "assassin" && "bg-gray-900 text-white",
                      !card.revealed && "opacity-50"
                    )}
                  >
                    <div className="font-bold">{card.german_word}</div>
                    <div className="text-xs opacity-75">{card.english_translation}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={onNewGame} size="lg" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Play Again
              </Button>
              <Button onClick={onExportLog} variant="outline" size="lg" className="gap-2">
                <Download className="w-4 h-4" />
                Export Game Log
              </Button>
              <Button onClick={onReturnHome} variant="outline" size="lg" className="gap-2">
                <Home className="w-4 h-4" />
                Return Home
              </Button>
            </div>

            {/* Learning Summary */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">🎓 Learning Achievement</h4>
              <p className="text-sm text-green-700">
                You practiced <strong>{gameStats.revealedCards}</strong> German words during this game! 
                Each word you encountered helps build your vocabulary for real conversations.
              </p>
              <div className="mt-2 text-xs text-green-600">
                Difficulty: <strong>{gameState.game.difficulty_level.toUpperCase()}</strong> • 
                Duration: <strong>{gameStats.duration} minutes</strong> • 
                Efficiency: <strong>{gameStats.efficiency}%</strong>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}