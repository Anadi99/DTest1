"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button-enhanced"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card-enhanced"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-enhanced"
import Link from "next/link"
import { ArrowLeft, Search, Plus, BookOpen, Brain, Trophy, Volume2, Gamepad2 } from "lucide-react"
import { VocabularyList } from "@/components/vocabulary/vocabulary-list"
import { LearningStats } from "@/components/vocabulary/learning-stats"
import { AddWordDialog } from "@/components/vocabulary/add-word-dialog"
import { getCategories } from "@/lib/german-vocabulary-comprehensive"
import { motion } from "framer-motion"

export default function VocabularyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const categories = getCategories()

  const handleWordAdded = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Vocabulary Bank</span>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              onClick={() => setShowAddDialog(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Word
            </Button>
            <Link href="/lobby">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Create Game
              </Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4 text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              German Vocabulary Bank
            </h1>
            <p className="text-lg text-white/70">Explore, learn, and master German words for your vocabulary games</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="browse" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-white/10 border-white/20">
                <TabsTrigger
                  value="browse"
                  className="flex items-center gap-2 text-white data-[state=active]:bg-white/20"
                >
                  <Search className="w-4 h-4" />
                  Browse Words
                </TabsTrigger>
                <TabsTrigger
                  value="learn"
                  className="flex items-center gap-2 text-white data-[state=active]:bg-white/20"
                >
                  <Brain className="w-4 h-4" />
                  Learning Mode
                </TabsTrigger>
                <TabsTrigger
                  value="stats"
                  className="flex items-center gap-2 text-white data-[state=active]:bg-white/20"
                >
                  <Trophy className="w-4 h-4" />
                  Your Progress
                </TabsTrigger>
              </TabsList>

              {/* Browse Words Tab */}
              <TabsContent value="browse" className="space-y-6">
                {/* Filters */}
                <Card className="bg-gradient-to-br from-slate-500/20 to-gray-500/20 border-slate-300/30">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Search & Filter</CardTitle>
                    <CardDescription className="text-white/70">
                      Find specific German words or browse by difficulty
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="search" className="text-white">
                          Search Words
                        </Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                          <Input
                            id="search"
                            placeholder="Search German or English..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Difficulty</Label>
                        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            <SelectItem value="A1">A1 (Beginner)</SelectItem>
                            <SelectItem value="A2">A2 (Elementary)</SelectItem>
                            <SelectItem value="B1">B1 (Intermediate)</SelectItem>
                            <SelectItem value="B2">B2 (Upper Intermediate)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Vocabulary List */}
                <VocabularyList
                  searchTerm={searchTerm}
                  selectedCategory={selectedCategory}
                  selectedDifficulty={selectedDifficulty}
                  refreshTrigger={refreshTrigger}
                />
              </TabsContent>

              {/* Learning Mode Tab */}
              <TabsContent value="learn" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Flashcard Mode */}
                  <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-300/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Brain className="w-5 h-5" />
                        Flashcard Practice
                      </CardTitle>
                      <CardDescription className="text-green-200">
                        Practice German vocabulary with interactive flashcards
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center p-8 border-2 border-dashed border-green-300/30 rounded-lg bg-white/5">
                        <div className="text-3xl font-bold text-green-300 mb-2">Haus</div>
                        <div className="text-sm text-green-200 mb-4">Click to reveal translation</div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          <Volume2 className="w-4 h-4 mr-2" />
                          Pronounce
                        </Button>
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                          Previous
                        </Button>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                            1 / 25
                          </Badge>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">Next</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quiz Mode */}
                  <Card className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-blue-300/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Trophy className="w-5 h-5" />
                        Quick Quiz
                      </CardTitle>
                      <CardDescription className="text-blue-200">
                        Test your knowledge with multiple choice questions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="text-lg font-semibold text-white">What does "Katze" mean in English?</div>
                        <div className="space-y-2">
                          {["Cat", "Dog", "Bird", "Fish"].map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              {String.fromCharCode(65 + index)}. {option}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-blue-200">Question 3 of 10</div>
                        <div className="text-sm text-blue-200">Score: 2/2</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Word Association Game */}
                  <Card className="lg:col-span-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-300/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <BookOpen className="w-5 h-5" />
                        Word Association Challenge
                      </CardTitle>
                      <CardDescription className="text-purple-200">
                        Connect German words with their categories - great practice for Codenames!
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-center text-white">Animals</div>
                          <div className="min-h-24 border-2 border-dashed border-red-300/30 rounded-lg p-2 space-y-1 bg-red-500/10">
                            <Badge variant="outline" className="text-xs bg-white/10 border-white/20 text-white">
                              Katze
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-white/10 border-white/20 text-white">
                              Hund
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-center text-white">Food</div>
                          <div className="min-h-24 border-2 border-dashed border-blue-300/30 rounded-lg p-2 space-y-1 bg-blue-500/10">
                            <Badge variant="outline" className="text-xs bg-white/10 border-white/20 text-white">
                              Brot
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-center text-white">Home</div>
                          <div className="min-h-24 border-2 border-dashed border-yellow-300/30 rounded-lg p-2 space-y-1 bg-yellow-500/10">
                            <Badge variant="outline" className="text-xs bg-white/10 border-white/20 text-white">
                              Haus
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-center text-white">Available Words</div>
                          <div className="min-h-24 border-2 border-dashed border-white/30 rounded-lg p-2 space-y-1 bg-white/5">
                            <Badge className="text-xs cursor-pointer bg-purple-600 hover:bg-purple-700 text-white">
                              Milch
                            </Badge>
                            <Badge className="text-xs cursor-pointer bg-purple-600 hover:bg-purple-700 text-white">
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Learning Stats Tab */}
              <TabsContent value="stats">
                <LearningStats />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      {/* Add Word Dialog */}
      <AddWordDialog open={showAddDialog} onOpenChange={setShowAddDialog} onWordAdded={handleWordAdded} />
    </div>
  )
}
