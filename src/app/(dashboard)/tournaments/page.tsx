'use client'

import { motion } from 'framer-motion'
import { Trophy, Users, Clock, Gift } from 'lucide-react'
import { mockTournaments } from '@/config/mock-data'
import { formatCurrency, formatCountdown } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TournamentsPage() {
  const activeTournaments = mockTournaments.filter((t) => t.status === 'active')
  const upcomingTournaments = mockTournaments.filter((t) => t.status === 'upcoming')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-accent-green/20 text-accent-green">Live Now</Badge>
      case 'upcoming':
        return <Badge className="bg-accent-cyan/20 text-accent-cyan">Upcoming</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-text-primary mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-accent-gold" />
            Tournaments
          </h1>
          <p className="text-text-secondary">
            Compete for massive prize pools
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-bg-card border-white/5 p-4 text-center">
          <p className="text-sm text-text-muted mb-1">Active</p>
          <p className="text-2xl font-bold text-accent-green">
            {activeTournaments.length}
          </p>
        </Card>
        <Card className="bg-bg-card border-white/5 p-4 text-center">
          <p className="text-sm text-text-muted mb-1">Total Prizes</p>
          <p className="text-2xl font-bold text-accent-gold">
            {formatCurrency(mockTournaments.reduce((acc, t) => acc + t.prizePool, 0))}
          </p>
        </Card>
        <Card className="bg-bg-card border-white/5 p-4 text-center">
          <p className="text-sm text-text-muted mb-1">Total Players</p>
          <p className="text-2xl font-bold text-accent-cyan">
            {mockTournaments.reduce((acc, t) => acc + t.playerCount, 0).toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Tournament Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="bg-bg-card border-white/5 p-1">
          <TabsTrigger
            value="active"
            className="data-[state=active]:gradient-primary data-[state=active]:text-white"
          >
            Active ({activeTournaments.length})
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:gradient-primary data-[state=active]:text-white"
          >
            Upcoming ({upcomingTournaments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeTournaments.map((tournament, index) => (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden bg-bg-card border-white/5 p-6 hover:border-accent-purple/30 transition-all">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusBadge(tournament.status)}
                        {tournament.gameCategory && (
                          <Badge variant="outline" className="border-white/10 text-text-muted capitalize">
                            {tournament.gameCategory}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-heading font-bold text-xl text-text-primary mb-1">
                        {tournament.name}
                      </h3>
                      <p className="text-text-secondary">{tournament.description}</p>
                    </div>

                    <div className="text-center lg:text-right">
                      <p className="text-sm text-text-muted">Prize Pool</p>
                      <p className="text-3xl font-bold text-accent-gold">
                        {formatCurrency(tournament.prizePool)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-6 text-sm text-text-muted">
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {tournament.playerCount.toLocaleString()} / {tournament.maxPlayers.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent-cyan" />
                        Ends in {formatCountdown(tournament.endsAt)}
                      </span>
                    </div>

                    <Button className="gradient-primary">
                      <Gift className="w-4 h-4 mr-2" />
                      {tournament.entryFee === 0 ? 'Free Entry' : `Entry ${formatCurrency(tournament.entryFee)}`}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingTournaments.map((tournament, index) => (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-bg-card border-white/5 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusBadge(tournament.status)}
                      {tournament.gameCategory && (
                        <Badge variant="outline" className="border-white/10 text-text-muted capitalize">
                          {tournament.gameCategory}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-xl text-text-primary mb-1">
                      {tournament.name}
                    </h3>
                    <p className="text-text-secondary">{tournament.description}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-text-muted">Prize Pool</p>
                      <p className="text-2xl font-bold text-accent-gold">
                        {formatCurrency(tournament.prizePool)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-text-muted">Starts</p>
                      <p className="text-lg font-bold text-text-primary">
                        {formatCountdown(tournament.startsAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}