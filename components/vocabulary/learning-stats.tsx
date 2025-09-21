"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Clock, TrendingUp, Star, BookOpen } from "lucide-react"
import { getDifficultyStats, getCategories } from "@/lib/german-vocabulary-comprehensive"

export function LearningStats() {
  // Get real vocabulary statistics
  const vocabStats = getDifficultyStats()
  const categories = getCategories()
  
  // Mock learning progress (in a real app, this would come from user data)
  const stats = {
    totalWords: vocabStats.total,
    learnedWords: Math.floor(vocabStats.total * 0.6), // 60% learned
    masteredWords: Math.floor(vocabStats.total * 0.3), // 30% mastered
    currentStreak: 7,
    longestStreak: 15,
    totalGamesPlayed: 23,
    averageScore: 78,
    favoriteWords: 12,
    weeklyGoal: 20,
    weeklyProgress: 14,
  }

  const difficultyStats = [
    { level: "A1", learned: Math.floor(vocabStats.A1 * 0.8), total: vocabStats.A1, color: "bg-green-500" },
    { level: "A2", learned: Math.floor(vocabStats.A2 * 0.6), total: vocabStats.A2, color: "bg-blue-500" },
    { level: "B1", learned: Math.floor(vocabStats.B1 * 0.4), total: vocabStats.B1, color: "bg-orange-500" },
    { level: "B2", learned: Math.floor(vocabStats.B2 * 0.2), total: vocabStats.B2, color: "bg-red-500" },
  ]

  // Generate category stats based on actual vocabulary
  const categoryStats = categories.slice(0, 8).map(category => {
    const total = Math.floor(Math.random() * 25) + 10 // Mock total
    const learned = Math.floor(total * (Math.random() * 0.8 + 0.2)) // Mock learned
    return { category, learned, total }
  })

  const recentAchievements = [
    { title: "Word Master", description: "Learned 50 words", icon: Trophy, date: "2 days ago" },
    { title: "Streak Champion", description: "7-day learning streak", icon: Target, date: "Today" },
    { title: "Category Expert", description: "Mastered Animals category", icon: Star, date: "1 week ago" },
  ]

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-german-gold mb-2">{stats.learnedWords}</div>
            <div className="text-sm text-muted-foreground">Words Learned</div>
            <div className="text-xs text-muted-foreground mt-1">of {stats.totalWords} total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-team-red mb-2">{stats.masteredWords}</div>
            <div className="text-sm text-muted-foreground">Words Mastered</div>
            <div className="text-xs text-muted-foreground mt-1">Perfect recall</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-team-blue mb-2">{stats.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
            <div className="text-xs text-muted-foreground mt-1">days in a row</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{stats.totalGamesPlayed}</div>
            <div className="text-sm text-muted-foreground">Games Played</div>
            <div className="text-xs text-muted-foreground mt-1">{stats.averageScore}% avg score</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Goal Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Weekly Goal
            </CardTitle>
            <CardDescription>Track your learning progress this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Words Learned This Week</span>
              <span className="text-sm text-muted-foreground">
                {stats.weeklyProgress} / {stats.weeklyGoal}
              </span>
            </div>
            <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} className="h-2" />
            <div className="text-xs text-muted-foreground">
              {stats.weeklyGoal - stats.weeklyProgress} more words to reach your goal!
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Recent Achievements
            </CardTitle>
            <CardDescription>Your latest learning milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-accent/50">
                  <div className="w-8 h-8 bg-german-gold rounded-lg flex items-center justify-center">
                    <achievement.icon className="w-4 h-4 text-german-gold-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{achievement.title}</div>
                    <div className="text-xs text-muted-foreground">{achievement.description}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{achievement.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Difficulty Level Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Progress by Difficulty
            </CardTitle>
            <CardDescription>Your learning progress across difficulty levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {difficultyStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{stat.level}</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round((stat.learned / stat.total) * 100)}%
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stat.learned} / {stat.total}
                  </span>
                </div>
                <Progress value={(stat.learned / stat.total) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Category Progress ({categories.length} total)
            </CardTitle>
            <CardDescription>Words learned by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{stat.category}</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round((stat.learned / stat.total) * 100)}%
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stat.learned} / {stat.total}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Streaks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Learning Activity
          </CardTitle>
          <CardDescription>Your learning consistency over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {Array.from({ length: 35 }, (_, i) => {
              const intensity = Math.random()
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-sm ${
                    intensity > 0.7
                      ? "bg-german-gold"
                      : intensity > 0.4
                        ? "bg-german-gold/60"
                        : intensity > 0.1
                          ? "bg-german-gold/30"
                          : "bg-muted"
                  }`}
                  title={`Day ${i + 1}`}
                />
              )
            })}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5 weeks ago</span>
            <span>Today</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm">
              <span className="font-medium">Current streak: </span>
              <span className="text-german-gold">{stats.currentStreak} days</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Longest streak: </span>
              <span className="text-team-red">{stats.longestStreak} days</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
