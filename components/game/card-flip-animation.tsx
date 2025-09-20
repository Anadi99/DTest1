"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useSoundEffects } from "@/hooks/use-sound-effects"

interface CardFlipAnimationProps {
  children: React.ReactNode
  isRevealed: boolean
  cardType: "red" | "blue" | "neutral" | "assassin"
  onFlipComplete?: () => void
  className?: string
}

export function CardFlipAnimation({
  children,
  isRevealed,
  cardType,
  onFlipComplete,
  className,
}: CardFlipAnimationProps) {
  const [isFlipping, setIsFlipping] = useState(false)
  const [showBack, setShowBack] = useState(false)
  const { playCardFlip, playCardReveal } = useSoundEffects()

  useEffect(() => {
    if (isRevealed && !showBack) {
      setIsFlipping(true)
      
      // Play flip sound immediately
      playCardFlip()
      
      // Flip to show the back (revealed state) after a short delay
      setTimeout(() => {
        setShowBack(true)
        // Play reveal sound when card shows its color
        playCardReveal(cardType)
      }, 150) // Half the flip duration
      
      // Complete the flip animation
      setTimeout(() => {
        setIsFlipping(false)
        onFlipComplete?.()
      }, 300)
    }
  }, [isRevealed, showBack, onFlipComplete, playCardFlip, playCardReveal, cardType])

  const getRevealedStyle = (type: string) => {
    switch (type) {
      case "red":
        return "bg-red-600 text-white border-red-700 shadow-lg"
      case "blue":
        return "bg-blue-600 text-white border-blue-700 shadow-lg"
      case "neutral":
        return "bg-yellow-600 text-white border-yellow-700 shadow-lg"
      case "assassin":
        return "bg-black text-white border-gray-900 shadow-lg"
      default:
        return "bg-gray-600 text-white border-gray-700 shadow-lg"
    }
  }

  const flipVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }

  const cardStyle = cn(
    "relative w-full h-24 rounded-md flex flex-col items-center justify-center text-center font-semibold text-base transition-all duration-300 border-2 select-none backface-hidden",
    className
  )

  return (
    <div className="relative perspective-1000">
      <motion.div
        className="relative w-full h-24 transform-gpu"
        style={{ transformStyle: "preserve-3d" }}
        animate={showBack ? "back" : "front"}
        variants={flipVariants}
      >
        {/* Front face (unrevealed card) */}
        <motion.div
          className={cn(
            cardStyle,
            "absolute inset-0 bg-yellow-50 text-gray-800 border-yellow-200",
            "backface-hidden"
          )}
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg)"
          }}
        >
          {!showBack && children}
        </motion.div>

        {/* Back face (revealed card) */}
        <motion.div
          className={cn(
            cardStyle,
            "absolute inset-0",
            getRevealedStyle(cardType),
            "backface-hidden"
          )}
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          {showBack && (
            <>
              {children}
              {/* Revealed indicator */}
              <div className="absolute top-1 right-1">
                <motion.div 
                  className="w-3 h-3 bg-white rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
                >
                  <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                </motion.div>
              </div>
              
              {/* Sparkle effect for dramatic reveals */}
              {(cardType === "assassin") && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <div className="absolute top-1 left-1 w-1 h-1 bg-red-400 rounded-full animate-ping"></div>
                  <div className="absolute top-3 right-2 w-1 h-1 bg-red-400 rounded-full animate-ping" style={{ animationDelay: "0.2s" }}></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-red-400 rounded-full animate-ping" style={{ animationDelay: "0.4s" }}></div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
      
      {/* Flip sound effect placeholder - you could add actual sounds here */}
      {isFlipping && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  )
}

// CSS utility class for perspective (add to your global CSS)
export const perspectiveStyles = `
.perspective-1000 {
  perspective: 1000px;
}

.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.transform-gpu {
  transform: translateZ(0);
}
`
