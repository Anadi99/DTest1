"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { 
  Download, 
  Search, 
  Filter, 
  Clock, 
  Users, 
  MessageCircle, 
  Eye, 
  Target, 
  Trophy,
  AlertTriangle,
  FileText,
  Share2,
  Copy,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export interface GameLogEvent {
  id: string
  type: "game_start" | "clue_given" | "card_revealed" | "turn_ended" | "player_joined" | "team_won" | "timer_expired" | "player_left"
  message: string
  timestamp: Date
  team?: "red" | "blue"
  player?: string
  metadata?: {
    clue?: string
    clueNumber?: number
    cardWord?: string
    cardType?: "red" | "blue" | "neutral" | "assassin"
    isCorrect?: boolean
    timeRemaining?: number
    playerId?: string
    playerName?: string
  }
}

interface GameLogProps {
  events: GameLogEvent[]
  isExpanded?: boolean
  onToggleExpanded?: () => void
  gameId: string
  roomCode: string
  players: { id: string, name: string, team: "red" | "blue", role: "operative" | "spymaster" }[]
  gameStartTime: Date
  className?: string
}

export function GameLog({
  events,
  isExpanded = false,
  onToggleExpanded,
  gameId,
  roomCode,
  players,
  gameStartTime,
  className
}: GameLogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterTeam, setFilterTeam] = useState<string>("all")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)

  // Auto-scroll to bottom when new events are added
  useEffect(() => {
    if (autoScroll && scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [events, autoScroll])

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = searchQuery === "" || 
      event.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.player?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.metadata?.clue?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.metadata?.cardWord?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = filterType === "all" || event.type === filterType
    const matchesTeam = filterTeam === "all" || event.team === filterTeam

    return matchesSearch && matchesType && matchesTeam
  })

  const getEventIcon = (event: GameLogEvent) => {
    switch (event.type) {
      case "game_start": return <Trophy className="w-3 h-3" />
      case "clue_given": return <MessageCircle className="w-3 h-3" />
      case "card_revealed": return <Target className="w-3 h-3" />
      case "turn_ended": return <Clock className="w-3 h-3" />
      case "player_joined": return <Users className="w-3 h-3" />
      case "team_won": return <Trophy className="w-3 h-3" />
      case "timer_expired": return <AlertTriangle className="w-3 h-3" />
      case "player_left": return <X className="w-3 h-3" />
      default: return <FileText className="w-3 h-3" />
    }
  }

  const getEventColor = (event: GameLogEvent) => {
    if (event.type === "team_won") return "text-yellow-700 bg-yellow-50 border-yellow-200"
    if (event.type === "timer_expired") return "text-orange-700 bg-orange-50 border-orange-200"
    if (event.type === "card_revealed" && event.metadata?.cardType === "assassin") {
      return "text-red-700 bg-red-50 border-red-200"
    }
    if (event.team === "red") return "text-red-700 bg-red-50 border-red-200"
    if (event.team === "blue") return "text-blue-700 bg-blue-50 border-blue-200"
    return "text-gray-700 bg-gray-50 border-gray-200"
  }

  const exportGameLog = () => {
    const gameData = {
      gameId,
      roomCode,
      gameStartTime: gameStartTime.toISOString(),
      gameEndTime: new Date().toISOString(),
      duration: Math.round((new Date().getTime() - gameStartTime.getTime()) / 1000 / 60), // minutes
      players: players.map(p => ({
        name: p.name,
        team: p.team,
        role: p.role
      })),
      events: events.map(event => ({
        timestamp: event.timestamp.toISOString(),
        type: event.type,
        message: event.message,
        team: event.team,
        player: event.player,
        metadata: event.metadata
      })),
      stats: generateGameStats()
    }

    const blob = new Blob([JSON.stringify(gameData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `deutchnames-${roomCode}-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportAsText = () => {
    let textLog = `=== DEUTCHNAMES GAME LOG ===\n`
    textLog += `Room: ${roomCode}\n`
    textLog += `Game ID: ${gameId}\n`
    textLog += `Date: ${gameStartTime.toLocaleDateString()} ${gameStartTime.toLocaleTimeString()}\n`
    textLog += `Duration: ${Math.round((new Date().getTime() - gameStartTime.getTime()) / 1000 / 60)} minutes\n\n`
    
    textLog += `PLAYERS:\n`
    players.forEach(player => {
      textLog += `  ${player.name} - ${player.team.toUpperCase()} ${player.role}\n`
    })
    textLog += `\n`

    textLog += `GAME EVENTS:\n`
    events.forEach(event => {
      const time = event.timestamp.toLocaleTimeString()
      const team = event.team ? `[${event.team.toUpperCase()}]` : ''
      textLog += `${time} ${team} ${event.message}\n`
    })

    const blob = new Blob([textLog], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `deutchnames-${roomCode}-log.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyLogToClipboard = async () => {
    const logText = events.map(event => {
      const time = event.timestamp.toLocaleTimeString()
      const team = event.team ? `[${event.team.toUpperCase()}]` : ''
      return `${time} ${team} ${event.message}`
    }).join('\n')
    
    try {
      await navigator.clipboard.writeText(logText)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = logText
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }

  const generateGameStats = () => {
    const clueEvents = events.filter(e => e.type === "clue_given")
    const cardRevealEvents = events.filter(e => e.type === "card_revealed")
    const redClues = clueEvents.filter(e => e.team === "red").length
    const blueClues = clueEvents.filter(e => e.team === "blue").length
    const redCorrect = cardRevealEvents.filter(e => e.team === "red" && e.metadata?.isCorrect).length
    const blueCorrect = cardRevealEvents.filter(e => e.team === "blue" && e.metadata?.isCorrect).length
    
    return {
      totalClues: clueEvents.length,
      redClues,
      blueClues,
      totalReveals: cardRevealEvents.length,
      redCorrect,
      blueCorrect,
      efficiency: {
        red: redClues > 0 ? Math.round((redCorrect / redClues) * 100) : 0,
        blue: blueClues > 0 ? Math.round((blueCorrect / blueClues) * 100) : 0
      }
    }
  }

  if (!isExpanded) {
    // Compact view
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Game Log</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {events.length} events
              </Badge>
              {onToggleExpanded && (
                <Button variant="ghost" size="sm" onClick={onToggleExpanded}>
                  <Eye className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ScrollArea className="h-32" ref={scrollAreaRef}>
            <div className="space-y-1">
              {events.slice(-5).map((event) => (
                <div key={event.id} className="text-xs p-2 rounded border-l-2 border-gray-200">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    {getEventIcon(event)}
                    <span>{event.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <div className={cn("text-xs", 
                    event.team === "red" ? "text-red-700" : 
                    event.team === "blue" ? "text-blue-700" : "text-gray-700"
                  )}>
                    {event.message}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Game Log
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {filteredEvents.length} of {events.length} events
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onToggleExpanded && (
              <Button variant="ghost" size="sm" onClick={onToggleExpanded}>
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-3 h-3 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events, players, clues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 text-sm"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-xs border rounded px-2 py-1"
            >
              <option value="all">All Events</option>
              <option value="clue_given">Clues</option>
              <option value="card_revealed">Reveals</option>
              <option value="turn_ended">Turn Ends</option>
              <option value="timer_expired">Timer Events</option>
            </select>
            
            <select
              value={filterTeam}
              onChange={(e) => setFilterTeam(e.target.value)}
              className="text-xs border rounded px-2 py-1"
            >
              <option value="all">All Teams</option>
              <option value="red">Red Team</option>
              <option value="blue">Blue Team</option>
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-64 mb-4" ref={scrollAreaRef}>
          <div className="space-y-2">
            <AnimatePresence>
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className={cn(
                    "border rounded-lg p-3 text-sm",
                    getEventColor(event)
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 flex-1">
                      <div className="mt-0.5">
                        {getEventIcon(event)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium">
                            {event.timestamp.toLocaleTimeString()}
                          </span>
                          {event.team && (
                            <Badge variant="outline" className="text-xs">
                              {event.team.toUpperCase()}
                            </Badge>
                          )}
                          {event.player && (
                            <Badge variant="secondary" className="text-xs">
                              {event.player}
                            </Badge>
                          )}
                        </div>
                        <div className="font-medium">{event.message}</div>
                        
                        {/* Additional metadata */}
                        {event.metadata && (
                          <div className="mt-2 text-xs opacity-75 space-y-1">
                            {event.metadata.clue && (
                              <div>Clue: "{event.metadata.clue}" - {event.metadata.clueNumber}</div>
                            )}
                            {event.metadata.cardWord && (
                              <div>Card: {event.metadata.cardWord} ({event.metadata.cardType})</div>
                            )}
                            {event.metadata.timeRemaining !== undefined && (
                              <div>Time remaining: {event.metadata.timeRemaining}s</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>

        <Separator className="my-4" />

        {/* Export Options */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAutoScroll(!autoScroll)}
              className={cn("text-xs", autoScroll && "bg-muted")}
            >
              Auto-scroll: {autoScroll ? "On" : "Off"}
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={copyLogToClipboard}>
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Export Game Log</DialogTitle>
                  <DialogDescription>
                    Choose how you'd like to export this game session
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" onClick={exportAsText} className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Text File (.txt)
                    </Button>
                    <Button variant="outline" onClick={exportGameLog} className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      JSON Data (.json)
                    </Button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p><strong>Text File:</strong> Human-readable log for sharing or printing</p>
                    <p><strong>JSON Data:</strong> Complete game data including metadata and statistics</p>
                  </div>
                  
                  {/* Game Stats Preview */}
                  <div className="bg-muted p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Game Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div>Duration: {Math.round((new Date().getTime() - gameStartTime.getTime()) / 1000 / 60)} minutes</div>
                        <div>Total Events: {events.length}</div>
                      </div>
                      <div>
                        <div>Players: {players.length}</div>
                        <div>Room: {roomCode}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
