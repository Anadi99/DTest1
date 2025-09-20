"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Play, Pause, RotateCcw, Clock, AlertTriangle } from "lucide-react"
import { useSoundEffects } from "@/hooks/use-sound-effects"

interface GameTimerProps {
  // Timer configuration
  clueTimeLimit?: number // seconds for giving clues
  guessTimeLimit?: number // seconds for guessing phase
  isEnabled?: boolean
  
  // Game state
  currentPhase: "clue_giving" | "guessing" | "paused" | "ended"
  currentTeam: "red" | "blue"
  
  // Callbacks
  onTimeUp?: (phase: "clue_giving" | "guessing") => void
  onTimerToggle?: (enabled: boolean) => void
  
  // Control permissions
  canControl?: boolean
}

export function GameTimer({
  clueTimeLimit = 60,
  guessTimeLimit = 120,
  isEnabled = false,
  currentPhase,
  currentTeam,
  onTimeUp,
  onTimerToggle,
  canControl = false,
}: GameTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [hasWarned, setHasWarned] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const soundEffects = useSoundEffects()

  // Get current phase time limit
  const getCurrentTimeLimit = () => {
    return currentPhase === "clue_giving" ? clueTimeLimit : guessTimeLimit
  }

  // Reset timer when phase changes
  useEffect(() => {
    if (isEnabled && (currentPhase === "clue_giving" || currentPhase === "guessing")) {
      const timeLimit = getCurrentTimeLimit()
      setTimeRemaining(timeLimit)
      setIsActive(true)
      setIsPaused(false)
      setHasWarned(false)
    } else {
      setIsActive(false)
      setIsPaused(false)
    }
  }, [currentPhase, clueTimeLimit, guessTimeLimit, isEnabled])

  // Timer countdown logic
  useEffect(() => {
    if (isActive && !isPaused && isEnabled) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1

          // Warning sound at 10 seconds
          if (newTime === 10 && !hasWarned) {
            setHasWarned(true)
            // Play warning beep
            try {
              const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
              const oscillator = audioContext.createOscillator()
              const gainNode = audioContext.createGain()
              oscillator.connect(gainNode)
              gainNode.connect(audioContext.destination)
              oscillator.frequency.value = 800
              oscillator.type = 'sine'
              gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
              oscillator.start()
              oscillator.stop(audioContext.currentTime + 0.2)
            } catch (e) {
              console.log('Audio not available')
            }
          }

          // Urgent warning sounds in last 5 seconds
          if (newTime <= 5 && newTime > 0) {
            try {
              const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
              const oscillator = audioContext.createOscillator()
              const gainNode = audioContext.createGain()
              oscillator.connect(gainNode)
              gainNode.connect(audioContext.destination)
              oscillator.frequency.value = 1000
              oscillator.type = 'square'
              gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
              oscillator.start()
              oscillator.stop(audioContext.currentTime + 0.15)
            } catch (e) {
              console.log('Audio not available')
            }
          }

          // Time's up!
          if (newTime <= 0) {
            setIsActive(false)
            try {
              const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
              const oscillator = audioContext.createOscillator()
              const gainNode = audioContext.createGain()
              oscillator.connect(gainNode)
              gainNode.connect(audioContext.destination)
              oscillator.frequency.value = 400
              oscillator.type = 'sawtooth'
              gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
              oscillator.start()
              oscillator.stop(audioContext.currentTime + 0.5)
            } catch (e) {
              console.log('Audio not available')
            }
            onTimeUp?.(currentPhase as "clue_giving" | "guessing")
            return 0
          }

          return newTime
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, isPaused, isEnabled, hasWarned, onTimeUp, currentPhase])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTimerColor = () => {
    if (!isEnabled || !isActive) return "text-gray-500"
    
    if (timeRemaining <= 5) return "text-red-600"
    if (timeRemaining <= 10) return "text-orange-500"
    if (timeRemaining <= 30) return "text-yellow-600"
    
    return currentTeam === "red" ? "text-red-500" : "text-blue-500"
  }

  const getProgressPercentage = () => {
    const totalTime = getCurrentTimeLimit()
    return Math.max(0, (timeRemaining / totalTime) * 100)
  }

  const toggleTimer = () => {
    onTimerToggle?.(!isEnabled)
  }

  const togglePause = () => {
    if (canControl && isEnabled) {
      setIsPaused(!isPaused)
    }
  }

  const resetTimer = () => {
    if (canControl) {
      const timeLimit = getCurrentTimeLimit()
      setTimeRemaining(timeLimit)
      setHasWarned(false)
      if (isEnabled) {
        setIsActive(true)
        setIsPaused(false)
      }
    }
  }

  if (!isEnabled) {
    return (
      <Card className="w-48">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Timer Disabled</span>
          </div>
          {canControl && (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTimer}
              className="text-xs"
            >
              Enable Timer
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-48">
      <CardContent className="p-4">
        {/* Timer Display */}
        <div className="text-center mb-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Clock className={cn("w-4 h-4", getTimerColor())} />
            <span className="text-xs text-gray-600 capitalize">
              {currentPhase.replace('_', ' ')} Phase
            </span>
          </div>
          
          <motion.div
            className={cn("text-2xl font-bold font-mono", getTimerColor())}
            animate={timeRemaining <= 5 && isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.5, repeat: timeRemaining <= 5 ? Infinity : 0 }}
          >
            {formatTime(timeRemaining)}
          </motion.div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
            <motion.div
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                timeRemaining <= 5 
                  ? "bg-red-500" 
                  : timeRemaining <= 10 
                    ? "bg-orange-400" 
                    : timeRemaining <= 30
                      ? "bg-yellow-400"
                      : currentTeam === "red" 
                        ? "bg-red-400" 
                        : "bg-blue-400"
              )}
              initial={{ width: "100%" }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Warning Messages */}
        <AnimatePresence>
          {isActive && timeRemaining <= 10 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center mb-2"
            >
              <div className={cn(
                "flex items-center justify-center gap-1 text-xs font-semibold",
                timeRemaining <= 5 ? "text-red-600" : "text-orange-600"
              )}>
                <AlertTriangle className="w-3 h-3" />
                {timeRemaining <= 5 ? "Time's almost up!" : "Hurry up!"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control Buttons */}
        {canControl && (
          <div className="flex justify-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePause}
              disabled={!isActive}
              className="p-2"
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetTimer}
              className="p-2"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTimer}
              className="p-2 text-xs"
            >
              Off
            </Button>
          </div>
        )}

        {/* Phase Information */}
        <div className="text-center mt-2">
          <div className="text-xs text-gray-500">
            {currentPhase === "clue_giving" 
              ? `Clue: ${clueTimeLimit}s` 
              : `Guess: ${guessTimeLimit}s`}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Timer settings component for lobby/game setup
interface TimerSettingsProps {
  clueTimeLimit: number
  guessTimeLimit: number
  isEnabled: boolean
  onClueTimeLimitChange: (time: number) => void
  onGuessTimeLimitChange: (time: number) => void
  onEnabledChange: (enabled: boolean) => void
  canEdit?: boolean
}

export function TimerSettings({
  clueTimeLimit,
  guessTimeLimit,
  isEnabled,
  onClueTimeLimitChange,
  onGuessTimeLimitChange,
  onEnabledChange,
  canEdit = true
}: TimerSettingsProps) {
  const clueOptions = [30, 45, 60, 90, 120] // seconds
  const guessOptions = [60, 90, 120, 180, 240, 300] // seconds

  if (!canEdit && !isEnabled) {
    return null
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Enable Timer</span>
            <Button
              variant={isEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => onEnabledChange(!isEnabled)}
              disabled={!canEdit}
            >
              {isEnabled ? "On" : "Off"}
            </Button>
          </div>

          {isEnabled && canEdit && (
            <>
              <div>
                <label className="text-sm font-medium block mb-2">
                  Clue Time Limit
                </label>
                <div className="flex gap-1 flex-wrap">
                  {clueOptions.map((time) => (
                    <Button
                      key={time}
                      variant={clueTimeLimit === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => onClueTimeLimitChange(time)}
                      className="text-xs"
                    >
                      {time}s
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">
                  Guess Time Limit
                </label>
                <div className="flex gap-1 flex-wrap">
                  {guessOptions.map((time) => (
                    <Button
                      key={time}
                      variant={guessTimeLimit === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => onGuessTimeLimitChange(time)}
                      className="text-xs"
                    >
                      {Math.floor(time / 60)}m {time % 60 ? `${time % 60}s` : ''}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}

          {isEnabled && !canEdit && (
            <div className="text-sm text-gray-600">
              <div>Clue time: {clueTimeLimit}s</div>
              <div>Guess time: {Math.floor(guessTimeLimit / 60)}m {guessTimeLimit % 60 ? `${guessTimeLimit % 60}s` : ''}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
