"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye } from "lucide-react"

interface GameStats {
  red: { total: number; revealed: number; remaining: number }
  blue: { total: number; revealed: number; remaining: number }
  neutral: { total: number; revealed: number; remaining: number }
  assassin: { total: number; revealed: number; remaining: number }
}

interface SpymasterViewProps {
  gameStats?: GameStats
}

export function SpymasterView({ gameStats }: SpymasterViewProps) {
  // Mock card distribution data if not provided
  const cardCounts = gameStats || {
    red: { total: 9, remaining: 7, revealed: 2 },
    blue: { total: 8, remaining: 6, revealed: 2 },
    neutral: { total: 7, remaining: 7, revealed: 0 },
    assassin: { total: 1, remaining: 1, revealed: 0 },
  }

  return (
    <div className="space-y-4">
      <Alert>
        <Eye className="h-4 w-4" />
        <AlertDescription>
          <strong>Spymaster View Active:</strong> You can see the card types. Give clues to help your team find their
          words while avoiding the assassin!
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-team-red rounded-lg mx-auto mb-2 flex items-center justify-center">
            <span className="text-team-red-foreground font-bold">{cardCounts.red.remaining}</span>
          </div>
          <div className="text-sm font-medium">Red Cards</div>
          <div className="text-xs text-muted-foreground">
            {cardCounts.red.remaining}/{cardCounts.red.total} left
          </div>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-team-blue rounded-lg mx-auto mb-2 flex items-center justify-center">
            <span className="text-team-blue-foreground font-bold">{cardCounts.blue.remaining}</span>
          </div>
          <div className="text-sm font-medium">Blue Cards</div>
          <div className="text-xs text-muted-foreground">
            {cardCounts.blue.remaining}/{cardCounts.blue.total} left
          </div>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-muted rounded-lg mx-auto mb-2 flex items-center justify-center">
            <span className="text-muted-foreground font-bold">{cardCounts.neutral.remaining}</span>
          </div>
          <div className="text-sm font-medium">Neutral</div>
          <div className="text-xs text-muted-foreground">
            {cardCounts.neutral.remaining}/{cardCounts.neutral.total} left
          </div>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-destructive rounded-lg mx-auto mb-2 flex items-center justify-center">
            <span className="text-destructive-foreground font-bold">{cardCounts.assassin.remaining}</span>
          </div>
          <div className="text-sm font-medium">Assassin</div>
          <div className="text-xs text-muted-foreground">AVOID!</div>
        </div>
      </div>
    </div>
  )
}
