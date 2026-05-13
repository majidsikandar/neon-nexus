'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Flame, Target, Trophy, CheckCircle2, Lock, Star } from 'lucide-react'
import { mockMissions, mockDailyStreak, mockRewards } from '@/config/mock-data'
import { useUserStore } from '@/store'
import { cn, formatTimeAgo } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

export default function RewardsPage() {
  const [claimedMissions, setClaimedMissions] = useState<string[]>([])
  const { user, addXP } = useUserStore()

  const dailyMissions = mockMissions.filter((m) => m.isDaily)
  const weeklyMissions = mockMissions.filter((m) => !m.isDaily)

  const handleClaimMission = (missionId: string, reward: number) => {
    setClaimedMissions([...claimedMissions, missionId])
    addXP(reward)
  }

  const { currentDay, totalDays, nextReward, canClaim } = mockDailyStreak

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">
            Rewards
          </h1>
          <p className="text-text-secondary">
            Complete missions and claim your rewards
          </p>
        </div>
      </div>

      {/* XP & Level Progress */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 border-white/10 p-6">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Current Level</p>
              <p className="text-2xl font-bold text-text-primary">
                Level {user?.level || 1}
              </p>
              <p className="text-sm text-text-muted">
                {user?.xp?.toLocaleString() || 0} XP
              </p>
            </div>
          </div>
          <div className="w-32">
            <Progress
              value={((user?.xp || 0) % 1000) / 10}
              className="h-3 bg-bg-surface"
            />
            <p className="text-xs text-text-muted mt-1 text-right">
              {1000 - ((user?.xp || 0) % 1000)} XP to Level {(user?.level || 1) + 1}
            </p>
          </div>
        </div>
      </Card>

      {/* Daily Streak */}
      <Card className="bg-bg-card border-white/5 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent-gold/20 flex items-center justify-center">
              <Flame className="w-6 h-6 text-accent-gold" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-text-primary">Daily Streak</h3>
              <p className="text-sm text-text-secondary">
                Day {currentDay} of {totalDays}
              </p>
            </div>
          </div>
          <Button
            className={canClaim ? 'gradient-primary' : 'bg-bg-elevated text-text-muted'}
            disabled={!canClaim}
          >
            <Gift className="w-4 h-4 mr-2" />
            {canClaim ? `Claim ${nextReward} XP` : 'Come back tomorrow'}
          </Button>
        </div>

        {/* Streak Progress */}
        <div className="flex items-center justify-between">
          {Array.from({ length: totalDays }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-bold',
                  index < currentDay
                    ? 'bg-accent-gold text-bg-base'
                    : index === currentDay
                    ? 'bg-accent-purple text-white border-4 border-accent-purple/30'
                    : 'bg-bg-surface text-text-muted'
                )}
              >
                {index < currentDay ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-[10px] text-text-muted mt-1">
                Day {index + 1}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Missions Tabs */}
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList className="bg-bg-card border-white/5 p-1">
          <TabsTrigger
            value="daily"
            className="data-[state=active]:gradient-primary data-[state=active]:text-white"
          >
            Daily Missions
          </TabsTrigger>
          <TabsTrigger
            value="weekly"
            className="data-[state=active]:gradient-primary data-[state=active]:text-white"
          >
            Weekly Missions
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:gradient-primary data-[state=active]:text-white"
          >
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          {dailyMissions.map((mission, index) => {
            const progress = (mission.progress / mission.target) * 100
            const isCompleted = mission.progress >= mission.target
            const isClaimed = claimedMissions.includes(mission.id)

            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-bg-card border-white/5 p-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      isCompleted ? 'bg-accent-green/20' : 'bg-bg-elevated'
                    )}>
                      <Target className={cn(
                        'w-6 h-6',
                        isCompleted ? 'text-accent-green' : 'text-text-muted'
                      )} />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary">{mission.title}</h4>
                      <p className="text-sm text-text-muted">{mission.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={progress} className="flex-1 h-2" />
                        <span className="text-xs text-text-muted">
                          {mission.progress}/{mission.target}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-accent-gold">+{mission.reward}</p>
                      <p className="text-xs text-text-muted">XP</p>
                      {isClaimed ? (
                        <Badge className="bg-accent-green/20 text-accent-green mt-2">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Claimed
                        </Badge>
                      ) : isCompleted ? (
                        <Button
                          size="sm"
                          className="gradient-primary mt-2"
                          onClick={() => handleClaimMission(mission.id, mission.reward)}
                        >
                          Claim
                        </Button>
                      ) : (
                        <Badge variant="outline" className="border-white/10 text-text-muted mt-2">
                          <Lock className="w-3 h-3 mr-1" />
                          Locked
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          {weeklyMissions.map((mission, index) => {
            const progress = (mission.progress / mission.target) * 100
            const isCompleted = mission.progress >= mission.target

            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-bg-card border-white/5 p-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      isCompleted ? 'bg-accent-gold/20' : 'bg-bg-elevated'
                    )}>
                      <Trophy className={cn(
                        'w-6 h-6',
                        isCompleted ? 'text-accent-gold' : 'text-text-muted'
                      )} />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary">{mission.title}</h4>
                      <p className="text-sm text-text-muted">{mission.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={progress} className="flex-1 h-2" />
                        <span className="text-xs text-text-muted">
                          {mission.progress}/{mission.target}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-accent-gold">+{mission.reward}</p>
                      <p className="text-xs text-text-muted">XP</p>
                      {isCompleted ? (
                        <Button size="sm" className="gradient-primary mt-2">
                          Claim
                        </Button>
                      ) : (
                        <Badge variant="outline" className="border-white/10 text-text-muted mt-2">
                          <Lock className="w-3 h-3 mr-1" />
                          {mission.target - mission.progress} to go
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {mockRewards.map((reward) => (
            <Card key={reward.id} className="bg-bg-card border-white/5 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-accent-purple" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{reward.description}</p>
                    <p className="text-sm text-text-muted">
                      {formatTimeAgo(reward.claimedAt)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-accent-green">+{reward.amount}</p>
                  <p className="text-xs text-text-muted">{reward.type}</p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}