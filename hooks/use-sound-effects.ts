"use client"

import { useCallback, useRef, useEffect } from "react"

interface SoundEffectsHook {
  playCardFlip: () => void
  playCardReveal: (cardType: "red" | "blue" | "neutral" | "assassin") => void
  playCorrectGuess: () => void
  playWrongGuess: () => void
  playWin: () => void
  playAssassin: () => void
  setVolume: (volume: number) => void
  toggleMute: () => void
}

export function useSoundEffects(): SoundEffectsHook {
  const audioContextRef = useRef<AudioContext | null>(null)
  const volumeRef = useRef(0.3) // Default volume
  const mutedRef = useRef(false)

  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudioContext = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
    }

    // Add event listener for first user interaction
    const handleFirstInteraction = () => {
      initAudioContext()
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }

    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('keydown', handleFirstInteraction)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const createBeep = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current || mutedRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)
    
    oscillator.frequency.value = frequency
    oscillator.type = type
    
    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
    gainNode.gain.linearRampToValueAtTime(volumeRef.current, audioContextRef.current.currentTime + 0.01)
    gainNode.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + duration)
    
    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + duration)
  }, [])

  const playCardFlip = useCallback(() => {
    // Quick swoosh sound for card flip
    createBeep(200, 0.1, 'triangle')
    setTimeout(() => createBeep(300, 0.1, 'triangle'), 50)
  }, [createBeep])

  const playCardReveal = useCallback((cardType: "red" | "blue" | "neutral" | "assassin") => {
    switch (cardType) {
      case "red":
        // Lower, warmer tone for red
        createBeep(220, 0.3, 'sine')
        break
      case "blue":
        // Higher, cooler tone for blue  
        createBeep(330, 0.3, 'sine')
        break
      case "neutral":
        // Neutral, middle tone
        createBeep(277, 0.2, 'triangle')
        break
      case "assassin":
        // Dramatic low tone for assassin
        createBeep(110, 0.5, 'sawtooth')
        setTimeout(() => createBeep(55, 0.3, 'sawtooth'), 200)
        break
    }
  }, [createBeep])

  const playCorrectGuess = useCallback(() => {
    // Happy ascending notes
    createBeep(262, 0.15, 'sine') // C
    setTimeout(() => createBeep(330, 0.15, 'sine'), 100) // E
    setTimeout(() => createBeep(392, 0.15, 'sine'), 200) // G
  }, [createBeep])

  const playWrongGuess = useCallback(() => {
    // Descending disappointed notes
    createBeep(330, 0.2, 'triangle')
    setTimeout(() => createBeep(220, 0.3, 'triangle'), 150)
  }, [createBeep])

  const playWin = useCallback(() => {
    // Victory fanfare
    createBeep(523, 0.2, 'sine') // C
    setTimeout(() => createBeep(659, 0.2, 'sine'), 150) // E
    setTimeout(() => createBeep(784, 0.2, 'sine'), 300) // G
    setTimeout(() => createBeep(1047, 0.4, 'sine'), 450) // High C
  }, [createBeep])

  const playAssassin = useCallback(() => {
    // Dramatic game over sound
    createBeep(55, 0.8, 'sawtooth')
    setTimeout(() => createBeep(41, 0.6, 'sawtooth'), 400)
    setTimeout(() => createBeep(32, 1.0, 'sawtooth'), 700)
  }, [createBeep])

  const setVolume = useCallback((volume: number) => {
    volumeRef.current = Math.max(0, Math.min(1, volume))
  }, [])

  const toggleMute = useCallback(() => {
    mutedRef.current = !mutedRef.current
  }, [])

  return {
    playCardFlip,
    playCardReveal,
    playCorrectGuess,
    playWrongGuess,
    playWin,
    playAssassin,
    setVolume,
    toggleMute
  }
}

// Simple visual feedback component for when sounds play
export function SoundIndicator({ isPlaying }: { isPlaying: boolean }) {
  if (!isPlaying) return null
  
  return (
    <div className="fixed top-4 right-4 z-50 bg-black/20 backdrop-blur-sm rounded-full p-2 animate-pulse">
      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
    </div>
  )
}
