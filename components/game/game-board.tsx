"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Volume2, Eye, EyeOff, Lightbulb } from "lucide-react"
import type { GameState } from "@/lib/game-logic"
import { CardFlipAnimation } from "./card-flip-animation"
import { ColorblindPatterns } from "./colorblind-patterns"
import { useSoundEffects } from "@/hooks/use-sound-effects"
import { Confetti, Fireworks } from "@/components/ui/confetti"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface GameBoardProps {
  showSpymasterView?: boolean
  onCardClick?: (cardId: string) => void
  gameState?: GameState
  canInteract?: boolean
  playerRole?: "operative" | "spymaster"
  
  // Enhanced options
  highContrast?: boolean
  colorblindMode?: boolean
  soundEnabled?: boolean
  showTranslations?: boolean
  onToggleSpymasterView?: () => void
}

export function GameBoard({
  showSpymasterView = false,
  onCardClick,
  gameState,
  canInteract = false,
  playerRole = "operative",
  highContrast = false,
  colorblindMode = false,
  soundEnabled = true,
  showTranslations = true,
  onToggleSpymasterView,
}: GameBoardProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [lastRevealedCard, setLastRevealedCard] = useState<string | null>(null)
  
  const { playCardFlip, playCardReveal, playWin, playAssassin } = useSoundEffects()

  // Use word cards from game state, fallback to empty array
  const wordCards = gameState?.wordCards || []

  const handleCardClick = (cardId: string) => {
    const card = wordCards.find((c) => c.id === cardId)
    if (!card || card.revealed || !canInteract) return

    // Add visual feedback
    setSelectedCards(prev => [...prev, cardId])
    
    // Play sound effects
    if (soundEnabled) {
      playCardFlip()
      setTimeout(() => {
        if (card.card_type === "assassin") {
          playAssassin()
        } else {
          playCardReveal(card.card_type)
        }
      }, 300)
    }

    // Track last revealed card for special effects
    setLastRevealedCard(cardId)
    setTimeout(() => setLastRevealedCard(null), 1000)

    if (onCardClick) {
      onCardClick(cardId)
    }
    
    // Remove selection after animation
    setTimeout(() => {
      setSelectedCards(prev => prev.filter(id => id !== cardId))
    }, 600)
  }

  // Handle win celebration
  useEffect(() => {
    if (gameState?.winner && soundEnabled) {
      playWin()
      setShowCelebration(true)
      // Auto-hide celebration after 10 seconds
      setTimeout(() => setShowCelebration(false), 10000)
    }
  }, [gameState?.winner, soundEnabled, playWin])

  const getCardStyle = (card: any) => {
    const isRevealed = card.revealed
    const isClickable = canInteract && !isRevealed
    const isHovered = hoveredCard === card.id
    const isSelected = selectedCards.includes(card.id)
    const isLastRevealed = lastRevealedCard === card.id
    
    // Base card styling - matches real Codenames proportions
    const baseClasses = "relative w-full h-24 rounded-lg flex flex-col items-center justify-center text-center font-semibold text-sm transition-all duration-300 border-2 select-none group overflow-hidden"
    
    if (isRevealed) {
      // Revealed cards show actual team colors
      const pulseEffect = isLastRevealed ? "animate-pulse" : ""
      switch (card.card_type) {
        case "red":
          return cn(
            baseClasses, 
            "transform scale-95 shadow-lg", pulseEffect,
            highContrast 
              ? "bg-red-600 text-white border-black" 
              : "bg-red-500 text-white border-red-600"
          )
        case "blue":
          return cn(
            baseClasses, 
            "transform scale-95 shadow-lg", pulseEffect,
            highContrast 
              ? "bg-blue-600 text-white border-black" 
              : "bg-blue-500 text-white border-blue-600"
          )
        case "neutral":
          return cn(
            baseClasses, 
            "transform scale-95 shadow-lg", pulseEffect,
            highContrast 
              ? "bg-yellow-400 text-black border-black" 
              : "bg-yellow-500 text-white border-yellow-600"
          )
        case "assassin":
          return cn(
            baseClasses, 
            "transform scale-95 shadow-lg animate-pulse",
            highContrast 
              ? "bg-black text-white border-white" 
              : "bg-gray-900 text-white border-gray-700"
          )
      }
    }

    // Spymaster view - shows subtle color hints while maintaining card appearance
    if (playerRole === "spymaster" || showSpymasterView) {
      const hoverEffect = isClickable && isHovered ? "transform scale-105 shadow-md" : ""
      const selectEffect = isSelected ? "transform scale-110 shadow-lg" : ""
      const cursor = isClickable ? "cursor-pointer" : "cursor-default"
      
      switch (card.card_type) {
        case "red":
          return cn(baseClasses, "bg-red-100 text-red-900 border-red-300", hoverEffect, selectEffect, cursor)
        case "blue":
          return cn(baseClasses, "bg-blue-100 text-blue-900 border-blue-300", hoverEffect, selectEffect, cursor)
        case "neutral":
          return cn(baseClasses, "bg-yellow-50 text-yellow-900 border-yellow-200", hoverEffect, selectEffect, cursor)
        case "assassin":
          return cn(baseClasses, "bg-gray-800 text-white border-gray-900", hoverEffect, selectEffect, cursor)
      }
    }

    // Operative view - all unrevealed cards look identical (classic Codenames tan/beige)
    const hoverEffect = isClickable && isHovered ? "transform scale-105 shadow-md bg-yellow-100" : ""
    const selectEffect = isSelected ? "transform scale-110 shadow-lg" : ""
    const cursor = isClickable ? "cursor-pointer" : "cursor-default"
    
    return cn(
      baseClasses,
      "bg-yellow-50 border-yellow-200",
      highContrast ? "text-black" : "text-gray-800",
      hoverEffect,
      selectEffect,
      cursor
    )
  }
  
  // Pronunciation function
  const pronounceWord = (word: string) => {
    if (!soundEnabled || !('speechSynthesis' in window)) return
    
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = 'de-DE'
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Board Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Spymaster View Toggle */}
          {playerRole !== "spymaster" && onToggleSpymasterView && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleSpymasterView}
              className="gap-2"
            >
              {showSpymasterView ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {showSpymasterView ? "Hide Colors" : "Preview Colors"}
            </Button>
          )}
          
          {/* Hints Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHints(!showHints)}
            className="gap-2"
          >
            <Lightbulb className="w-3 h-3" />
            {showHints ? "Hide Hints" : "Show Hints"}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Current clue display */}
          {gameState?.currentClue && (
            <Badge variant="outline" className="gap-2">
              "{gameState.currentClue.clue_word}" - {gameState.currentClue.clue_number}
              {gameState.guessesRemaining > 0 && (
                <span className="text-xs">({gameState.guessesRemaining} left)</span>
              )}
            </Badge>
          )}
        </div>
      </div>

      {/* Spymaster indicator */}
      {(playerRole === "spymaster" || showSpymasterView) && (
        <div className="mb-4 text-center">
          <Badge variant="outline" className="gap-2 bg-yellow-100 border-yellow-300 text-yellow-800">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            {playerRole === "spymaster" ? "SPYMASTER VIEW" : "COLOR PREVIEW MODE"}
          </Badge>
        </div>
      )}

      {/* Classic Codenames 5x5 Grid */}
      <TooltipProvider>
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-lg shadow-inner">
        <div className="grid grid-cols-5 gap-3">
          {wordCards.map((card) => (
            <div key={card.id} className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <CardFlipAnimation
                    isRevealed={card.revealed}
                    cardType={card.card_type}
                    onFlipComplete={() => {
                      console.log(`Card ${card.german_word} revealed as ${card.card_type}!`)
                    }}
                  >
                <motion.div
                  className={getCardStyle(card)}
                  onClick={() => handleCardClick(card.id)}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={canInteract && !card.revealed ? { scale: 1.02 } : {}}
                  whileTap={canInteract && !card.revealed ? { scale: 0.98 } : {}}
                >
                  {/* German word - always visible */}
                  <div className="font-bold text-sm uppercase tracking-wide mb-1">
                    {card.german_word}
                  </div>
                  
                  {/* English translation */}
                  {showTranslations && (card.revealed || playerRole === "spymaster" || showSpymasterView || hoveredCard === card.id) && (
                    <motion.div 
                      className="text-xs opacity-75 italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.75 }}
                      transition={{ duration: 0.2 }}
                    >
                      {card.english_translation}
                    </motion.div>
                  )}

                  {/* Pronunciation button */}
                  {hoveredCard === card.id && soundEnabled && (
                    <motion.div
                      className="absolute top-1 left-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-6 h-6 p-0 bg-white/80 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          if ('speechSynthesis' in window) {
                            const utterance = new SpeechSynthesisUtterance(card.german_word)
                            utterance.lang = 'de-DE'
                            utterance.rate = 0.8
                            speechSynthesis.speak(utterance)
                          }
                        }}
                      >
                        <Volume2 className="w-3 h-3" />
                      </Button>
                    </motion.div>
                  )}

                  {/* Colorblind patterns overlay */}
                  {colorblindMode && (
                    <ColorblindPatterns 
                      cardType={card.card_type}
                      isRevealed={card.revealed}
                    />
                  )}

                  {/* Hint overlay */}
                  {showHints && hoveredCard === card.id && !card.revealed && (
                    <motion.div
                      className="absolute inset-0 bg-black/80 rounded-lg flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-white text-xs text-center p-2">
                        <div className="font-medium">{card.english_translation}</div>
                        {(playerRole === "spymaster" || showSpymasterView) && (
                          <div className="mt-1 text-xs opacity-75">
                            Team: {card.card_type}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Selection indicator */}
                  {selectedCards.includes(card.id) && (
                    <motion.div
                      className="absolute inset-0 border-4 border-green-400 rounded-lg"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.div>
                  </CardFlipAnimation>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <div className="text-center space-y-1">
                    <div className="font-semibold">{card.german_word}</div>
                    <div className="text-sm">{card.english_translation}</div>
                    {(playerRole === "spymaster" || showSpymasterView) && !card.revealed && (
                      <div className="text-xs opacity-75">
                        Team: {card.card_type.toUpperCase()}
                      </div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>
        </div>
      </TooltipProvider>
      
      {/* Board Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Spymaster View Toggle */}
          {playerRole !== "spymaster" && onToggleSpymasterView && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleSpymasterView}
              className="gap-2"
            >
              {showSpymasterView ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {showSpymasterView ? "Hide Colors" : "Preview Colors"}
            </Button>
          )}
          
          {/* Hints Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHints(!showHints)}
            className="gap-2"
          >
            <Lightbulb className="w-3 h-3" />
            {showHints ? "Hide Hints" : "Show Hints"}
          </Button>
        </div>
      </div>
      
      {/* Game instructions */}
      <div className="text-center text-sm text-muted-foreground space-y-1">
        {playerRole === "spymaster" ? (
          <div>
            <p className="font-medium">🎯 Spymaster View: You can see all card colors</p>
            <p>Give your team one-word clues to help them find their words</p>
          </div>
        ) : canInteract ? (
          <div>
            <p className="font-medium">🎮 Your Turn: Click cards to make guesses</p>
            <p>Hover over cards to see translations • Be careful of the assassin!</p>
          </div>
        ) : (
          <div>
            <p className="font-medium">⏳ Wait for your turn</p>
            <p>Watch and learn from other players' moves</p>
          </div>
        )}
      </div>

      {/* Celebration Effects */}
      {gameState?.winner && (
        <>
          <Confetti active={showCelebration} />
          {gameState.winner && (
            <Fireworks active={showCelebration} />
          )}
        </>
      )}

      {/* Learning Panel */}
      {hoveredCard && showTranslations && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40"
          >
            <div className="bg-white/95 backdrop-blur-sm border rounded-lg shadow-lg p-4">
              {(() => {
                const card = wordCards.find(c => c.id === hoveredCard)
                if (!card) return null
                
                return (
                  <div className="text-center space-y-2">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold text-lg">{card.german_word}</div>
                        <div className="text-muted-foreground">{card.english_translation}</div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if ('speechSynthesis' in window) {
                            const utterance = new SpeechSynthesisUtterance(card.german_word)
                            utterance.lang = 'de-DE'
                            utterance.rate = 0.8
                            speechSynthesis.speak(utterance)
                          }
                        }}
                        className="gap-1"
                      >
                        <Volume2 className="w-3 h-3" />
                        Pronounce
                      </Button>
                    </div>
                    {(playerRole === "spymaster" || showSpymasterView) && !card.revealed && (
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          card.card_type === "red" && "border-red-300 text-red-600",
                          card.card_type === "blue" && "border-blue-300 text-blue-600",
                          card.card_type === "neutral" && "border-yellow-300 text-yellow-600",
                          card.card_type === "assassin" && "border-gray-300 text-gray-800"
                        )}
                      >
                        {card.card_type.toUpperCase()} TEAM
                      </Badge>
                    )}
                  </div>
                )
              })()}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}

                    {card.english_translation}
                  </div>
                )}
              </div>
            </CardFlipAnimation>
          ))}
        </div>
      </div>
      
      {/* Game instructions */}
      <div className="mt-4 text-center text-sm text-gray-600">
        {playerRole === "operative" ? (
          canInteract ? (
            "Click on cards to make your guesses • Hover to see translations"
          ) : (
            "Wait for your turn to make guesses"
          )
        ) : (
          "You can see all card colors • Give clues to help your team find the right words"
        )}
      </div>
    </div>
  )
}
