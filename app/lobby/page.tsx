"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button-enhanced"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card-enhanced"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-enhanced"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { ArrowLeft, Play, Copy, Check, Share2, BookOpen, Gamepad2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { gameStorage } from "@/lib/localStorage"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function LobbyPage() {
  const [playerName, setPlayerName] = useState("")
  const [difficulty, setDifficulty] = useState<"A1" | "A2" | "B1" | "B2">("A1")
  const [selectedTeam, setSelectedTeam] = useState<"red" | "blue" | null>(null)
  const [selectedRole, setSelectedRole] = useState<"spymaster" | "operative" | null>(null)
  const [enableTimer, setEnableTimer] = useState(false)
  const [timerDuration, setTimerDuration] = useState(60)
  const [enableLog, setEnableLog] = useState(true)
  const [playMode, setPlayMode] = useState<"local" | "multiplayer">("multiplayer")
  const [isCreating, setIsCreating] = useState(false)
  const [shareableLink, setShareableLink] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [createdGame, setCreatedGame] = useState<any>(null)

  const router = useRouter()
  const { toast } = useToast()

  const handleCreateGame = async () => {
    if (!playerName.trim()) {
      setError("Please enter your name")
      return
    }

    setIsCreating(true)
    setError("")

    try {
      const gameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const playerId = `creator_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Create game session in localStorage
      const gameSession = {
        id: gameId,
        name: `${playerName}'s Game`,
        createdAt: new Date().toISOString(),
        players: [playerName],
        isActive: true,
        difficulty,
        creator: playerName,
        creatorId: playerId,
      }

      gameStorage.saveSession(gameSession)
      setCreatedGame(gameSession)

      const link = `${window.location.origin}/join/${gameId}`
      setShareableLink(link)

      localStorage.setItem(
        "vocabulary-player",
        JSON.stringify({
          id: playerId,
          name: playerName,
          gameId: gameId,
          isCreator: true,
        }),
      )

      toast({
        title: "Game Created!",
        description: `Your game "${gameSession.name}" is ready to play.`,
      })
    } catch (error) {
      console.error("Error creating game:", error)
      setError("Failed to create game. Please try again.")
      toast({
        title: "Error",
        description: "Failed to create game. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Link Copied!",
        description: "Game link has been copied to clipboard.",
      })
    } catch (err) {
      const textArea = document.createElement("textarea")
      textArea.value = shareableLink
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Link Copied!",
        description: "Game link has been copied to clipboard.",
      })
    }
  }

  const startGame = () => {
    if (createdGame) {
      // For now, redirect to vocabulary page since we don't have the full game implementation yet
      router.push(`/vocabulary`)
      toast({
        title: "Game Starting!",
        description: "Redirecting to vocabulary practice mode.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Game Lobby</span>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/vocabulary">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <BookOpen className="w-4 h-4 mr-2" />
                Vocabulary
              </Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {!shareableLink ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="bg-gradient-to-br from-slate-500/20 to-gray-500/20 border-slate-300/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-white">Create New Game</CardTitle>
                  <CardDescription className="text-white/70">
                    Start a new vocabulary game and invite friends with a shareable link
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="playerName" className="text-sm font-medium text-white">
                      Your Name
                    </label>
                    <Input
                      id="playerName"
                      placeholder="Enter your name"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      disabled={isCreating}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Difficulty Level</label>
                    <Select value={difficulty} onValueChange={(value: any) => setDifficulty(value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A1">A1 (Beginner - Common words)</SelectItem>
                        <SelectItem value="A2">A2 (Elementary - Basic vocabulary)</SelectItem>
                        <SelectItem value="B1">B1 (Intermediate - Mixed vocabulary)</SelectItem>
                        <SelectItem value="B2">B2 (Upper Intermediate - Complex words)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="bg-red-500/20 border-red-300/30">
                      <AlertDescription className="text-red-200">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    onClick={handleCreateGame}
                    disabled={!playerName.trim() || isCreating}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    {isCreating ? "Creating..." : "Create Game"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-300/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-green-300">Game Created!</CardTitle>
                  <CardDescription className="text-green-200">
                    Share this link with friends to invite them to your game
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Share2 className="w-5 h-5 text-white/70" />
                      <span className="font-medium text-white">Shareable Game Link</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        value={shareableLink}
                        readOnly
                        className="font-mono text-sm bg-white/10 border-white/20 text-white"
                      />
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        size="sm"
                        className="shrink-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
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
                  </div>

                  <div className="bg-blue-500/20 border border-blue-300/30 rounded-lg p-4">
                    <h4 className="font-medium text-blue-200 mb-2">How to invite players:</h4>
                    <ul className="text-sm text-blue-200 space-y-1">
                      <li>• Copy the link above and share it with friends</li>
                      <li>• Players can join directly without creating accounts</li>
                      <li>• Up to 8 players can join your game</li>
                      <li>• Start the game once everyone has joined</li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={startGame}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Game
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShareableLink("")
                        setPlayerName("")
                        setError("")
                        setCreatedGame(null)
                      }}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Create Another
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-500/20 to-gray-500/20 border-slate-300/30">
                <CardHeader>
                  <CardTitle className="text-white">Game Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/70">Creator:</span>
                      <p className="font-medium text-white">{playerName}</p>
                    </div>
                    <div>
                      <span className="text-white/70">Difficulty:</span>
                      <p className="font-medium text-white">{difficulty}</p>
                    </div>
                    {createdGame && (
                      <>
                        <div>
                          <span className="text-white/70">Game Name:</span>
                          <p className="font-medium text-white">{createdGame.name}</p>
                        </div>
                        <div>
                          <span className="text-white/70">Game ID:</span>
                          <p className="font-medium text-xs text-white">{createdGame.id}</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
