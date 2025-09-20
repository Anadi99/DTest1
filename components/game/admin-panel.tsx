"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Upload, 
  Download, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  FileText, 
  Database,
  Settings,
  BarChart3
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { GermanWord } from "@/lib/german-vocabulary-comprehensive"

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [words, setWords] = useState<GermanWord[]>([])
  const [editingWord, setEditingWord] = useState<GermanWord | null>(null)
  const [newWord, setNewWord] = useState<Partial<GermanWord>>({
    german: "",
    english: "",
    difficulty: "A1",
    category: "",
    partOfSpeech: "",
    exampleDE: "",
    exampleEN: ""
  })
  const [importData, setImportData] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen) {
      loadWords()
    }
  }, [isOpen])

  const loadWords = async () => {
    try {
      // In a real implementation, this would load from Supabase
      // For now, we'll use the comprehensive vocabulary
      const { germanVocabulary } = await import("@/lib/german-vocabulary-comprehensive")
      setWords(germanVocabulary)
    } catch (error) {
      console.error("Error loading words:", error)
      toast({
        title: "Error",
        description: "Failed to load vocabulary words",
        variant: "destructive"
      })
    }
  }

  const saveWord = async (word: GermanWord) => {
    try {
      // In a real implementation, this would save to Supabase
      const updatedWords = editingWord 
        ? words.map(w => w.german === editingWord.german ? word : w)
        : [...words, word]
      
      setWords(updatedWords)
      setEditingWord(null)
      setNewWord({
        german: "",
        english: "",
        difficulty: "A1",
        category: "",
        partOfSpeech: "",
        exampleDE: "",
        exampleEN: ""
      })
      
      toast({
        title: "Success",
        description: editingWord ? "Word updated successfully" : "Word added successfully"
      })
    } catch (error) {
      console.error("Error saving word:", error)
      toast({
        title: "Error",
        description: "Failed to save word",
        variant: "destructive"
      })
    }
  }

  const deleteWord = async (word: GermanWord) => {
    try {
      setWords(prev => prev.filter(w => w.german !== word.german))
      toast({
        title: "Success",
        description: "Word deleted successfully"
      })
    } catch (error) {
      console.error("Error deleting word:", error)
      toast({
        title: "Error",
        description: "Failed to delete word",
        variant: "destructive"
      })
    }
  }

  const importWords = async () => {
    try {
      const imported = JSON.parse(importData) as GermanWord[]
      
      if (!Array.isArray(imported)) {
        throw new Error("Invalid format: expected array of words")
      }
      
      // Validate each word
      for (const word of imported) {
        if (!word.german || !word.english || !word.difficulty) {
          throw new Error("Invalid word format: missing required fields")
        }
      }
      
      setWords(prev => [...prev, ...imported])
      setImportData("")
      
      toast({
        title: "Success",
        description: `Imported ${imported.length} words successfully`
      })
    } catch (error) {
      console.error("Error importing words:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to import words",
        variant: "destructive"
      })
    }
  }

  const exportWords = () => {
    const dataStr = JSON.stringify(words, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `deutchnames-vocabulary-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    toast({
      title: "Success",
      description: "Vocabulary exported successfully"
    })
  }

  const filteredWords = words.filter(word => {
    const matchesSearch = searchTerm === "" || 
      word.german.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.english.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDifficulty = filterDifficulty === "all" || word.difficulty === filterDifficulty
    const matchesCategory = filterCategory === "all" || word.category === filterCategory
    
    return matchesSearch && matchesDifficulty && matchesCategory
  })

  const getStats = () => {
    const byDifficulty = {
      A1: words.filter(w => w.difficulty === "A1").length,
      A2: words.filter(w => w.difficulty === "A2").length,
      B1: words.filter(w => w.difficulty === "B1").length,
      B2: words.filter(w => w.difficulty === "B2").length,
    }
    
    const categories = [...new Set(words.map(w => w.category))].length
    
    return { total: words.length, byDifficulty, categories }
  }

  const stats = getStats()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Vocabulary Administration
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="browse" className="h-full">
            <div className="px-6 pb-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="browse">Browse ({stats.total})</TabsTrigger>
                <TabsTrigger value="add">Add Word</TabsTrigger>
                <TabsTrigger value="import">Import/Export</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
              </TabsList>
            </div>

            {/* Browse Words */}
            <TabsContent value="browse" className="px-6 pb-6">
              <div className="space-y-4">
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Search words..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Difficulties</SelectItem>
                      <SelectItem value="A1">A1 - Beginner</SelectItem>
                      <SelectItem value="A2">A2 - Elementary</SelectItem>
                      <SelectItem value="B1">B1 - Intermediate</SelectItem>
                      <SelectItem value="B2">B2 - Upper Intermediate</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {[...new Set(words.map(w => w.category))].sort().map(category => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Word List */}
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {filteredWords.map((word, index) => (
                      <div key={`${word.german}-${index}`} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{word.german}</span>
                            <span className="text-muted-foreground">→</span>
                            <span>{word.english}</span>
                            <Badge variant="outline" className="text-xs">{word.difficulty}</Badge>
                            <Badge variant="secondary" className="text-xs">{word.category}</Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <span className="italic">"{word.exampleDE}"</span>
                            <span className="mx-2">•</span>
                            <span>"{word.exampleEN}"</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingWord(word)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteWord(word)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* Add Word */}
            <TabsContent value="add" className="px-6 pb-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>German Word *</Label>
                    <Input
                      value={editingWord?.german || newWord.german || ""}
                      onChange={(e) => editingWord 
                        ? setEditingWord({...editingWord, german: e.target.value})
                        : setNewWord({...newWord, german: e.target.value})
                      }
                      placeholder="e.g., Haus"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>English Translation *</Label>
                    <Input
                      value={editingWord?.english || newWord.english || ""}
                      onChange={(e) => editingWord 
                        ? setEditingWord({...editingWord, english: e.target.value})
                        : setNewWord({...newWord, english: e.target.value})
                      }
                      placeholder="e.g., House"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Difficulty Level *</Label>
                    <Select 
                      value={editingWord?.difficulty || newWord.difficulty || "A1"} 
                      onValueChange={(value: any) => editingWord 
                        ? setEditingWord({...editingWord, difficulty: value})
                        : setNewWord({...newWord, difficulty: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A1">A1 - Beginner</SelectItem>
                        <SelectItem value="A2">A2 - Elementary</SelectItem>
                        <SelectItem value="B1">B1 - Intermediate</SelectItem>
                        <SelectItem value="B2">B2 - Upper Intermediate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Input
                      value={editingWord?.category || newWord.category || ""}
                      onChange={(e) => editingWord 
                        ? setEditingWord({...editingWord, category: e.target.value})
                        : setNewWord({...newWord, category: e.target.value})
                      }
                      placeholder="e.g., animals, food, transport"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>German Example Sentence</Label>
                    <Textarea
                      value={editingWord?.exampleDE || newWord.exampleDE || ""}
                      onChange={(e) => editingWord 
                        ? setEditingWord({...editingWord, exampleDE: e.target.value})
                        : setNewWord({...newWord, exampleDE: e.target.value})
                      }
                      placeholder="Das Haus ist groß."
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>English Example Sentence</Label>
                    <Textarea
                      value={editingWord?.exampleEN || newWord.exampleEN || ""}
                      onChange={(e) => editingWord 
                        ? setEditingWord({...editingWord, exampleEN: e.target.value})
                        : setNewWord({...newWord, exampleEN: e.target.value})
                      }
                      placeholder="The house is big."
                      rows={2}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => saveWord(editingWord || newWord as GermanWord)}
                    disabled={!((editingWord || newWord).german && (editingWord || newWord).english)}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingWord ? "Update Word" : "Add Word"}
                  </Button>
                  {editingWord && (
                    <Button variant="outline" onClick={() => setEditingWord(null)}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Import/Export */}
            <TabsContent value="import" className="px-6 pb-6">
              <div className="space-y-6">
                {/* Export */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export Vocabulary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Download the complete vocabulary database as JSON for backup or sharing.
                    </p>
                    <Button onClick={exportWords}>
                      <Download className="w-4 h-4 mr-2" />
                      Export All Words ({words.length})
                    </Button>
                  </CardContent>
                </Card>

                {/* Import */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Import Vocabulary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Import words from JSON format. Expected format:
                    </p>
                    <div className="bg-muted p-3 rounded-md text-xs font-mono">
                      {`[
  {
    "german": "Haus",
    "english": "House", 
    "difficulty": "A1",
    "category": "buildings",
    "partOfSpeech": "noun",
    "exampleDE": "Das Haus ist groß.",
    "exampleEN": "The house is big."
  }
]`}
                    </div>
                    <Textarea
                      value={importData}
                      onChange={(e) => setImportData(e.target.value)}
                      placeholder="Paste JSON data here..."
                      rows={8}
                    />
                    <Button 
                      onClick={importWords}
                      disabled={!importData.trim()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Import Words
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Statistics */}
            <TabsContent value="stats" className="px-6 pb-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">{stats.total}</div>
                      <div className="text-sm text-muted-foreground">Total Words</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{stats.byDifficulty.A1}</div>
                      <div className="text-sm text-muted-foreground">A1 Beginner</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{stats.byDifficulty.A2}</div>
                      <div className="text-sm text-muted-foreground">A2 Elementary</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">{stats.byDifficulty.B1}</div>
                      <div className="text-sm text-muted-foreground">B1 Intermediate</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Difficulty Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(stats.byDifficulty).map(([level, count]) => (
                        <div key={level} className="flex items-center justify-between">
                          <span className="font-medium">{level}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-muted rounded-full h-2">
                              <div 
                                className="h-2 bg-primary rounded-full transition-all"
                                style={{ width: `${(count / stats.total) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-12 text-right">
                              {count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Categories ({stats.categories})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {[...new Set(words.map(w => w.category))].sort().map(category => {
                        const count = words.filter(w => w.category === category).length
                        return (
                          <Badge key={category} variant="outline" className="justify-between">
                            <span>{category}</span>
                            <span>{count}</span>
                          </Badge>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}