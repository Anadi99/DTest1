"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, MessageCircle, Eye } from "lucide-react"

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

interface TeamChatProps {
  team: "red" | "blue"
  currentPlayer: {
    id: string
    name: string
    role: "spymaster" | "operative"
    team: "red" | "blue"
  }
  messages: ChatMessage[]
  onSendMessage: (message: string, isClue?: boolean, clueNumber?: number) => void
}

export function TeamChat({ team, currentPlayer, messages, onSendMessage }: TeamChatProps) {
  const [message, setMessage] = useState("")
  const [clueNumber, setClueNumber] = useState("")
  const [isGivingClue, setIsGivingClue] = useState(false)

  const isSpymaster = currentPlayer.role === "spymaster"
  const teamMessages = messages.filter((msg) => msg.playerId === currentPlayer.id || !msg.isClue)

  const handleSendMessage = () => {
    if (!message.trim()) return

    if (isGivingClue && isSpymaster) {
      const number = Number.parseInt(clueNumber) || 1
      onSendMessage(message, true, number)
      setIsGivingClue(false)
      setClueNumber("")
    } else {
      onSendMessage(message, false)
    }

    setMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className={`${team === "red" ? "border-team-red/20" : "border-team-blue/20"}`}>
      <CardHeader className="pb-3">
        <CardTitle className={`text-lg flex items-center gap-2 ${team === "red" ? "text-team-red" : "text-team-blue"}`}>
          <MessageCircle className="w-4 h-4" />
          Team Chat
          <Badge variant="outline" className="ml-auto">
            {team === "red" ? "Red" : "Blue"} Team
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Messages */}
        <ScrollArea className="h-48 w-full rounded-md border p-3">
          <div className="space-y-3">
            {teamMessages.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm py-4">
                No messages yet. {isSpymaster ? "Give your first clue!" : "Wait for your spymaster's clue."}
              </div>
            ) : (
              teamMessages.map((msg) => (
                <div key={msg.id} className="flex gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className={`text-xs ${team === "red" ? "bg-team-red" : "bg-team-blue"}`}>
                      {msg.playerName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{msg.playerName}</span>
                      {msg.role === "spymaster" && (
                        <Badge variant="outline" className="text-xs">
                          <Eye className="w-2 h-2 mr-1" />
                          Spymaster
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div
                      className={`text-sm p-2 rounded-lg ${
                        msg.isClue
                          ? `${team === "red" ? "bg-team-red/10 border border-team-red/20" : "bg-team-blue/10 border border-team-blue/20"} font-medium`
                          : "bg-muted"
                      }`}
                    >
                      {msg.isClue && (
                        <div className="text-xs text-muted-foreground mb-1">
                          CLUE: {msg.clueNumber} word{msg.clueNumber !== 1 ? "s" : ""}
                        </div>
                      )}
                      {msg.message}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="space-y-2">
          {/* Clue Toggle for Spymasters */}
          {isSpymaster && (
            <div className="flex items-center gap-2">
              <Button
                variant={isGivingClue ? "default" : "outline"}
                size="sm"
                onClick={() => setIsGivingClue(!isGivingClue)}
                className="text-xs"
              >
                <Eye className="w-3 h-3 mr-1" />
                {isGivingClue ? "Giving Clue" : "Give Clue"}
              </Button>
              {isGivingClue && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">for</span>
                  <Input
                    type="number"
                    min="1"
                    max="9"
                    value={clueNumber}
                    onChange={(e) => setClueNumber(e.target.value)}
                    placeholder="1"
                    className="w-12 h-6 text-xs"
                  />
                  <span className="text-xs text-muted-foreground">words</span>
                </div>
              )}
            </div>
          )}

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isGivingClue
                  ? "Enter your one-word clue..."
                  : isSpymaster
                    ? "Chat with your team..."
                    : "Discuss with your team..."
              }
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || (isGivingClue && !clueNumber.trim())}
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Clue Instructions */}
          {isGivingClue && (
            <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
              <strong>Clue Rules:</strong> Give a one-word clue that relates to {clueNumber || "1"} of your team's
              words. Avoid words that are on the board or too similar to board words.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
