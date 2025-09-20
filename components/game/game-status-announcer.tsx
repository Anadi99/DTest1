"use client"

import { useEffect, useState } from "react"
import { ScreenReaderAnnouncements } from "@/components/accessibility/screen-reader-announcements"

interface GameStatusAnnouncerProps {
  currentTeam: "red" | "blue"
  gamePhase: "waiting" | "spymaster_clue" | "team_guess" | "game_over"
  winner?: "red" | "blue"
  lastAction?: string
}

export function GameStatusAnnouncer({ currentTeam, gamePhase, winner, lastAction }: GameStatusAnnouncerProps) {
  const [announcement, setAnnouncement] = useState("")

  useEffect(() => {
    let message = ""

    if (winner) {
      message = `Game over! ${winner} team wins!`
    } else if (gamePhase === "spymaster_clue") {
      message = `${currentTeam} team spymaster's turn to give a clue`
    } else if (gamePhase === "team_guess") {
      message = `${currentTeam} team's turn to guess`
    } else if (lastAction) {
      message = lastAction
    }

    if (message) {
      setAnnouncement(message)
      // Clear after announcement
      setTimeout(() => setAnnouncement(""), 100)
    }
  }, [currentTeam, gamePhase, winner, lastAction])

  return <ScreenReaderAnnouncements message={announcement} priority="assertive" />
}
