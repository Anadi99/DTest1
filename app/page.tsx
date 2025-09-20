"use client"

import { Button } from "@/components/ui/button-enhanced"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card-enhanced"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Users, Brain, Globe, Trophy, BookOpen, Gamepad2 } from "lucide-react"
import { motion } from "framer-motion"
import WelcomeMessage from "@/components/welcome-message"
import CallToAction from "@/components/call-to-action"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-white">Deutchnames</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/vocabulary">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <BookOpen className="w-4 h-4 mr-2" />
                Vocabulary
              </Button>
            </Link>
            <Link href="/lobby">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Play Game
              </Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-6 bg-gradient-to-r from-red-500/20 to-blue-500/20 border-red-300/30 text-red-300">
              Master German Vocabulary • A1 to B2 Levels
            </Badge>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-white bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Deutchnames
          </motion.h1>

          <WelcomeMessage />
          <CallToAction />

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Link href="/lobby">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                <Gamepad2 className="w-5 h-5 mr-2" />
                Start Playing
              </Button>
            </Link>
            <Link href="/vocabulary">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Words
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="text-center bg-gradient-to-br from-red-500/20 to-red-700/20 border-red-300/30">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-red-300">500+</CardTitle>
              <CardDescription className="text-red-200">German words in our collection</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center bg-gradient-to-br from-blue-500/20 to-blue-700/20 border-blue-300/30">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-blue-300">2-8</CardTitle>
              <CardDescription className="text-blue-200">Players per game session</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-500/20 to-green-700/20 border-green-300/30">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-green-300">4</CardTitle>
              <CardDescription className="text-green-200">Difficulty levels available</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center bg-gradient-to-br from-purple-500/20 to-purple-700/20 border-purple-300/30">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-purple-300">∞</CardTitle>
              <CardDescription className="text-purple-200">Learning possibilities</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold mb-6 text-white">Make German learning seamless.</h2>
            <p className="text-lg text-white/70 mb-8">
              Interactive tools for language learners to practice vocabulary and improve comprehension through strategic
              team gameplay and personalized word collections.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500/20 to-red-700/20 border border-red-300/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-red-300" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-white">Team Collaboration</h3>
                  <p className="text-white/70">
                    Work together as spymasters and operatives to decode German vocabulary clues.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-blue-700/20 border border-blue-300/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-white">Adaptive Learning</h3>
                  <p className="text-white/70">Choose from A1, A2, B1, and B2 vocabulary levels to match your skill.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-green-700/20 border border-green-300/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-green-300" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-white">Personal Collection</h3>
                  <p className="text-white/70">
                    Build your own vocabulary collection and track your learning progress.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-purple-700/20 border border-purple-300/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-white">Interactive Games</h3>
                  <p className="text-white/70">Engage with vocabulary through Codenames-style strategic gameplay.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-br from-slate-500/20 to-gray-500/20 border-slate-300/30">
              <div className="grid grid-cols-5 gap-3 mb-6">
                {[
                  { word: "Haus", type: "red" },
                  { word: "Auto", type: "blue" },
                  { word: "Katze", type: "neutral" },
                  { word: "Hund", type: "red" },
                  { word: "Baum", type: "neutral" },
                  { word: "Wasser", type: "blue" },
                  { word: "Brot", type: "neutral" },
                  { word: "Milch", type: "red" },
                  { word: "Schule", type: "blue" },
                  { word: "Buch", type: "assassin" },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium ${
                      card.type === "red"
                        ? "bg-gradient-to-br from-red-500/30 to-red-700/30 border border-red-300/30 text-red-200"
                        : card.type === "blue"
                          ? "bg-gradient-to-br from-blue-500/30 to-blue-700/30 border border-blue-300/30 text-blue-200"
                          : card.type === "assassin"
                            ? "bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-600/30 text-gray-300"
                            : "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-300/30 text-amber-200"
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {card.word}
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-sm text-white/60 mb-2">Current Clue</p>
                <p className="text-lg font-semibold text-purple-300">"Tiere" - 2 words</p>
                <p className="text-xs text-white/50 mt-1">(Animals - 2 words)</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-300/30">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to start your German learning journey?</h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Join learners who are mastering German vocabulary through strategic gameplay and interactive learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/lobby">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    <Gamepad2 className="w-5 h-5 mr-2" />
                    Create Game
                  </Button>
                </Link>
                <Link href="/vocabulary">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Browse Vocabulary
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-blue-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-semibold text-white">Deutchnames</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-white/60">
              <span>© 2024 Deutchnames. Master German through strategic gameplay.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
