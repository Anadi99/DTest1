"use client"

import { cn } from "@/lib/utils"

interface ColorblindPatternsProps {
  cardType: "red" | "blue" | "neutral" | "assassin"
  isRevealed: boolean
  className?: string
}

export function ColorblindPatterns({ cardType, isRevealed, className }: ColorblindPatternsProps) {
  if (!isRevealed) return null

  const getPattern = () => {
    switch (cardType) {
      case "red":
        return (
          <div className={cn("absolute inset-0 opacity-30", className)}>
            {/* Diagonal stripes pattern for red */}
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="red-stripes" patternUnits="userSpaceOnUse" width="8" height="8">
                  <path d="M0,8 L8,0" stroke="white" strokeWidth="2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#red-stripes)" />
            </svg>
            {/* Red team symbol */}
            <div className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
          </div>
        )
      
      case "blue":
        return (
          <div className={cn("absolute inset-0 opacity-30", className)}>
            {/* Dots pattern for blue */}
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="blue-dots" patternUnits="userSpaceOnUse" width="8" height="8">
                  <circle cx="4" cy="4" r="1.5" fill="white"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#blue-dots)" />
            </svg>
            {/* Blue team symbol */}
            <div className="absolute top-1 right-1 w-3 h-3 bg-white rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
            </div>
          </div>
        )
      
      case "neutral":
        return (
          <div className={cn("absolute inset-0 opacity-20", className)}>
            {/* Cross-hatch pattern for neutral */}
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="neutral-cross" patternUnits="userSpaceOnUse" width="6" height="6">
                  <path d="M0,3 L6,3 M3,0 L3,6" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#neutral-cross)" />
            </svg>
            {/* Neutral symbol */}
            <div className="absolute top-1 right-1 w-3 h-3 bg-white rounded flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-yellow-600 rounded"></div>
            </div>
          </div>
        )
      
      case "assassin":
        return (
          <div className={cn("absolute inset-0 opacity-40", className)}>
            {/* Solid fill with warning symbol for assassin */}
            <div className="absolute inset-0 bg-black/20"></div>
            {/* Assassin warning symbol */}
            <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded flex items-center justify-center">
              <span className="text-black text-xs font-bold">⚠</span>
            </div>
            {/* Skull symbol in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-lg opacity-60">💀</span>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return getPattern()
}

// Colorblind-safe color palette
export const colorblindSafeColors = {
  red: {
    background: "#D73027", // Red-orange that's distinguishable
    foreground: "#FFFFFF",
    pattern: "diagonal-stripes"
  },
  blue: {
    background: "#4575B4", // Blue that contrasts well with red
    foreground: "#FFFFFF", 
    pattern: "dots"
  },
  neutral: {
    background: "#FEE08B", // Yellow-beige for neutrals
    foreground: "#000000",
    pattern: "cross-hatch"
  },
  assassin: {
    background: "#2C2C2C", // Dark gray instead of pure black
    foreground: "#FFFFFF",
    pattern: "solid-with-warning"
  }
}

// High contrast color palette
export const highContrastColors = {
  red: {
    background: "#FF0000", // Pure red
    foreground: "#FFFFFF",
    border: "#000000"
  },
  blue: {
    background: "#0000FF", // Pure blue
    foreground: "#FFFFFF",
    border: "#000000"
  },
  neutral: {
    background: "#FFFF00", // Pure yellow
    foreground: "#000000",
    border: "#000000"
  },
  assassin: {
    background: "#000000", // Pure black
    foreground: "#FFFFFF",
    border: "#FFFFFF"
  }
}