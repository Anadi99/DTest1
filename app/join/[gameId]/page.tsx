"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Users, Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"

export default function JoinGamePage() {
  const params = useParams()
  const router = useRouter()
  const gameId = params.gameId as string

  const [playerName, setPlayerName] = useState("")
  const [isJoining, setIsJoining] = useState(false)
  const [gameInfo, setGameInfo] = useState<any>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const { data: game, error: gameError } = await supabase
          .from("games")
          .select(`
            *,
            game_players(count)
          `)
          .eq("id", gameId)
          .single()

        if (gameError) {
          throw new Error("Game not found")
        }

        setGameInfo({
          id: game.id,
          room_code: game.room_code,
          difficulty: game.difficulty_level,
          player_count: game.game_players?.[0]?.count || 0,
          max_players: 8,
          status: game.status,
          created_at: game.created_at,
          creator_name: "Game Master",
        })
      } catch (err) {
        console.error("Error fetching game:", err)
        setError("Game not found or expired")
      } finally {
        setLoading(false)
      }
    }

    if (gameId) {
      fetchGameInfo()
    }
  }, [gameId, supabase])

  const handleJoinGame = async () => {
    if (!playerName.trim()) return

    setIsJoining(true)
    try {
      const playerId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      const { data: game, error: gameError } = await supabase.from("games").select("*").eq("id", gameId).single()

      if (gameError) {
        throw new Error("Game not found")
      }

      const { error: joinError } = await supabase.from("game_players").insert({
        game_id: gameId,
        player_id: playerId,
        team: "red",
        role: "operative",
      })

      if (joinError) {
        throw new Error("Failed to join game")
      }

      localStorage.setItem(
        "deutchnames_player",
        JSON.stringify({
          id: playerId,
          name: playerName,
          gameId: gameId,
        }),
      )

      router.push(`/game/${gameId}/lobby`)
    } catch (error) {
      console.error("Error joining game:", error)
      setError("Failed to join game. Please try again.")
    } finally {
      setIsJoining(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading game...</p>
        </div>
      </div>
    )
  }

  if (error && !gameInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-destructive">Game Not Found</CardTitle>
            <CardDescription>This game link may be invalid or expired</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push("/")} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-german-gold rounded-lg flex items-center justify-center">
              <span className="text-german-gold-foreground font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold">Deutchnames</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Join Game</CardTitle>
            <CardDescription>You've been invited to play Deutchnames!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {gameInfo && (
              <div className="bg-accent/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Room {gameInfo.room_code}</span>
                  <Badge variant={gameInfo.status === "waiting" ? "secondary" : "default"}>
                    {gameInfo.status === "waiting" ? "Waiting for Players" : "In Progress"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {gameInfo.player_count}/{gameInfo.max_players} players
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    {gameInfo.difficulty}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Created by {gameInfo.creator_name}</div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="playerName" className="text-sm font-medium">
                Your Name
              </label>
              <Input
                id="playerName"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleJoinGame()}
                disabled={isJoining}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleJoinGame} disabled={!playerName.trim() || isJoining} className="w-full">
              {isJoining && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isJoining ? "Joining..." : "Join Game"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <p>Learn German vocabulary through strategic gameplay!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
