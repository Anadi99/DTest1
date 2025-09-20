"use client"

import { useEffect, useRef } from "react"

interface ScreenReaderAnnouncementsProps {
  message: string
  priority?: "polite" | "assertive"
}

export function ScreenReaderAnnouncements({ message, priority = "polite" }: ScreenReaderAnnouncementsProps) {
  const announcementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (message && announcementRef.current) {
      announcementRef.current.textContent = message
    }
  }, [message])

  return <div ref={announcementRef} className="sr-only" aria-live={priority} aria-atomic="true" role="status" />
}
