"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, Lightbulb, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ClueInputProps {
  onGiveClue: (clue: string, number: number) => void
  disabled?: boolean
  team: "red" | "blue"
}

export function ClueInput({ onGiveClue, disabled = false, team }: ClueInputProps) {
  const [clue, setClue] = useState("")
  const [number, setNumber] = useState("")
  const [error, setError] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleSubmit = () => {
    if (!clue.trim()) {
      setError("Please enter a clue word")
      return
    }

    if (!number.trim() || isNaN(Number(number)) || Number(number) < 1) {
      setError("Please enter a valid number (1 or higher)")
      return
    }

    setError("")
    onGiveClue(clue.trim(), Number(number))
    setClue("")
    setNumber("")
  }

  // Generate clue suggestions based on common German word categories
  const generateSuggestions = () => {
    const commonClues = [
      "Tiere", "Essen", "Farben", "Familie", "Haus", "Natur", "Transport", "Körper", "Kleidung", "Wetter"
    ]
    setSuggestions(commonClues.slice(0, 5))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Give your operatives a clue</h3>
            <p className="text-sm text-muted-foreground">Enter a one-word clue and the number of words it relates to</p>
          </div>

          {/* Clue suggestions */}
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={generateSuggestions}
              className="gap-2 text-xs"
            >
              <Lightbulb className="w-3 h-3" />
              Need inspiration?
            </Button>
            {suggestions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1 justify-center">
                {suggestions.map((suggestion) => (
                  <Badge
                    key={suggestion}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted text-xs"
                    onClick={() => setClue(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="clue" className="block text-sm font-medium mb-2">
                Clue Word
              </label>
              <Input
                id="clue"
                type="text"
                placeholder="TYPE YOUR CLUE HERE"
                value={clue}
                onChange={(e) => setClue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={disabled}
                className="text-center font-medium text-lg"
              />
            </div>

            <div className="w-20">
              <label htmlFor="number" className="block text-sm font-medium mb-2">
                Number
              </label>
              <Input
                id="number"
                type="number"
                min="1"
                max="9"
                placeholder="1"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={disabled}
                className="text-center text-lg font-bold"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={disabled || !clue.trim() || !number.trim()}
              size="lg"
              className={`px-8 ${
                team === "red"
                  ? "bg-team-red hover:bg-team-red/90 text-team-red-foreground"
                  : "bg-team-blue hover:bg-team-blue/90 text-team-blue-foreground"
              }`}
            >
              <Send className="w-4 h-4 mr-2" />
              Give Clue
            </Button>
          </div>

          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-xs text-muted-foreground text-center space-y-1">
              <div className="font-medium">Clue Rules:</div>
              <div>• Give only one-word clues (no compound words or phrases)</div>
              <div>• Cannot use words that appear on the board</div>
              <div>• Number indicates how many words relate to your clue</div>
              <div>• Your team gets [number + 1] total guesses</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
