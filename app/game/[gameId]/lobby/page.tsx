"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Users, Crown, Timer, FileText, Settings, Play, Copy, Shield, Eye, Check } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useRealtimeGame } from "@/hooks/use-realtime-game"
import { RulesModal } from "@/components/game/rules-modal"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TimerSettings } from "@/components/game/game-timer"

interface GameLobbyProps {
  params: { gameId: string }
}

interface Player {
  id: string
  name: string
  team: "red" | "blue"
  role: "operative" | "spymaster"
  isCreator?: boolean
}

export default function GameLobby({ params }: GameLobbyProps) {
  const [gameId] = useState<string>(params.gameId)
  const [currentPlayer, setCurrentPlayer] = useState<Player>({
    id: "player1",
    name: "Alex",
    team: "red",
    role: "operative",
    isCreator: true,
  })
  const [players, setPlayers] = useState<Player[]>([])
  const [roomCode, setRoomCode] = useState("HAUS123")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  
  // Timer settings
  const [timerEnabled, setTimerEnabled] = useState(false)
  const [clueTimeLimit, setClueTimeLimit] = useState(60)
  const [guessTimeLimit, setGuessTimeLimit] = useState(120)
  
  const router = useRouter()

  const { game, players: gamePlayers, actions, isLoading } = useRealtimeGame(gameId)

  useEffect(() => {
    const playerData = localStorage.getItem("deutchnames_player")
    if (playerData) {
      const player = JSON.parse(playerData)
      setCurrentPlayer({
        id: player.id,
        name: player.name,
        team: "red",
        role: "operative",
        isCreator: player.isCreator || false,
      })
    }
  }, [])

  useEffect(() => {
    if (game) {
      setRoomCode(game.room_code)
    }
    if (gamePlayers) {
      const mappedPlayers = gamePlayers.map((p) => ({
        id: p.id,
        name: `Player ${p.player_id.slice(-1)}`,
        team: p.team,
        role: p.role,
        isCreator: false, // Would need to track this in database
      }))
      setPlayers(mappedPlayers)
    }
  }, [game, gamePlayers])

  const shareableLink = `${typeof window !== "undefined" ? window.location.origin : ""}/join/${gameId}`

  const redTeam = players.filter((p) => p.team === "red")
  const blueTeam = players.filter((p) => p.team === "blue")
  const redSpymaster = redTeam.find((p) => p.role === "spymaster")
  const blueSpymaster = blueTeam.find((p) => p.role === "spymaster")

  const canStartGame = players.length >= 2 && redSpymaster && blueSpymaster

  const switchTeam = async (team: "red" | "blue") => {
    try {
      // In a real implementation, this would update the database
      const updatedPlayer = { ...currentPlayer, team }
      setCurrentPlayer(updatedPlayer)
      setPlayers((prev) => prev.map((p) => (p.id === currentPlayer.id ? updatedPlayer : p)))

      // Update localStorage
      const playerData = JSON.parse(localStorage.getItem("deutchnames_player") || "{}")
      localStorage.setItem(
        "deutchnames_player",
        JSON.stringify({
          ...playerData,
          team,
        }),
      )
    } catch (error) {
      console.error("Error switching team:", error)
      setError("Failed to switch team")
    }
  }

  const switchRole = async (role: "operative" | "spymaster") => {
    try {
      // Check if the role is already taken by another player on the same team
      const teamPlayers = players.filter((p) => p.team === currentPlayer.team && p.id !== currentPlayer.id)
      const roleAlreadyTaken = teamPlayers.some((p) => p.role === role)

      if (role === "spymaster" && roleAlreadyTaken) {
        setError("Spymaster role is already taken on this team")
        return
      }

      const updatedPlayer = { ...currentPlayer, role }
      setCurrentPlayer(updatedPlayer)
      setPlayers((prev) => prev.map((p) => (p.id === currentPlayer.id ? updatedPlayer : p)))

      // Update localStorage
      const playerData = JSON.parse(localStorage.getItem("deutchnames_player") || "{}")
      localStorage.setItem(
        "deutchnames_player",
        JSON.stringify({
          ...playerData,
          role,
        }),
      )

      setError("") // Clear any previous errors
    } catch (error) {
      console.error("Error switching role:", error)
      setError("Failed to switch role")
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = shareableLink
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const startGame = async () => {
    try {
      if (!canStartGame) {
        setError("Cannot start game - need at least 2 players with spymasters on both teams")
        return
      }

      // Update game status to in_progress
      if (actions.updateGameState) {
        await actions.updateGameState({ status: "in_progress" })
      }

      router.push(`/game/${gameId}`)
    } catch (error) {
      console.error("Error starting game:", error)
      setError("Failed to start game")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading game lobby...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/lobby">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Lobby
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-german-gold rounded-lg flex items-center justify-center">
                <span className="text-german-gold-foreground font-bold text-lg">D</span>
              </div>
              <div>
                <span className="font-bold">Room: {roomCode}</span>
                <div className="text-sm text-muted-foreground">Waiting for players to join...</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <RulesModal />
            <Badge variant="outline">
              <Users className="w-3 h-3 mr-1" />
              {players.length} players
            </Badge>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Game Status */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Game Lobby</h2>
                  <p className="text-muted-foreground">Choose your team and role before starting</p>
                </div>
                {currentPlayer.isCreator && (
                  <Button onClick={startGame} disabled={!canStartGame} size="lg">
                    <Play className="w-4 h-4 mr-2" />
                    Start Game
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Ready Status */}
          {!canStartGame && (
            <Alert>
              <AlertDescription>
                Need at least 2 players with one spymaster per team to start the game.
              </AlertDescription>
            </Alert>
          )}

          {/* Share Game */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Invite Players</CardTitle>
              <CardDescription>Share this link to invite more players</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <input
                  value={shareableLink}
                  readOnly
                  className="flex-1 px-3 py-2 text-sm bg-muted rounded-md font-mono"
                />
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Teams */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Red Team */}
            <Card className="border-team-red/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-team-red">
                  <div className="w-4 h-4 bg-team-red rounded"></div>
                  Red Team ({redTeam.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Team Members */}
                <div className="space-y-2">
                  {redTeam.map((player) => (
                    <div key={player.id} className="flex items-center justify-between p-3 bg-team-red/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-team-red text-team-red-foreground">
                            {player.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {player.name}
                            {player.isCreator && <Crown className="w-3 h-3 text-german-gold" />}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {player.role === "spymaster" ? "Spymaster" : "Operative"}
                          </div>
                        </div>
                      </div>
                      {player.role === "spymaster" && (
                        <Badge variant="outline" className="border-team-red text-team-red">
                          <Eye className="w-3 h-3 mr-1" />
                          Spymaster
                        </Badge>
                      )}
                    </div>
                  ))}

                  {redTeam.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">No players on red team</div>
                  )}
                </div>

                {/* Join Red Team */}
                {currentPlayer.team !== "red" && (
                  <Button
                    onClick={() => switchTeam("red")}
                    variant="outline"
                    className="w-full border-team-red text-team-red hover:bg-team-red hover:text-team-red-foreground"
                  >
                    Join Red Team
                  </Button>
                )}

                {/* Role Selection for Red Team */}
                {currentPlayer.team === "red" && (
                  <div className="space-y-2">
                    <Separator />
                    <div className="text-sm font-medium">Your Role:</div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => switchRole("operative")}
                        variant={currentPlayer.role === "operative" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                      >
                        Operative
                      </Button>
                      <Button
                        onClick={() => switchRole("spymaster")}
                        variant={currentPlayer.role === "spymaster" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        disabled={redSpymaster && redSpymaster.id !== currentPlayer.id}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Spymaster
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Blue Team */}
            <Card className="border-team-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-team-blue">
                  <div className="w-4 h-4 bg-team-blue rounded"></div>
                  Blue Team ({blueTeam.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Team Members */}
                <div className="space-y-2">
                  {blueTeam.map((player) => (
                    <div key={player.id} className="flex items-center justify-between p-3 bg-team-blue/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-team-blue text-team-blue-foreground">
                            {player.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {player.name}
                            {player.isCreator && <Crown className="w-3 h-3 text-german-gold" />}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {player.role === "spymaster" ? "Spymaster" : "Operative"}
                          </div>
                        </div>
                      </div>
                      {player.role === "spymaster" && (
                        <Badge variant="outline" className="border-team-blue text-team-blue">
                          <Eye className="w-3 h-3 mr-1" />
                          Spymaster
                        </Badge>
                      )}
                    </div>
                  ))}

                  {blueTeam.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">No players on blue team</div>
                  )}
                </div>

                {/* Join Blue Team */}
                {currentPlayer.team !== "blue" && (
                  <Button
                    onClick={() => switchTeam("blue")}
                    variant="outline"
                    className="w-full border-team-blue text-team-blue hover:bg-team-blue hover:text-team-blue-foreground"
                  >
                    Join Blue Team
                  </Button>
                )}

                {/* Role Selection for Blue Team */}
                {currentPlayer.team === "blue" && (
                  <div className="space-y-2">
                    <Separator />
                    <div className="text-sm font-medium">Your Role:</div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => switchRole("operative")}
                        variant={currentPlayer.role === "operative" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                      >
                        Operative
                      </Button>
                      <Button
                        onClick={() => switchRole("spymaster")}
                        variant={currentPlayer.role === "spymaster" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        disabled={blueSpymaster && blueSpymaster.id !== currentPlayer.id}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Spymaster
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Game Settings & Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Game Settings</CardTitle>
                <CardDescription>Configure your game preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty Level</label>
                  <Select defaultValue="beginner">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">A1 - Beginner</SelectItem>
                      <SelectItem value="intermediate">A2 - Elementary</SelectItem>
                      <SelectItem value="advanced">B1 - Intermediate</SelectItem>
                      <SelectItem value="expert">B2 - Upper Intermediate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Enable Timer</label>
                  <Switch defaultChecked={false} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Show Translations</label>
                  <Switch defaultChecked={true} />
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
              canEdit={currentPlayer.isCreator}
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Game Rules</CardTitle>
                <CardDescription>Learn how to play Deutchnames</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Deutchnames is a German vocabulary learning game based on Codenames. 
                  Teams compete to find their words using one-word clues.
                </p>
                <RulesModal trigger={
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    View Complete Rules
                  </Button>
                } />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
