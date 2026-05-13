'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Gift, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockDailyStreak } from '@/config/mock-data'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function DailyRewardWidget() {
  const [claimed, setClaimed] = useState(false)
  const { currentDay, totalDays, nextReward, canClaim } = mockDailyStreak

  const handleClaim = () => {
    setClaimed(true)
  }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-bg-card to-bg-elevated border-white/5 p-6">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/10 rounded-full blur-3xl" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Flame Icon with Animation */}
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-gold/30 to-accent-red/30 flex items-center justify-center"
            >
              <Flame className="w-7 h-7 text-accent-gold" />
            </motion.div>
            {claimed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-accent-green rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg text-text-primary">Daily Streak</h3>
            <p className="text-sm text-text-secondary">
              Day {currentDay} of {totalDays}
            </p>
          </div>
        </div>

        {/* Claim Button or Status */}
        {canClaim && !claimed ? (
          <Button
            onClick={handleClaim}
            className="gradient-primary glow-gold"
          >
            <Gift className="w-4 h-4 mr-2" />
            Claim {nextReward} XP
          </Button>
        ) : (
          <div className="flex flex-col items-end gap-1">
            <span className="text-2xl font-bold text-accent-gold">{nextReward} XP</span>
            <span className="text-xs text-text-muted">Next reward</span>
          </div>
        )}
      </div>

      {/* Progress Dots */}
      <div className="mt-6 flex items-center justify-between">
        {Array.from({ length: totalDays }).map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                index < currentDay
                  ? 'bg-accent-gold text-bg-base'
                  : index === currentDay
                  ? 'bg-accent-purple/30 text-accent-purple border-2 border-accent-purple'
                  : 'bg-bg-surface text-text-muted'
              )}
            >
              {index < currentDay ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>
            {index === currentDay && (
              <span className="text-[10px] text-accent-purple font-medium">Today</span>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}