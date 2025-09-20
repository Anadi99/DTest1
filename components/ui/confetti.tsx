"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ConfettiProps {
  active: boolean
  duration?: number
  colors?: string[]
}

export function Confetti({ active, duration = 3000, colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"] }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    color: string
    size: number
    rotation: number
    velocity: { x: number; y: number }
  }>>([])

  useEffect(() => {
    if (!active) {
      setParticles([])
      return
    }

    // Generate confetti particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      velocity: {
        x: (Math.random() - 0.5) * 4,
        y: Math.random() * 3 + 2
      }
    }))

    setParticles(newParticles)

    // Clear after duration
    const timer = setTimeout(() => {
      setParticles([])
    }, duration)

    return () => clearTimeout(timer)
  }, [active, duration, colors])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            initial={{
              x: particle.x,
              y: particle.y,
              rotate: particle.rotation,
              scale: 1,
              opacity: 1
            }}
            animate={{
              x: particle.x + particle.velocity.x * 100,
              y: window.innerHeight + 100,
              rotate: particle.rotation + 720,
              scale: 0.5,
              opacity: 0
            }}
            transition={{
              duration: duration / 1000,
              ease: "easeOut"
            }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: Math.random() > 0.5 ? "50%" : "0%"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Fireworks effect for dramatic wins
export function Fireworks({ active, duration = 5000 }: { active: boolean; duration?: number }) {
  const [explosions, setExplosions] = useState<Array<{
    id: number
    x: number
    y: number
    color: string
  }>>([])

  useEffect(() => {
    if (!active) {
      setExplosions([])
      return
    }

    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#fd79a8"]
    let explosionCount = 0

    const createExplosion = () => {
      if (explosionCount >= 8) return

      const newExplosion = {
        id: Date.now() + explosionCount,
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      }

      setExplosions(prev => [...prev, newExplosion])
      explosionCount++

      // Remove explosion after animation
      setTimeout(() => {
        setExplosions(prev => prev.filter(e => e.id !== newExplosion.id))
      }, 1500)
    }

    // Create explosions at intervals
    const interval = setInterval(createExplosion, 400)

    // Clear after duration
    const timer = setTimeout(() => {
      clearInterval(interval)
      setExplosions([])
    }, duration)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [active, duration])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {explosions.map((explosion) => (
          <div key={explosion.id} className="absolute" style={{ left: explosion.x, top: explosion.y }}>
            {Array.from({ length: 12 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{ backgroundColor: explosion.color }}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1
                }}
                animate={{
                  x: Math.cos((i * 30) * Math.PI / 180) * 100,
                  y: Math.sin((i * 30) * Math.PI / 180) * 100,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}