"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button-enhanced"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-enhanced"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { gameStorage } from "@/lib/localStorage"
import { useToast } from "@/hooks/use-toast"

interface AddWordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onWordAdded?: () => void
}

export function AddWordDialog({ open, onOpenChange, onWordAdded }: AddWordDialogProps) {
  const [formData, setFormData] = useState({
    germanWord: "",
    englishTranslation: "",
    category: "",
    difficultyLevel: "",
    pronunciation: "",
    exampleSentence: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const newWord = {
        id: Date.now().toString(),
        german: formData.germanWord,
        english: formData.englishTranslation,
        difficulty: formData.difficultyLevel as "A1" | "A2" | "B1" | "B2",
        createdAt: new Date().toISOString(),
      }

      gameStorage.saveWord(newWord)

      toast({
        title: "Word Added!",
        description: `"${formData.germanWord}" has been added to your vocabulary collection.`,
      })

      onOpenChange(false)
      onWordAdded?.()
      setFormData({
        germanWord: "",
        englishTranslation: "",
        category: "",
        difficultyLevel: "",
        pronunciation: "",
        exampleSentence: "",
      })
    } catch (error) {
      console.error("Error adding word:", error)
      toast({
        title: "Error",
        description: "Failed to add word. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-500/20 to-gray-500/20 border-slate-300/30">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Word</DialogTitle>
          <DialogDescription className="text-white/70">
            Contribute a new German word to your vocabulary collection
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="germanWord" className="text-white">
                German Word *
              </Label>
              <Input
                id="germanWord"
                placeholder="e.g., Haus"
                value={formData.germanWord}
                onChange={(e) => handleInputChange("germanWord", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="englishTranslation" className="text-white">
                English Translation *
              </Label>
              <Input
                id="englishTranslation"
                placeholder="e.g., House"
                value={formData.englishTranslation}
                onChange={(e) => handleInputChange("englishTranslation", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="animals">Animals</SelectItem>
                  <SelectItem value="food">Food & Drink</SelectItem>
                  <SelectItem value="home">Home & Family</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="places">Places</SelectItem>
                  <SelectItem value="objects">Objects</SelectItem>
                  <SelectItem value="abstract">Abstract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Difficulty Level *</Label>
              <Select
                value={formData.difficultyLevel}
                onValueChange={(value) => handleInputChange("difficultyLevel", value)}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A1">A1 (Beginner)</SelectItem>
                  <SelectItem value="A2">A2 (Elementary)</SelectItem>
                  <SelectItem value="B1">B1 (Intermediate)</SelectItem>
                  <SelectItem value="B2">B2 (Upper Intermediate)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                !formData.germanWord ||
                !formData.englishTranslation ||
                !formData.category ||
                !formData.difficultyLevel ||
                isSubmitting
              }
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
            >
              {isSubmitting ? "Adding..." : "Add Word"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
