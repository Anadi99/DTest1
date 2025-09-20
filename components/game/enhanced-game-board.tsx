"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Volume2, 
  Eye, 
  EyeOff, 
  Palette, 
  RotateCcw,
  Lightbulb,
  Target
} from "lucide-react"
import { CardFlipAnimation } from "./card-flip-animation"
import { ColorblindPatterns, colorblindSafeColors, highContrastColors } from "./colorblind-patterns"
import { useSoundEffects } from "@/hooks/use-sound-effects"
import type { GameState } from "@/lib/game-logic"

interface EnhancedGameBoardProps {
  gameState: GameState
  currentPlayer: {
    id: string
    name: string
    team: "red" | "blue"
    role: "operative" | "spymaster"
  }
  onCardClick: (cardId: string) => void
  canInteract: boolean
  
  // Accessibility options
  highContrast?: boolean
  colorblindMode?: boolean
  soundEnabled?: boolean
  showTranslations?: boolean
  
  // UI options
  showSpymasterPreview?: boolean
  onToggleSpymasterPreview?: () => void
  className?: string
}

export function EnhancedGameBoard({
  gameState,
  currentPlayer,
  onCardClick,
  canInteract,
  highContrast = false,
  colorblindMode = false,
  soundEnabled = true,
  showTranslations = true,
  showSpymasterPreview = false,
  onToggleSpymasterPreview,
  className
}: EnhancedGameBoardProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const [showHints, setShowHints] = useState(false)
  const { playCardFlip, playCardReveal } = useSoundEffects()

  const wordCards = gameState.wordCards || []
  const isSpymaster = currentPlayer.role === "spymaster"
  const showColors = isSpymaster || showSpymasterPreview

  // Handle card click with enhanced feedback
  const handleCardClick = (cardId: string) => {
    const card = wordCards.find(c => c.id === cardId)
    if (!card || card.revealed || !canInteract) return

    // Add visual selection feedback
    setSelectedCards(prev => [...prev, cardId])
    
    // Play sound effect
    if (soundEnabled) {
      playCardFlip()
      setTimeout(() => {
        playCardReveal(card.card_type)
      }, 300)
    }

    // Remove selection after animation
    setTimeout(() => {
      setSelectedCards(prev => prev.filter(id => id !== cardId))
    }, 600)

    onCardClick(cardId)
  }

  // Pronunciation function
  const pronounceWord = (word: string) => {
    if (!soundEnabled || !('speechSynthesis' in window)) return
    
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = 'de-DE'
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  // Get card styling based on accessibility settings
  const getCardStyle = (card: any) => {
    const isRevealed = card.revealed
    const isHovered = hoveredCard === card.id
    const isSelected = selectedCards.includes(card.id)
    const isClickable = canInteract && !isRevealed

    // Base classes
    const baseClasses = "relative w-full h-24 rounded-lg flex flex-col items-center justify-center text-center font-semibold text-sm transition-all duration-300 border-2 select-none cursor-pointer group"

    if (isRevealed) {
      // Use accessibility color schemes if enabled
      const colors = highContrast ? highContrastColors : colorblindSafeColors
      
      switch (card.card_type) {
        case "red":
          return cn(
            baseClasses,
            "transform scale-95 shadow-lg",
            highContrast 
              ? "bg-red-600 text-white border-black" 
              : "bg-red-500 text-white border-red-600"
          )
        case "blue":
          return cn(
            baseClasses,
            "transform scale-95 shadow-lg",
            highContrast 
              ? "bg-blue-600 text-white border-black" 
              : "bg-blue-500 text-white border-blue-600"
          )
        case "neutral":
          return cn(
            baseClasses,
            "transform scale-95 shadow-lg",
            highContrast 
              ? "bg-yellow-400 text-black border-black" 
              : "bg-yellow-500 text-white border-yellow-600"
          )
        case "assassin":
          return cn(
            baseClasses,
            "transform scale-95 shadow-lg",
            highContrast 
              ? "bg-black text-white border-white" 
              : "bg-gray-900 text-white border-gray-700"
          )
      }
    }

    // Spymaster view with subtle color hints
    if (showColors) {
      const hoverEffect = isClickable && isHovered ? "transform scale-105 shadow-md" : ""
      const selectEffect = isSelected ? "transform scale-110 shadow-lg" : ""
      
      switch (card.card_type) {
        case "red":
          return cn(
            baseClasses,
            "bg-red-100 text-red-900 border-red-300",
            hoverEffect,
            selectEffect,
            isClickable ? "cursor-pointer" : "cursor-default"
          )
        case "blue":
          return cn(
            baseClasses,
            "bg-blue-100 text-blue-900 border-blue-300",
            hoverEffect,
            selectEffect,
            isClickable ? "cursor-pointer" : "cursor-default"
          )
        case "neutral":
          return cn(
            baseClasses,
            "bg-yellow-50 text-yellow-900 border-yellow-200",
            hoverEffect,
            selectEffect,
            isClickable ? "cursor-pointer" : "cursor-default"
          )
        case "assassin":
          return cn(
            baseClasses,
            "bg-gray-800 text-white border-gray-900",
            hoverEffect,
            selectEffect,
            isClickable ? "cursor-pointer" : "cursor-default"
          )
      }
    }

    // Operative view - all cards look the same
    const hoverEffect = isClickable && isHovered ? "transform scale-105 shadow-md bg-yellow-100" : ""
    const selectEffect = isSelected ? "transform scale-110 shadow-lg" : ""
    
    return cn(
      baseClasses,
      "bg-yellow-50 border-yellow-200",
      highContrast ? "text-black" : "text-gray-800",
      hoverEffect,
      selectEffect,
      isClickable ? "cursor-pointer" : "cursor-default"
    )
  }

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-4", className)}>
      {/* Board Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Spymaster View Toggle */}
          {!isSpymaster && onToggleSpymasterPreview && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleSpymasterPreview}
              className="gap-2"
            >
              {showSpymasterPreview ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {showSpymasterPreview ? "Hide Colors" : "Preview Colors"}
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
          {gameState.currentClue && (
            <Badge variant="outline" className="gap-2">
              <Target className="w-3 h-3" />
              "{gameState.currentClue.clue_word}" - {gameState.currentClue.clue_number}
              {gameState.guessesRemaining > 0 && (
                <span className="text-xs">({gameState.guessesRemaining} left)</span>
              )}
            </Badge>
          )}
        </div>
      </div>

      {/* Spymaster View Indicator */}
      {showColors && (
        <div className="text-center">
          <Badge variant="outline" className="gap-2 bg-yellow-100 border-yellow-300 text-yellow-800">
            <Eye className="w-3 h-3" />
            {isSpymaster ? "SPYMASTER VIEW" : "COLOR PREVIEW MODE"}
          </Badge>
        </div>
      )}

      {/* Game Board */}
      <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50">
        <CardContent className="p-0">
          <div className="grid grid-cols-5 gap-3">
            {wordCards.map((card) => (
              <div key={card.id} className="relative">
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
                    {(showTranslations && (card.revealed || showColors || hoveredCard === card.id)) && (
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
                            pronounceWord(card.german_word)
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

                    {/* Hint overlay for learning mode */}
                    {showHints && hoveredCard === card.id && !card.revealed && (
                      <motion.div
                        className="absolute inset-0 bg-black/80 rounded-lg flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="text-white text-xs text-center p-2">
                          <div className="font-medium">{card.english_translation}</div>
                          {showColors && (
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Board Instructions */}
      <div className="text-center text-sm text-muted-foreground space-y-1">
        {isSpymaster ? (
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

      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-red-600">
              {wordCards.filter(c => c.card_type === "red" && !c.revealed).length}
            </div>
            <div className="text-xs text-muted-foreground">Red cards left</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-blue-600">
              {wordCards.filter(c => c.card_type === "blue" && !c.revealed).length}
            </div>
            <div className="text-xs text-muted-foreground">Blue cards left</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-yellow-600">
              {wordCards.filter(c => c.card_type === "neutral" && !c.revealed).length}
            </div>
            <div className="text-xs text-muted-foreground">Neutral cards</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-gray-800">
              {wordCards.filter(c => c.card_type === "assassin" && !c.revealed).length}
            </div>
            <div className="text-xs text-muted-foreground">Assassin</div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Panel */}
      {hoveredCard && showTranslations && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Card className="bg-white/95 backdrop-blur-sm border shadow-lg">
              <CardContent className="p-4">
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
                          onClick={() => pronounceWord(card.german_word)}
                          className="gap-1"
                        >
                          <Volume2 className="w-3 h-3" />
                          Pronounce
                        </Button>
                      </div>
                      {showColors && !card.revealed && (
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
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}