'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, Trophy, Gamepad2, Star, Settings, Camera, Edit2 } from 'lucide-react'
import { useUserStore } from '@/store'
import { vipTiers } from '@/config/mock-data'
import { cn, formatCurrency } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ProfilePage() {
  const { user } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)
  const currentTier = vipTiers.find((t) => t.tier === user?.vipTier) || vipTiers[2]

  // Mock stats
  const stats = {
    gamesPlayed: 247,
    totalWins: 89,
    biggestWin: 12500,
    favoriteGame: 'Cyber Dreams',
    memberSince: 'Jan 2024',
  }

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">
          Profile
        </h1>
        <p className="text-text-secondary">
          Manage your account and view your stats
        </p>
      </div>

      {/* Profile Card */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-accent-purple/20 to-accent-cyan/10 border-white/10 p-6">
        <div className="absolute top-0 right-0 w-40 h-40 bg-accent-purple/20 rounded-full blur-3xl" />

        <div className="relative flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-28 h-28 border-4" style={{ borderColor: currentTier.color }}>
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="text-2xl bg-accent-purple/20 text-accent-purple">
                NP
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h2 className="font-heading text-2xl font-bold text-text-primary">
                {user?.username || 'Player'}
              </h2>
              <Badge
                className="text-sm px-3 py-1"
                style={{ background: `${currentTier.color}30`, color: currentTier.color }}
              >
                <Star className="w-3 h-3 mr-1" />
                {currentTier.name}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-text-muted mb-4">
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {user?.email}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined {stats.memberSince}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-green">
                  {formatCurrency(user?.balance || 0)}
                </p>
                <p className="text-xs text-text-muted">Balance</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-cyan">
                  {user?.level || 1}
                </p>
                <p className="text-xs text-text-muted">Level</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-gold">
                  {user?.xp?.toLocaleString() || 0}
                </p>
                <p className="text-xs text-text-muted">Total XP</p>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <Button
            variant="outline"
            className="border-white/20"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-bg-card border-white/5 p-4 text-center">
          <Gamepad2 className="w-6 h-6 text-accent-purple mx-auto mb-2" />
          <p className="text-2xl font-bold text-text-primary">{stats.gamesPlayed}</p>
          <p className="text-sm text-text-muted">Games Played</p>
        </Card>
        <Card className="bg-bg-card border-white/5 p-4 text-center">
          <Trophy className="w-6 h-6 text-accent-gold mx-auto mb-2" />
          <p className="text-2xl font-bold text-text-primary">{stats.totalWins}</p>
          <p className="text-sm text-text-muted">Total Wins</p>
        </Card>
        <Card className="bg-bg-card border-white/5 p-4 text-center">
          <Star className="w-6 h-6 text-accent-green mx-auto mb-2" />
          <p className="text-2xl font-bold text-text-primary">
            {formatCurrency(stats.biggestWin)}
          </p>
          <p className="text-sm text-text-muted">Biggest Win</p>
        </Card>
        <Card className="bg-bg-card border-white/5 p-4 text-center">
          <User className="w-6 h-6 text-accent-cyan mx-auto mb-2" />
          <p className="text-lg font-bold text-text-primary">{stats.favoriteGame}</p>
          <p className="text-sm text-text-muted">Favorite Game</p>
        </Card>
      </div>

      {/* Activity */}
      <Card className="bg-bg-card border-white/5 p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent-gold" />
          Recent Activity
        </h3>

        <div className="space-y-3">
          {[
            { action: 'Won', game: 'Cyber Dreams', amount: 2500, time: '2 hours ago' },
            { action: 'Played', game: 'Neon Blitz', amount: -50, time: '3 hours ago' },
            { action: 'Claimed', game: 'Daily Bonus', amount: 100, time: '5 hours ago' },
            { action: 'Won', game: 'Meteor Crash', amount: 1800, time: 'Yesterday' },
            { action: 'Leveled Up', game: '', amount: 0, time: '2 days ago' },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-xl bg-bg-elevated/50"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center',
                  activity.amount > 0 ? 'bg-accent-green/20' : activity.amount < 0 ? 'bg-accent-red/20' : 'bg-accent-purple/20'
                )}>
                  <Trophy className={cn(
                    'w-4 h-4',
                    activity.amount > 0 ? 'text-accent-green' : activity.amount < 0 ? 'text-accent-red' : 'text-accent-purple'
                  )} />
                </div>
                <div>
                  <p className="font-medium text-text-primary">
                    {activity.action} {activity.game && `on ${activity.game}`}
                  </p>
                  <p className="text-sm text-text-muted">{activity.time}</p>
                </div>
              </div>
              {activity.amount !== 0 && (
                <p className={cn(
                  'font-bold',
                  activity.amount > 0 ? 'text-accent-green' : 'text-text-primary'
                )}>
                  {activity.amount > 0 ? '+' : ''}{activity.amount !== 0 && formatCurrency(activity.amount)}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-14 border-white/10 justify-start">
          <Settings className="w-5 h-5 mr-3" />
          Account Settings
        </Button>
        <Button variant="outline" className="h-14 border-white/10 justify-start">
          <User className="w-5 h-5 mr-3" />
          Security
        </Button>
      </div>
    </div>
  )
}