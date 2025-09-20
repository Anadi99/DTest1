"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { HelpCircle, Keyboard, Users, Target, BookOpen } from "lucide-react"

interface HelpDialogProps {
  trigger?: React.ReactNode
}

export function HelpDialog({ trigger }: HelpDialogProps) {
  const [open, setOpen] = useState(false)

  const defaultTrigger = (
    <Button variant="ghost" size="sm" aria-label="Help and game rules">
      <HelpCircle className="w-4 h-4" />
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>How to Play Deutchnames</DialogTitle>
          <DialogDescription>Learn German vocabulary through strategic word association gameplay</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Game Overview */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Game Overview</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Deutchnames is based on the popular game Codenames, but with German vocabulary to help you learn. Two
              teams compete to identify their words on a 5×5 grid using one-word clues from their Spymaster.
            </p>
          </section>

          <Separator />

          {/* Teams and Roles */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Teams & Roles</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Red Team</Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Blue Team</Badge>
                <span className="text-sm text-muted-foreground">Two competing teams</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium">Spymaster</h4>
                  <p className="text-muted-foreground">Gives one-word clues to help teammates identify words</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Field Operatives</h4>
                  <p className="text-muted-foreground">Guess words based on the Spymaster's clues</p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* How to Play */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">How to Play</h3>
            </div>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                  1
                </span>
                <div>
                  <strong>Spymaster gives a clue:</strong> One word + number (e.g., "Animal 2" for words like "Hund" and
                  "Katze")
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                  2
                </span>
                <div>
                  <strong>Team discusses:</strong> Field operatives discuss which German words might relate to the clue
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                  3
                </span>
                <div>
                  <strong>Make guesses:</strong> Click on cards to reveal them. You can guess up to (clue number + 1)
                  times
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                  4
                </span>
                <div>
                  <strong>Win condition:</strong> First team to reveal all their words wins!
                </div>
              </li>
            </ol>
          </section>

          <Separator />

          {/* Card Types */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Card Types</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Red team words</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Blue team words</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-600 rounded"></div>
                <span>Neutral words</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-800 rounded"></div>
                <span>Assassin (game over!)</span>
              </div>
            </div>
          </section>

          <Separator />

          {/* Keyboard Shortcuts */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Keyboard className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span>Help</span>
                <Badge variant="outline" className="text-xs">
                  ?
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Exit game</span>
                <Badge variant="outline" className="text-xs">
                  Esc
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Toggle hints</span>
                <Badge variant="outline" className="text-xs">
                  H
                </Badge>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
