"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send } from "lucide-react"

interface ClueInputProps {
  onGiveClue: (clue: string, number: number) => void
  disabled?: boolean
  team: "red" | "blue"
}

export function ClueInput({ onGiveClue, disabled = false, team }: ClueInputProps) {
  const [clue, setClue] = useState("")
  const [number, setNumber] = useState("")
  const [error, setError] = useState("")

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Give your operatives a clue</h3>
            <p className="text-sm text-muted-foreground">Enter a one-word clue and the number of words it relates to</p>
          </div>

          {error && (
            <Alert variant="destructive">
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
                className="text-center font-medium"
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
                className="text-center"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={disabled || !clue.trim() || !number.trim()}
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

          <div className="text-xs text-muted-foreground text-center">
            Remember: Give only one-word clues that relate to multiple words on the board
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
