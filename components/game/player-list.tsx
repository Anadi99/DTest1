"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StarIcon, PersonIcon } from "@radix-ui/react-icons"
import type { GamePlayer } from "@/lib/types"

interface PlayerListProps {
  players: GamePlayer[]
}

export function PlayerList({ players }: PlayerListProps) {
  const redTeam = players.filter((p) => p.team === "red")
  const blueTeam = players.filter((p) => p.team === "blue")

  const PlayerCard = ({ player }: { player: GamePlayer }) => (
    <div className="flex items-center gap-3 p-2 rounded-lg">
      <div className="relative">
        <Avatar className="w-8 h-8">
          <AvatarFallback className={player.team === "red" ? "bg-team-red/20" : "bg-team-blue/20"}>
            {player.player_id[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background bg-green-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm truncate">{player.player_id}</span>
          {player.role === "spymaster" && <StarIcon className="w-3 h-3 text-german-gold" />}
        </div>
        <div className="text-xs text-muted-foreground">{player.role === "spymaster" ? "Spymaster" : "Operative"}</div>
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <PersonIcon className="w-5 h-5" />
          Players ({players.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Red Team */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-team-red rounded"></div>
            <span className="font-medium text-sm">Red Team ({redTeam.length})</span>
          </div>
          <div className="space-y-1">
            {redTeam.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>

        {/* Blue Team */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-team-blue rounded"></div>
            <span className="font-medium text-sm">Blue Team ({blueTeam.length})</span>
          </div>
          <div className="space-y-1">
            {blueTeam.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
