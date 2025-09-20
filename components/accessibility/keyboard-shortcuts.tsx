"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface KeyboardShortcutsProps {
  gameId?: string
  onToggleHelp?: () => void
}

export function KeyboardShortcuts({ gameId, onToggleHelp }: KeyboardShortcutsProps) {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      // Global shortcuts
      if (event.key === "?" && onToggleHelp) {
        event.preventDefault()
        onToggleHelp()
      }

      if (event.key === "Escape") {
        event.preventDefault()
        if (gameId) {
          router.push("/lobby")
        } else {
          router.push("/")
        }
      }

      // Game-specific shortcuts
      if (gameId) {
        if (event.key === "h" || event.key === "H") {
          event.preventDefault()
          // Toggle hint/help mode
          if (onToggleHelp) onToggleHelp()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [gameId, onToggleHelp, router])

  return null
}
