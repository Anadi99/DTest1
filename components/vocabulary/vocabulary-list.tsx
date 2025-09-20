"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-enhanced"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button-enhanced"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Volume2, Heart, BookOpen, Trash2 } from "lucide-react"
import { gameStorage } from "@/lib/localStorage"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

interface VocabularyWord {
  id: string
  german: string
  english: string
  difficulty: "A1" | "A2" | "B1" | "B2"
  createdAt: string
}

interface VocabularyListProps {
  searchTerm: string
  selectedCategory: string
  selectedDifficulty: string
  refreshTrigger?: number
}

export function VocabularyList({
  searchTerm,
  selectedCategory,
  selectedDifficulty,
  refreshTrigger,
}: VocabularyListProps) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [vocabularyWords, setVocabularyWords] = useState<VocabularyWord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadVocabulary = () => {
      try {
        setIsLoading(true)

        // Initialize sample data if needed
        gameStorage.initializeSampleData()

        // Load words from localStorage
        const words = gameStorage.getWords()
        setVocabularyWords(words)

        // Load favorites from localStorage
        const savedFavorites = localStorage.getItem("vocabulary-favorites")
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites))
        }
      } catch (error) {
        console.error("Error loading vocabulary:", error)
        toast({
          title: "Error",
          description: "Failed to load vocabulary words.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadVocabulary()
  }, [refreshTrigger, toast])

  // Filter words based on search and filters
  const filteredWords = vocabularyWords.filter((word) => {
    const matchesSearch =
      searchTerm === "" ||
      word.german.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.english.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDifficulty = selectedDifficulty === "all" || word.difficulty === selectedDifficulty

    return matchesSearch && matchesDifficulty
  })

  const toggleFavorite = (wordId: string) => {
    const newFavorites = favorites.includes(wordId) ? favorites.filter((id) => id !== wordId) : [...favorites, wordId]

    setFavorites(newFavorites)
    localStorage.setItem("vocabulary-favorites", JSON.stringify(newFavorites))

    toast({
      title: favorites.includes(wordId) ? "Removed from favorites" : "Added to favorites",
      description: "Your favorites have been updated.",
    })
  }

  const deleteWord = (wordId: string) => {
    gameStorage.deleteWord(wordId)
    setVocabularyWords((prev) => prev.filter((word) => word.id !== wordId))

    toast({
      title: "Word Deleted",
      description: "The word has been removed from your collection.",
    })
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "A1":
        return "bg-green-500/20 text-green-400 border-green-300/30"
      case "A2":
        return "bg-blue-500/20 text-blue-400 border-blue-300/30"
      case "B1":
        return "bg-orange-500/20 text-orange-400 border-orange-300/30"
      case "B2":
        return "bg-red-500/20 text-red-400 border-red-300/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-slate-500/20 to-gray-500/20 border-slate-300/30">
        <CardHeader>
          <CardTitle className="text-white">Loading Vocabulary...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-white/70">Loading German vocabulary words...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-slate-500/20 to-gray-500/20 border-slate-300/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <span>Vocabulary Words ({filteredWords.length})</span>
          <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
            {filteredWords.length} words found
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {filteredWords.map((word, index) => (
              <motion.div
                key={word.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="p-4 bg-gradient-to-br from-white/5 to-white/10 border-white/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="text-xl font-bold text-purple-300">{word.german}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if ("speechSynthesis" in window) {
                              const utterance = new SpeechSynthesisUtterance(word.german)
                              utterance.lang = "de-DE"
                              speechSynthesis.speak(utterance)
                            }
                          }}
                          className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-lg text-white">{word.english}</div>
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(word.difficulty)}>{word.difficulty}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(word.id)}
                        className={`${favorites.includes(word.id) ? "text-red-400" : "text-white/70"} hover:text-white hover:bg-white/10`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(word.id) ? "fill-current" : ""}`} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                        <BookOpen className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteWord(word.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
            {filteredWords.length === 0 && (
              <div className="text-center py-8 text-white/70">
                No words found matching your criteria. Try adjusting your search or filters.
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
