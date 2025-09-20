import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, Users, Eye, MessageSquare, Target, Trophy, BookOpen } from "lucide-react"

export default function HowToPlayPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-german-gold rounded-lg flex items-center justify-center">
                <span className="text-german-gold-foreground font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold text-balance">Deutchnames</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/vocabulary">
              <Button variant="ghost">Vocabulary</Button>
            </Link>
            <Link href="/lobby">
              <Button>Create Game</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-german-gold text-german-gold-foreground">Game Rules</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            How to Play <span className="text-german-gold">Deutchnames</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Learn German vocabulary through strategic team gameplay based on the popular Codenames board game.
          </p>
        </div>

        {/* Game Overview */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-german-gold" />
              Game Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Deutchnames is a team-based word game where players work together to identify their team's German
              vocabulary cards on a 5×5 grid. One player from each team acts as the "Spymaster" who gives one-word clues
              to help their teammates find the correct cards while avoiding the opponent's cards and the dangerous
              "Assassin" card.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-team-red rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-team-red-foreground" />
                </div>
                <h3 className="font-semibold">2-8 Players</h3>
                <p className="text-sm text-muted-foreground">Split into two teams</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-team-blue rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-team-blue-foreground" />
                </div>
                <h3 className="font-semibold">25 Cards</h3>
                <p className="text-sm text-muted-foreground">German vocabulary words</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-german-gold rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-6 h-6 text-german-gold-foreground" />
                </div>
                <h3 className="font-semibold">First to Find All</h3>
                <p className="text-sm text-muted-foreground">Team cards wins</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Setup */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Game Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-bold">1</span>
                  </div>
                  Form Teams
                </h3>
                <p className="text-muted-foreground text-sm">
                  Players split into two teams: <span className="text-team-red font-medium">Red Team</span> and{" "}
                  <span className="text-team-blue font-medium">Blue Team</span>. Each team needs at least one Spymaster.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-bold">2</span>
                  </div>
                  Choose Difficulty
                </h3>
                <p className="text-muted-foreground text-sm">
                  Select vocabulary difficulty: <strong>Beginner</strong> (basic words), <strong>Intermediate</strong>{" "}
                  (common words), or <strong>Advanced</strong> (complex vocabulary).
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-bold">3</span>
                  </div>
                  Grid Generation
                </h3>
                <p className="text-muted-foreground text-sm">
                  25 German words are randomly placed on a 5×5 grid. Each word shows its English translation when
                  hovered.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-bold">4</span>
                  </div>
                  Card Assignment
                </h3>
                <p className="text-muted-foreground text-sm">
                  Cards are secretly assigned: 9 to one team, 8 to the other, 7 neutral cards, and 1 assassin card.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gameplay */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>How to Play</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Spymaster Turn */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5 text-german-gold" />
                Spymaster's Turn
              </h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  The Spymaster can see which cards belong to their team and must give clues to help teammates identify
                  them.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Giving Clues</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Give exactly one word + one number</li>
                      <li>• Example: "Tiere 2" (Animals 2)</li>
                      <li>• The number indicates how many cards relate to the clue</li>
                      <li>• Cannot use words that appear on the board</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Clue Strategy</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Think of connections between German words</li>
                      <li>• Consider categories, themes, or associations</li>
                      <li>• Avoid clues that might lead to opponent cards</li>
                      <li>• Be careful not to hint at the assassin card</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Operative Turn */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-team-blue" />
                Operative's Turn
              </h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Team members (Operatives) discuss the clue and make guesses about which cards their Spymaster is
                  indicating.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Making Guesses</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Discuss the clue with your team</li>
                      <li>• Consider German word meanings and connections</li>
                      <li>• You get (clue number + 1) guesses maximum</li>
                      <li>• You can stop guessing at any time</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Learning Opportunity</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Hover over cards to see English translations</li>
                      <li>• Discuss word meanings with teammates</li>
                      <li>• Learn from both correct and incorrect guesses</li>
                      <li>• Build vocabulary through context</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Types */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Card Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-team-red rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-team-red-foreground font-bold">Haus</span>
                </div>
                <h3 className="font-semibold text-team-red">Red Team Cards</h3>
                <p className="text-xs text-muted-foreground mt-1">9 cards (or 8 if blue goes first)</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-team-blue rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-team-blue-foreground font-bold">Auto</span>
                </div>
                <h3 className="font-semibold text-team-blue">Blue Team Cards</h3>
                <p className="text-xs text-muted-foreground mt-1">8 cards (or 9 if blue goes first)</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-muted-foreground font-bold">Baum</span>
                </div>
                <h3 className="font-semibold">Neutral Cards</h3>
                <p className="text-xs text-muted-foreground mt-1">7 cards - end your turn</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-destructive-foreground font-bold">💀</span>
                </div>
                <h3 className="font-semibold text-destructive">Assassin Card</h3>
                <p className="text-xs text-muted-foreground mt-1">1 card - instant loss!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Winning */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-german-gold" />
              How to Win
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-german-gold rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-german-gold-foreground" />
                </div>
                <h3 className="font-semibold text-german-gold">Victory</h3>
                <p className="text-sm text-muted-foreground">Find all your team's cards first</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-destructive-foreground text-xl">💀</span>
                </div>
                <h3 className="font-semibold text-destructive">Instant Loss</h3>
                <p className="text-sm text-muted-foreground">Touch the assassin card</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Learning Wins</h3>
                <p className="text-sm text-muted-foreground">Everyone learns German vocabulary!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Learning Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">For Spymasters</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Think about German word categories (animals, food, colors)</li>
                  <li>• Use compound word connections (German loves compound words!)</li>
                  <li>• Consider grammatical connections (der/die/das articles)</li>
                  <li>• Think about cultural associations Germans would make</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">For Operatives</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Discuss word meanings before guessing</li>
                  <li>• Use the translation tooltips to learn new words</li>
                  <li>• Think about word families and related concepts</li>
                  <li>• Don't be afraid to ask questions about German culture</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-6">Join a game and start improving your German vocabulary today!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lobby">
              <Button size="lg" className="bg-german-gold text-german-gold-foreground hover:bg-german-gold/90">
                Online Multiplayer
              </Button>
            </Link>
            <Link href="/hot-seat">
              <Button size="lg" variant="outline">
                Local Hot-Seat
              </Button>
            </Link>
            <Link href="/vocabulary">
              <Button size="lg" variant="outline">
                Browse Vocabulary
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
