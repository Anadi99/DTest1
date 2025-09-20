"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { 
  Users, 
  Crown, 
  Eye, 
  UserCheck, 
  RotateCcw, 
  Play, 
  Pause,
  Shield,
  Timer,
  AlertTriangle,
  CheckCircle2
} from "lucide-react"
import { useSoundEffects } from "@/hooks/use-sound-effects"

interface HotSeatPlayer {
  id: string
  name: string
  team: "red" | "blue"
  role: "operative" | "spymaster"
  isActive: boolean
}

interface HotSeatModeProps {
  currentPhase: "setup" | "clue_giving" | "guessing" | "turn_transition" | "game_over"
  currentTeam: "red" | "blue"
  currentRole: "spymaster" | "operative"
  players: HotSeatPlayer[]
  onRoleSwitch: (playerId: string, newRole: "spymaster" | "operative") => void
  onPlayerReady: (playerId: string) => void
  onNextPhase: () => void
  gameState?: any
  className?: string
}

export function HotSeatMode({
  currentPhase,
  currentTeam,
  currentRole,
  players,
  onRoleSwitch,
  onPlayerReady,
  onNextPhase,
  gameState,
  className
}: HotSeatModeProps) {
  const [showTransition, setShowTransition] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null)
  const [transitionMessage, setTransitionMessage] = useState("")
  const { playCorrectGuess } = useSoundEffects()

  // Get the currently active player
  const activePlayer = players.find(p => 
    p.team === currentTeam && p.role === currentRole
  ) || players[0]

  useEffect(() => {
    if (currentPhase === "turn_transition") {
      initiateRoleTransition()
    }
  }, [currentPhase])

  const initiateRoleTransition = () => {
    const nextPlayer = getNextPlayer()
    if (!nextPlayer) return

    setCurrentPlayerId(nextPlayer.id)
    setTransitionMessage(getTransitionMessage(nextPlayer))
    setShowTransition(true)
    setCountdown(5)

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setShowTransition(false)
          onNextPhase()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const getNextPlayer = () => {
    // Logic to determine next player based on game phase and turn
    const currentTeamPlayers = players.filter(p => p.team === currentTeam)
    
    if (currentPhase === "clue_giving") {
      // Need spymaster
      return currentTeamPlayers.find(p => p.role === "spymaster")
    } else if (currentPhase === "guessing") {
      // Need operatives
      return currentTeamPlayers.find(p => p.role === "operative")
    }
    
    return currentTeamPlayers[0]
  }

  const getTransitionMessage = (player: HotSeatPlayer) => {
    const teamName = player.team.toUpperCase()
    const roleName = player.role === "spymaster" ? "SPYMASTER" : "OPERATIVE"
    
    if (currentPhase === "clue_giving") {
      return `${teamName} ${roleName}, it's your turn to give a clue!`
    } else if (currentPhase === "guessing") {
      return `${teamName} TEAM, make your guesses!`
    } else if (currentPhase === "turn_transition") {
      return `Switching to ${teamName} team...`
    }
    
    return `${player.name}, you're up!`
  }

  const skipTransition = () => {
    setShowTransition(false)
    onNextPhase()
  }

  const getPhaseInstructions = () => {
    switch (currentPhase) {
      case "setup":
        return "Set up teams and roles before starting the game."
      case "clue_giving":
        return `${currentTeam.toUpperCase()} Spymaster: Give your team a one-word clue and number.`
      case "guessing":
        return `${currentTeam.toUpperCase()} Team: Discuss and make your guesses based on the clue.`
      case "turn_transition":
        return "Passing the device to the next player..."
      case "game_over":
        return "Game Over! Check the final results."
      default:
        return "Ready to play!"
    }
  }

  const getActivePlayerName = () => {
    if (currentPhase === "guessing") {
      const teamPlayers = players.filter(p => p.team === currentTeam && p.role === "operative")
      return teamPlayers.length > 0 ? `${currentTeam.toUpperCase()} Team` : "Unknown Team"
    }
    return activePlayer ? activePlayer.name : "Unknown Player"
  }

  const getCurrentRoleIcon = () => {
    if (currentPhase === "guessing") {
      return <Users className="w-5 h-5" />
    }
    return currentRole === "spymaster" ? <Crown className="w-5 h-5" /> : <Shield className="w-5 h-5" />
  }

  return (
    <>
      {/* Main Hot-Seat Interface */}
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg",
                currentTeam === "red" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
              )}>
                {getCurrentRoleIcon()}
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  <span className={cn(
                    "font-bold",
                    currentTeam === "red" ? "text-red-600" : "text-blue-600"
                  )}>
                    {getActivePlayerName()}
                  </span>
                  <Badge variant={currentTeam === "red" ? "destructive" : "default"} className="text-xs">
                    {currentPhase === "guessing" ? "OPERATIVES" : currentRole.toUpperCase()}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {getPhaseInstructions()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {currentPhase.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Team Overview */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Red Team */}
            <div className={cn(
              "p-3 rounded-lg border-2",
              currentTeam === "red" ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
            )}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-semibold text-red-700">RED TEAM</span>
                {currentTeam === "red" && (
                  <Badge className="text-xs bg-red-600">ACTIVE</Badge>
                )}
              </div>
              <div className="space-y-1">
                {players.filter(p => p.team === "red").map(player => (
                  <div key={player.id} className="flex items-center justify-between text-xs">
                    <span className="font-medium">{player.name}</span>
                    <div className="flex items-center gap-1">
                      <span className="capitalize">{player.role}</span>
                      {player.role === "spymaster" && <Crown className="w-3 h-3 text-yellow-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Blue Team */}
            <div className={cn(
              "p-3 rounded-lg border-2",
              currentTeam === "blue" ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-gray-50"
            )}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-semibold text-blue-700">BLUE TEAM</span>
                {currentTeam === "blue" && (
                  <Badge className="text-xs bg-blue-600">ACTIVE</Badge>
                )}
              </div>
              <div className="space-y-1">
                {players.filter(p => p.team === "blue").map(player => (
                  <div key={player.id} className="flex items-center justify-between text-xs">
                    <span className="font-medium">{player.name}</span>
                    <div className="flex items-center gap-1">
                      <span className="capitalize">{player.role}</span>
                      {player.role === "spymaster" && <Crown className="w-3 h-3 text-yellow-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phase-specific UI */}
          {currentPhase === "clue_giving" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-800">Spymaster Instructions</span>
              </div>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>• Look at the colored grid that only you can see</p>
                <p>• Think of a one-word clue that connects your team's words</p>
                <p>• Give the clue and a number (how many words it relates to)</p>
                <p>• Avoid words that might lead to the assassin!</p>
              </div>
            </div>
          )}

          {currentPhase === "guessing" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-800">Team Instructions</span>
              </div>
              <div className="text-sm text-green-700 space-y-1">
                <p>• Discuss the clue with your teammates</p>
                <p>• Click on words you think belong to your team</p>
                <p>• You can guess [clue number + 1] times maximum</p>
                <p>• End your turn when you want to stop guessing</p>
              </div>
            </div>
          )}

          {/* Ready/Continue Button */}
          <div className="flex justify-center mt-4">
            {currentPhase === "turn_transition" ? (
              <Button onClick={skipTransition} variant="outline">
                <Timer className="w-4 h-4 mr-2" />
                Skip Transition
              </Button>
            ) : (
              <Button 
                onClick={() => onPlayerReady(activePlayer?.id || "")}
                className={cn(
                  currentTeam === "red" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                )}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                I'm Ready
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Turn Transition Modal */}
      <AnimatePresence>
        {showTransition && (
          <Dialog open={showTransition} onOpenChange={() => {}}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-xl">
                  Pass the Device
                </DialogTitle>
                <DialogDescription className="text-center">
                  {transitionMessage}
                </DialogDescription>
              </DialogHeader>

              <div className="text-center py-8">
                <motion.div
                  className={cn(
                    "w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold",
                    currentTeam === "red" ? "bg-red-500" : "bg-blue-500"
                  )}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {countdown}
                </motion.div>

                <div className="space-y-2">
                  <p className="text-lg font-semibold">
                    {getTransitionMessage(activePlayer)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Auto-continuing in {countdown} seconds...
                  </p>
                </div>

                <div className="flex justify-center gap-3 mt-6">
                  <Button onClick={skipTransition} variant="outline">
                    Continue Now
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}

// Hot-seat game setup component
interface HotSeatSetupProps {
  onStartGame: (players: HotSeatPlayer[]) => void
  className?: string
}

export function HotSeatSetup({ onStartGame, className }: HotSeatSetupProps) {
  const [players, setPlayers] = useState<HotSeatPlayer[]>([
    { id: "player1", name: "Player 1", team: "red", role: "operative", isActive: false },
    { id: "player2", name: "Player 2", team: "red", role: "spymaster", isActive: false },
    { id: "player3", name: "Player 3", team: "blue", role: "operative", isActive: false },
    { id: "player4", name: "Player 4", team: "blue", role: "spymaster", isActive: false },
  ])

  const updatePlayerName = (playerId: string, newName: string) => {
    setPlayers(prev => prev.map(p => 
      p.id === playerId ? { ...p, name: newName } : p
    ))
  }

  const switchPlayerRole = (playerId: string) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === playerId) {
        return { ...p, role: p.role === "spymaster" ? "operative" : "spymaster" }
      }
      return p
    }))
  }

  const canStartGame = () => {
    const redSpymaster = players.find(p => p.team === "red" && p.role === "spymaster")
    const blueSpymaster = players.find(p => p.team === "blue" && p.role === "spymaster")
    return redSpymaster && blueSpymaster && players.length >= 2
  }

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader>
        <CardTitle className="text-center">
          Hot-Seat Game Setup
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Configure players for local multiplayer on one device
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Team Setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Red Team */}
          <div className="space-y-3">
            <h3 className="font-semibold text-red-600 flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              Red Team
            </h3>
            <div className="space-y-2">
              {players.filter(p => p.team === "red").map(player => (
                <div key={player.id} className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => updatePlayerName(player.id, e.target.value)}
                    className="flex-1 px-2 py-1 text-sm border rounded"
                    placeholder="Player name"
                  />
                  <Button
                    size="sm"
                    variant={player.role === "spymaster" ? "default" : "outline"}
                    onClick={() => switchPlayerRole(player.id)}
                    className="text-xs"
                  >
                    {player.role === "spymaster" ? (
                      <><Crown className="w-3 h-3 mr-1" />Spy</>
                    ) : (
                      <><Shield className="w-3 h-3 mr-1" />Op</>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Blue Team */}
          <div className="space-y-3">
            <h3 className="font-semibold text-blue-600 flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              Blue Team
            </h3>
            <div className="space-y-2">
              {players.filter(p => p.team === "blue").map(player => (
                <div key={player.id} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => updatePlayerName(player.id, e.target.value)}
                    className="flex-1 px-2 py-1 text-sm border rounded"
                    placeholder="Player name"
                  />
                  <Button
                    size="sm"
                    variant={player.role === "spymaster" ? "default" : "outline"}
                    onClick={() => switchPlayerRole(player.id)}
                    className="text-xs"
                  >
                    {player.role === "spymaster" ? (
                      <><Crown className="w-3 h-3 mr-1" />Spy</>
                    ) : (
                      <><Shield className="w-3 h-3 mr-1" />Op</>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rules Reminder */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-800">Hot-Seat Rules</span>
          </div>
          <div className="text-sm text-amber-700 space-y-1">
            <p>• Each team needs one Spymaster and at least one Operative</p>
            <p>• Pass the device when prompted during role transitions</p>
            <p>• Spymasters can see all card colors, Operatives cannot</p>
            <p>• Be honest about your role when it's your turn!</p>
          </div>
        </div>

        {/* Start Game Button */}
        <div className="text-center">
          <Button 
            onClick={() => onStartGame(players)}
            disabled={!canStartGame()}
            size="lg"
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Hot-Seat Game
          </Button>
          {!canStartGame() && (
            <p className="text-sm text-muted-foreground mt-2">
              Each team needs a Spymaster to start the game
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
