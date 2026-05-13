'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trophy, Users, Clock, ArrowRight } from 'lucide-react'
import { formatCurrency, formatCountdown } from '@/lib/utils'
import { mockTournaments } from '@/config/mock-data'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function TournamentPreviewSection() {
  const activeTournaments = mockTournaments.filter((t) => t.status === 'active').slice(0, 2)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-text-primary flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent-gold" />
          Active Tournaments
        </h2>
        <Link href="/tournaments">
          <Button variant="ghost" size="sm" className="text-accent-purple">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {activeTournaments.map((tournament, index) => (
          <motion.div
            key={tournament.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group relative overflow-hidden bg-bg-card border-white/5 p-5 hover:border-accent-purple/30 transition-all">
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge className="bg-accent-green/20 text-accent-green text-xs mb-2">
                      Live Now
                    </Badge>
                    <h3 className="font-heading font-bold text-lg text-text-primary">
                      {tournament.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-muted">Prize Pool</p>
                    <p className="text-lg font-bold text-accent-gold">
                      {formatCurrency(tournament.prizePool)}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-text-secondary mb-4 line-clamp-1">
                  {tournament.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {tournament.playerCount}/{tournament.maxPlayers}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatCountdown(tournament.endsAt)}
                    </span>
                  </div>

                  <Link href={`/tournaments/${tournament.id}`}>
                    <Button size="sm" className="gradient-primary">
                      Join
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}