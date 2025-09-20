"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock } from "lucide-react"

interface OperativeViewProps {
  currentClue?: {
    clue_word: string
    clue_number: number
  }
  guessesRemaining?: number
  isWaitingForClue?: boolean
}

export function OperativeView({ currentClue, guessesRemaining = 0, isWaitingForClue = true }: OperativeViewProps) {
  if (isWaitingForClue) {
    return (
      <div className="text-center py-8">
        <Alert className="max-w-md mx-auto">
          <Clock className="h-4 w-4" />
          <AlertDescription>
            <strong>Wait for your spymaster to give you a clue...</strong>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="text-center py-4">
      <Alert className="max-w-md mx-auto">
        <AlertDescription>
          <div className="space-y-2">
            <div>
              <strong>Current Clue:</strong> "{currentClue?.clue_word}" - {currentClue?.clue_number}
            </div>
            <div className="text-sm text-muted-foreground">{guessesRemaining} guesses remaining</div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
