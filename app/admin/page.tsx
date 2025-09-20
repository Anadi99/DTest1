"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Database, Settings, BarChart3, Shield } from "lucide-react"
import { AdminPanel } from "@/components/game/admin-panel"

export default function AdminPage() {
  const [showAdminPanel, setShowAdminPanel] = useState(false)

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
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">Admin Panel</span>
            </div>
          </div>
          <Badge variant="outline" className="gap-1">
            <Database className="w-3 h-3" />
            Vocabulary Management
          </Badge>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Deutchnames Administration</h1>
            <p className="text-lg text-muted-foreground">
              Manage vocabulary database and game settings
            </p>
          </div>

          {/* Admin Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowAdminPanel(true)}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  Vocabulary Database
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Add, edit, and manage German vocabulary words across all difficulty levels.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>A1 Words:</span>
                    <Badge variant="outline">150+</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>A2 Words:</span>
                    <Badge variant="outline">200+</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>B1 Words:</span>
                    <Badge variant="outline">250+</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>B2 Words:</span>
                    <Badge variant="outline">300+</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-green-600" />
                  Game Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure default game parameters and accessibility options.
                </p>
                <div className="space-y-2 text-sm">
                  <div>• Default timer settings</div>
                  <div>• Accessibility preferences</div>
                  <div>• Sound effect controls</div>
                  <div>• Color scheme options</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  View game statistics and learning progress data.
                </p>
                <div className="space-y-2 text-sm">
                  <div>• Games played statistics</div>
                  <div>• Popular vocabulary words</div>
                  <div>• Learning effectiveness</div>
                  <div>• User engagement metrics</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col gap-2"
                  onClick={() => setShowAdminPanel(true)}
                >
                  <Database className="w-6 h-6" />
                  <span className="text-sm">Manage Words</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Settings className="w-6 h-6" />
                  <span className="text-sm">Game Config</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <BarChart3 className="w-6 h-6" />
                  <span className="text-sm">View Stats</span>
                </Button>
                
                <Link href="/lobby">
                  <Button className="h-auto p-4 flex flex-col gap-2 w-full">
                    <Shield className="w-6 h-6" />
                    <span className="text-sm">Test Game</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">✓</div>
                  <div className="text-sm font-medium">Database</div>
                  <div className="text-xs text-muted-foreground">Connected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">✓</div>
                  <div className="text-sm font-medium">Real-time</div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">✓</div>
                  <div className="text-sm font-medium">Word Banks</div>
                  <div className="text-xs text-muted-foreground">Loaded</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Admin Panel Modal */}
      <AdminPanel 
        isOpen={showAdminPanel} 
        onClose={() => setShowAdminPanel(false)} 
      />
    </div>
  )
}