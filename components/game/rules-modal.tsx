"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Users, Eye, Brain, AlertTriangle, Crown, Shield, CheckCircle2, XCircle } from "lucide-react"

interface RulesModalProps {
  trigger?: React.ReactNode
}

export function RulesModal({ trigger }: RulesModalProps) {
  const [open, setOpen] = useState(false)

  const defaultTrigger = (
    <Button variant="outline" className="gap-2">
      <BookOpen className="w-4 h-4" />
      Rules
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            Deutchnames Rules
          </DialogTitle>
          <DialogDescription>
            Learn German vocabulary through strategic Codenames-style gameplay
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="gameplay">Gameplay</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Game Overview
                </CardTitle>
                <CardDescription>
                  Deutchnames is a German vocabulary learning game based on Codenames
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Players
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      2-8 players divided into two teams: <strong className="text-red-600">Red</strong> and <strong className="text-blue-600">Blue</strong>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Objective
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Find all your team's words before the other team finds theirs
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Learning
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Practice German vocabulary from A1 to B2 CEFR levels through strategic gameplay
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      The Assassin
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Avoid the <strong>black assassin word</strong> - clicking it ends the game immediately!
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold">Card Distribution (25 Total)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm font-medium">9 Red</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="text-sm font-medium">8 Blue</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
                      <div className="w-4 h-4 bg-amber-400 rounded"></div>
                      <span className="text-sm font-medium">7 Neutral</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="w-4 h-4 bg-gray-800 rounded"></div>
                      <span className="text-sm font-medium">1 Assassin</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Red team always goes first (they have one extra word to balance the advantage)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roles Tab */}
          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Crown className="w-5 h-5" />
                    Spymaster
                  </CardTitle>
                  <CardDescription>The clue-giver who can see all card colors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h5 className="font-medium">Responsibilities:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Give one-word clues to help your team</li>
                      <li>• Can see which cards belong to which team</li>
                      <li>• Must give a number with each clue (1-9)</li>
                      <li>• Cannot talk to teammates except through clues</li>
                      <li>• Must avoid helping the other team or hitting the assassin</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium">Restrictions:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Only one word per clue (no hyphenated words)</li>
                      <li>• Cannot use words that appear on the board</li>
                      <li>• Cannot use gestures or facial expressions</li>
                      <li>• Cannot give clues in different languages</li>
                    </ul>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    <Eye className="w-3 h-3 mr-1" />
                    Can see all colors
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Shield className="w-5 h-5" />
                    Operative
                  </CardTitle>
                  <CardDescription>The word-guessers who work as a team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h5 className="font-medium">Responsibilities:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Discuss clues with teammates</li>
                      <li>• Make educated guesses about which words to click</li>
                      <li>• Can pass their turn if unsure</li>
                      <li>• Learn German vocabulary through context</li>
                      <li>• Collaborate to interpret spymaster's clues</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium">Strategy Tips:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Think about word connections and categories</li>
                      <li>• Consider German-English word relationships</li>
                      <li>• Discuss before making final decisions</li>
                      <li>• Stop guessing when you're unsure</li>
                    </ul>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    <Users className="w-3 h-3 mr-1" />
                    Can discuss freely
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gameplay Tab */}
          <TabsContent value="gameplay" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Turn Sequence</CardTitle>
                <CardDescription>How a typical turn plays out</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-medium">Spymaster Gives Clue</h5>
                      <p className="text-sm text-muted-foreground">
                        The spymaster says one word and a number (e.g., "Tiere 2" meaning "Animals 2")
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-medium">Operatives Discuss</h5>
                      <p className="text-sm text-muted-foreground">
                        Team members discuss possible word connections and plan their guesses
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-medium">Make Guesses</h5>
                      <p className="text-sm text-muted-foreground">
                        Operatives click on cards. They get [clue number + 1] total guesses
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-medium">Turn Resolution</h5>
                      <p className="text-sm text-muted-foreground">
                        Turn continues or ends based on what cards were revealed
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card Reveal Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Your Team's Word</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Continue guessing (or pass). Get one step closer to winning!
                    </p>
                    
                    <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium">Other Team's Word</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Turn ends immediately. You helped the other team!
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                      <div className="w-4 h-4 bg-amber-400 rounded-full"></div>
                      <span className="text-sm font-medium">Neutral Word</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Turn ends. These are safe but don't help anyone.
                    </p>
                    
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-gray-800" />
                      <span className="text-sm font-medium">Assassin Word</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-red-600">
                      Game over! The other team wins immediately.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Winning Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="font-medium text-green-600">Ways to Win:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Find all of your team's words first</li>
                      <li>• The other team hits the assassin</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-red-600">Ways to Lose:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Your team hits the assassin word</li>
                      <li>• The other team finds all their words first</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>German Clue Examples</CardTitle>
                <CardDescription>
                  See how German vocabulary works in Deutchnames
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-medium mb-2 text-blue-800">Example 1: "Tiere 2" (Animals 2)</h5>
                    <p className="text-sm text-muted-foreground mb-2">Board contains:</p>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      <div className="bg-white p-2 rounded text-xs text-center border-2 border-blue-300">Katze<br/><span className="text-gray-500">(Cat)</span></div>
                      <div className="bg-white p-2 rounded text-xs text-center">Haus<br/><span className="text-gray-500">(House)</span></div>
                      <div className="bg-white p-2 rounded text-xs text-center border-2 border-blue-300">Hund<br/><span className="text-gray-500">(Dog)</span></div>
                      <div className="bg-white p-2 rounded text-xs text-center">Auto<br/><span className="text-gray-500">(Car)</span></div>
                      <div className="bg-white p-2 rounded text-xs text-center">Baum<br/><span className="text-gray-500">(Tree)</span></div>
                    </div>
                    <p className="text-sm">
                      <strong>Good guess:</strong> "Katze" and "Hund" are both animals (Tiere)
                    </p>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg">
                    <h5 className="font-medium mb-2 text-red-800">Example 2: "Getränke 2" (Drinks 2)</h5>
                    <p className="text-sm text-muted-foreground mb-2">Board contains:</p>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      <div className="bg-white p-2 rounded text-xs text-center border-2 border-red-300">Kaffee<br/><span className="text-gray-500">(Coffee)</span></div>
                      <div className="bg-white p-2 rounded text-xs text-center">Stuhl<br/><span className="text-gray-500">(Chair)</span></div>
                      <div className="bg-white p-2 rounded text-xs text-center border-2 border-red-300">Wasser<br/><span className="text-gray-500">(Water)</span></div>
                      <div className="bg-white p-2 rounded text-xs text-center">Buch<br/><span className="text-gray-500">(Book)</span></div>
                      <div className="bg-white p-2 rounded text-xs text-center">Blume<br/><span className="text-gray-500">(Flower)</span></div>
                    </div>
                    <p className="text-sm">
                      <strong>Strategy:</strong> Both "Kaffee" and "Wasser" are drinks (Getränke)
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg">
                    <h5 className="font-medium mb-2 text-amber-800">Example 3: Tricky Connections</h5>
                    <p className="text-sm text-muted-foreground mb-2">Advanced clue: "Weiß 2" (White 2)</p>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      <div className="bg-white p-2 rounded text-xs text-center border-2 border-amber-400">Schnee<br/><span className="text-gray-500">(Snow)</span></div>
                      <div className="bg-white p-2 rounded text-xs text-center">Stadt<br/><span className="text-gray-500">(City)</span></div>
                      <div className="bg-white p-2 rounded text-xs text-center border-2 border-amber-400">Milch<br/><span className="text-gray-500">(Milk)</span></div>
                      <div className="bg-white p-2 rounded text-xs text-center">Musik<br/><span className="text-gray-500">(Music)</span></div>
                      <div className="bg-white p-2 rounded text-xs text-center">Geld<br/><span className="text-gray-500">(Money)</span></div>
                    </div>
                    <p className="text-sm">
                      <strong>Creative thinking:</strong> Snow and milk are both white (weiß)
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h5 className="font-medium">Invalid Clue Examples:</h5>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-red-50 rounded flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>"Katze-Hund 2"</strong> - No compound words or hyphens allowed
                      </div>
                    </div>
                    <div className="p-2 bg-red-50 rounded flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>"Haus 2"</strong> - Can't use words that appear on the board
                      </div>
                    </div>
                    <div className="p-2 bg-red-50 rounded flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>"Animals 2"</strong> - Must give clues in German
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Tips</CardTitle>
                <CardDescription>
                  Get the most out of your German vocabulary practice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="font-medium">For Spymasters:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Think about German word families and categories</li>
                      <li>• Use compound word knowledge (German loves compounds!)</li>
                      <li>• Consider gender patterns (der, die, das)</li>
                      <li>• Think about word origins and cognates</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium">For Operatives:</h5>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Discuss German-English connections</li>
                      <li>• Think about cultural context</li>
                      <li>• Use word association techniques</li>
                      <li>• Learn from missed connections</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4">
          <Button onClick={() => setOpen(false)}>
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
