"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ClockIcon } from "@radix-ui/react-icons"
import type { Clue } from "@/lib/types"

interface ClueHistoryProps {
  clues: Clue[]
}

export function ClueHistory({ clues }: ClueHistoryProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hr ago`
    return date.toLocaleDateString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ClockIcon className="w-5 h-5" />
          Clue History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-3">
            {clues.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No clues given yet. Spymasters will give the first clue to start the game.
              </div>
            ) : (
              clues.map((clue, index) => (
                <div key={clue.id} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            clue.team === "red" ? "border-team-red text-team-red" : "border-team-blue text-team-blue"
                          }
                        >
                          {clue.team.toUpperCase()}
                        </Badge>
                        <span className="text-sm font-medium">{clue.spymaster_id}</span>
                      </div>
                      <div className="text-lg font-bold text-german-gold">
                        "{clue.clue_word}" - {clue.clue_number}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Turn {clue.turn_number} • {formatTimestamp(clue.created_at)}
                      </div>
                    </div>
                  </div>
                  {index < clues.length - 1 && <div className="border-b border-border"></div>}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
