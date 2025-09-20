"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { GameState } from "@/lib/game-logic"
import { CardFlipAnimation } from "./card-flip-animation"

interface GameBoardProps {
  showSpymasterView?: boolean
  onCardClick?: (cardId: string) => void
  gameState?: GameState
  canInteract?: boolean
  playerRole?: "operative" | "spymaster"
}

export function GameBoard({
  showSpymasterView = false,
  onCardClick,
  gameState,
  canInteract = false,
  playerRole = "operative",
}: GameBoardProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Use word cards from game state, fallback to empty array
  const wordCards = gameState?.wordCards || []

  const handleCardClick = (cardId: string) => {
    const card = wordCards.find((c) => c.id === cardId)
    if (!card || card.revealed || !canInteract) return

    if (onCardClick) {
      onCardClick(cardId)
    }
  }

  const getCardStyle = (card: any) => {
    const isRevealed = card.revealed
    const isClickable = canInteract && !isRevealed
    const isHovered = hoveredCard === card.id
    
    // Base card styling - matches real Codenames proportions
    const baseClasses = "relative w-full h-24 rounded-md flex items-center justify-center text-center font-semibold text-base transition-all duration-300 border-2 select-none"
    
    if (isRevealed) {
      // Revealed cards show actual team colors with white text
      switch (card.card_type) {
        case "red":
          return cn(baseClasses, "bg-red-600 text-white border-red-700 shadow-lg transform scale-95")
        case "blue":
          return cn(baseClasses, "bg-blue-600 text-white border-blue-700 shadow-lg transform scale-95")
        case "neutral":
          return cn(baseClasses, "bg-yellow-600 text-white border-yellow-700 shadow-lg transform scale-95")
        case "assassin":
          return cn(baseClasses, "bg-black text-white border-gray-900 shadow-lg transform scale-95")
      }
    }

    // Spymaster view - shows subtle color hints while maintaining card appearance
    if (playerRole === "spymaster" || showSpymasterView) {
      const hoverEffect = isClickable && isHovered ? "transform scale-105 shadow-lg" : ""
      const cursor = isClickable ? "cursor-pointer" : "cursor-default"
      
      switch (card.card_type) {
        case "red":
          return cn(baseClasses, "bg-red-100 text-red-900 border-red-300", hoverEffect, cursor)
        case "blue":
          return cn(baseClasses, "bg-blue-100 text-blue-900 border-blue-300", hoverEffect, cursor)
        case "neutral":
          return cn(baseClasses, "bg-yellow-50 text-yellow-900 border-yellow-200", hoverEffect, cursor)
        case "assassin":
          return cn(baseClasses, "bg-gray-900 text-white border-black", hoverEffect, cursor)
      }
    }

    // Operative view - all unrevealed cards look identical (classic Codenames tan/beige)
    const hoverEffect = isClickable && isHovered ? "transform scale-105 shadow-lg bg-yellow-100" : ""
    const cursor = isClickable ? "cursor-pointer" : "cursor-default"
    
    return cn(
      baseClasses,
      "bg-yellow-50 text-gray-800 border-yellow-200", // Classic Codenames card color
      hoverEffect,
      cursor
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Spymaster indicator */}
      {(playerRole === "spymaster" || showSpymasterView) && (
        <div className="mb-4 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-yellow-800">SPYMASTER VIEW</span>
          </div>
        </div>
      )}

      {/* Classic Codenames 5x5 Grid */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
        <div className="grid grid-cols-5 gap-3">
          {wordCards.map((card) => (
            <CardFlipAnimation
              key={card.id}
              isRevealed={card.revealed}
              cardType={card.card_type}
              className="cursor-pointer"
              onFlipComplete={() => {
                // Optional: Add sound effects or additional animations here
                console.log(`Card ${card.german_word} revealed as ${card.card_type}!`)
              }}
            >
              <div
                className={getCardStyle(card)}
                onClick={() => handleCardClick(card.id)}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* German word - prominent */}
                <div className="font-bold text-sm uppercase tracking-wide">
                  {card.german_word}
                </div>
                
                {/* English translation - smaller, only shown on hover for operatives or always for revealed cards */}
                {(card.revealed || playerRole === "spymaster" || showSpymasterView || hoveredCard === card.id) && (
                  <div className="text-xs opacity-75 mt-1 italic">
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
