"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Users, 
  Crown, 
  Shield, 
  Play, 
  Settings, 
  Timer, 
  FileText,
  Palette,
  Volume2,
  Eye
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TimerSettings } from "./game-timer"
import { RulesModal } from "./rules-modal"

interface HotSeatPlayer {
  id: string
  name: string
  team: "red" | "blue"
  role: "operative" | "spymaster"
}

interface HotSeatLobbyProps {
  onStartGame: (config: {
    players: HotSeatPlayer[]
    difficulty: "A1" | "A2" | "B1" | "B2"
    timerEnabled: boolean
    clueTimeLimit: number
    guessTimeLimit: number
    highContrast: boolean
    colorblindMode: boolean
    soundEnabled: boolean
  }) => void
  className?: string
}

export function HotSeatLobby({ onStartGame, className }: HotSeatLobbyProps) {
  const [players, setPlayers] = useState<HotSeatPlayer[]>([
    { id: "player1", name: "Player 1", team: "red", role: "operative" },
    { id: "player2", name: "Player 2", team: "red", role: "spymaster" },
    { id: "player3", name: "Player 3", team: "blue", role: "operative" },
    { id: "player4", name: "Player 4", team: "blue", role: "spymaster" },
  ])
  
  // Game settings
  const [difficulty, setDifficulty] = useState<"A1" | "A2" | "B1" | "B2">("A1")
  const [timerEnabled, setTimerEnabled] = useState(false)
  const [clueTimeLimit, setClueTimeLimit] = useState(60)
  const [guessTimeLimit, setGuessTimeLimit] = useState(120)
  
  // Accessibility settings
  const [highContrast, setHighContrast] = useState(false)
  const [colorblindMode, setColorblindMode] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const updatePlayerName = (playerId: string, newName: string) => {
    setPlayers(prev => prev.map(p => 
      p.id === playerId ? { ...p, name: newName } : p
    ))
  }

  const switchPlayerRole = (playerId: string) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === playerId) {
        const newRole = p.role === "spymaster" ? "operative" : "spymaster"
        
        // Ensure only one spymaster per team
        if (newRole === "spymaster") {
          const teamPlayers = prev.filter(player => player.team === p.team && player.id !== p.id)
          const currentSpymaster = teamPlayers.find(player => player.role === "spymaster")
          
          if (currentSpymaster) {
            // Switch current spymaster to operative
            return prev.map(player => {
              if (player.id === currentSpymaster.id) {
                return { ...player, role: "operative" }
              }
              if (player.id === p.id) {
                return { ...player, role: "spymaster" }
              }
              return player
            })
          }
        }
        
        return { ...p, role: newRole }
      }
      return p
    }))
  }

  const switchPlayerTeam = (playerId: string) => {
    setPlayers(prev => prev.map(p => 
      p.id === playerId ? { ...p, team: p.team === "red" ? "blue" : "red" } : p
    ))
  }

  const addPlayer = () => {
    if (players.length >= 8) return
    
    const newId = `player${players.length + 1}`
    const redCount = players.filter(p => p.team === "red").length
    const blueCount = players.filter(p => p.team === "blue").length
    const team = redCount <= blueCount ? "red" : "blue"
    
    setPlayers(prev => [...prev, {
      id: newId,
      name: `Player ${players.length + 1}`,
      team,
      role: "operative"
    }])
  }

  const removePlayer = (playerId: string) => {
    if (players.length <= 2) return
    setPlayers(prev => prev.filter(p => p.id !== playerId))
  }

  const canStartGame = () => {
    const redSpymaster = players.find(p => p.team === "red" && p.role === "spymaster")
    const blueSpymaster = players.find(p => p.team === "blue" && p.role === "spymaster")
    const redOperatives = players.filter(p => p.team === "red" && p.role === "operative")
    const blueOperatives = players.filter(p => p.team === "blue" && p.role === "operative")
    
    return redSpymaster && blueSpymaster && redOperatives.length > 0 && blueOperatives.length > 0
  }

  const handleStartGame = () => {
    if (!canStartGame()) return
    
    onStartGame({
      players,
      difficulty,
      timerEnabled,
      clueTimeLimit,
      guessTimeLimit,
      highContrast,
      colorblindMode,
      soundEnabled
    })
  }

  const redPlayers = players.filter(p => p.team === "red")
  const bluePlayers = players.filter(p => p.team === "blue")

  return (
    <div className={cn("max-w-6xl mx-auto space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Hot-Seat Game Setup</h1>
        <p className="text-muted-foreground">Configure players and settings for local multiplayer</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Setup */}
        <div className="lg:col-span-2 space-y-6">
          {/* Red Team */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                Red Team ({redPlayers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {redPlayers.map(player => (
                <div key={player.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <Input
                    value={player.name}
                    onChange={(e) => updatePlayerName(player.id, e.target.value)}
                    className="flex-1"
                    placeholder="Player name"
                  />
                  <Button
                    size="sm"
                    variant={player.role === "spymaster" ? "default" : "outline"}
                    onClick={() => switchPlayerRole(player.id)}
                    className="min-w-[100px]"
                  >
                    {player.role === "spymaster" ? (
                      <><Crown className="w-3 h-3 mr-1" />Spymaster</>
                    ) : (
                      <><Shield className="w-3 h-3 mr-1" />Operative</>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => switchPlayerTeam(player.id)}
                    className="text-blue-600"
                  >
                    → Blue
                  </Button>
                  {players.length > 2 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removePlayer(player.id)}
                      className="text-red-600"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Blue Team */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                Blue Team ({bluePlayers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {bluePlayers.map(player => (
                <div key={player.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Input
                    value={player.name}
                    onChange={(e) => updatePlayerName(player.id, e.target.value)}
                    className="flex-1"
                    placeholder="Player name"
                  />
                  <Button
                    size="sm"
                    variant={player.role === "spymaster" ? "default" : "outline"}
                    onClick={() => switchPlayerRole(player.id)}
                    className="min-w-[100px]"
                  >
                    {player.role === "spymaster" ? (
                      <><Crown className="w-3 h-3 mr-1" />Spymaster</>
                    ) : (
                      <><Shield className="w-3 h-3 mr-1" />Operative</>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => switchPlayerTeam(player.id)}
                    className="text-red-600"
                  >
                    → Red
                  </Button>
                  {players.length > 2 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removePlayer(player.id)}
                      className="text-blue-600"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Add Player */}
          {players.length < 8 && (
            <div className="text-center">
              <Button onClick={addPlayer} variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Add Player ({players.length}/8)
              </Button>
            </div>
          )}
        </div>

        {/* Game Settings */}
        <div className="space-y-6">
          {/* Basic Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Game Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty Level</label>
                <Select value={difficulty} onValueChange={(value: any) => setDifficulty(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A1">A1 - Beginner (Basic words)</SelectItem>
                    <SelectItem value="A2">A2 - Elementary (Common vocabulary)</SelectItem>
                    <SelectItem value="B1">B1 - Intermediate (Complex concepts)</SelectItem>
                    <SelectItem value="B2">B2 - Upper Intermediate (Advanced terms)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Timer Settings */}
          <TimerSettings
            clueTimeLimit={clueTimeLimit}
            guessTimeLimit={guessTimeLimit}
            isEnabled={timerEnabled}
            onClueTimeLimitChange={setClueTimeLimit}
            onGuessTimeLimitChange={setGuessTimeLimit}
            onEnabledChange={setTimerEnabled}
            canEdit={true}
          />

          {/* Accessibility Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium">High Contrast Text</label>
                  <p className="text-xs text-muted-foreground">Force black/white text for better readability</p>
                </div>
                <Switch checked={highContrast} onCheckedChange={setHighContrast} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Colorblind Mode</label>
                  <p className="text-xs text-muted-foreground">Add patterns and symbols to cards</p>
                </div>
                <Switch checked={colorblindMode} onCheckedChange={setColorblindMode} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Sound Effects</label>
                  <p className="text-xs text-muted-foreground">Audio feedback for game events</p>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
            </CardContent>
          </Card>

          {/* Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Game Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RulesModal trigger={
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  View Complete Rules
                </Button>
              } />
            </CardContent>
          </Card>

          {/* Start Game */}
          <Card>
            <CardContent className="p-6">
              {!canStartGame() && (
                <Alert className="mb-4">
                  <AlertDescription>
                    Each team needs at least one Spymaster and one Operative to start the game.
                  </AlertDescription>
                </Alert>
              )}
              
              <Button 
                onClick={handleStartGame}
                disabled={!canStartGame()}
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Hot-Seat Game
              </Button>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Players will pass the device during role transitions</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Game Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-red-600">Red Team Strategy</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Spymaster:</strong> {redPlayers.find(p => p.role === "spymaster")?.name || "None"}</p>
                <p><strong>Operatives:</strong> {redPlayers.filter(p => p.role === "operative").map(p => p.name).join(", ")}</p>
                <p><strong>Goal:</strong> Find all 9 red words first</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-600">Blue Team Strategy</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Spymaster:</strong> {bluePlayers.find(p => p.role === "spymaster")?.name || "None"}</p>
                <p><strong>Operatives:</strong> {bluePlayers.filter(p => p.role === "operative").map(p => p.name).join(", ")}</p>
                <p><strong>Goal:</strong> Find all 8 blue words first</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div>
              <div className="font-medium">Difficulty</div>
              <Badge variant="outline">{difficulty}</Badge>
            </div>
            <div>
              <div className="font-medium">Timer</div>
              <Badge variant="outline">{timerEnabled ? "Enabled" : "Disabled"}</Badge>
            </div>
            <div>
              <div className="font-medium">Accessibility</div>
              <Badge variant="outline">{highContrast || colorblindMode ? "Enhanced" : "Standard"}</Badge>
            </div>
            <div>
              <div className="font-medium">Audio</div>
              <Badge variant="outline">{soundEnabled ? "On" : "Off"}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}