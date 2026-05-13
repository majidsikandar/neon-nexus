'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Gem, Star, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store'
import { vipTiers } from '@/config/mock-data'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export function VIPProgressPromo() {
  const { user } = useUserStore()
  const currentTier = vipTiers.find((t) => t.tier === user?.vipTier) || vipTiers[2]
  const nextTier = vipTiers[vipTiers.indexOf(currentTier) + 1]

  const currentXP = user?.xp || 0
  const xpForNextTier = nextTier ? nextTier.minXP - currentXP : 0
  const progress = nextTier
    ? ((currentXP - currentTier.minXP) / (nextTier.minXP - currentTier.minXP)) * 100
    : 100

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-bg-card to-bg-elevated border-white/5 p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20"
          style={{ background: currentTier.color }}
        />
      </div>

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Current Tier Badge */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: `${currentTier.color}20` }}
          >
            <Gem className="w-8 h-8" style={{ color: currentTier.color }} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-lg font-bold"
                style={{ color: currentTier.color }}
              >
                {currentTier.name}
              </span>
              <Star className="w-4 h-4 text-accent-gold fill-accent-gold" />
            </div>
            <p className="text-sm text-text-secondary">VIP Level {user?.level || 1}</p>
          </div>
        </div>

        {/* Progress to Next Tier */}
        {nextTier && (
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-text-muted">Next:</span>
              <span
                className="font-bold"
                style={{ color: nextTier.color }}
              >
                {nextTier.name}
              </span>
            </div>
            <div className="w-32">
              <Progress
                value={progress}
                className="h-2 bg-bg-surface"
                style={{
                  '--progress-color': nextTier.color,
                } as React.CSSProperties}
              />
            </div>
            <span className="text-xs text-text-muted">
              {xpForNextTier.toLocaleString()} XP to go
            </span>
          </div>
        )}

        {!nextTier && (
          <div className="text-right">
            <span className="text-lg font-bold text-accent-gold">Max Level!</span>
            <p className="text-xs text-text-muted">You've reached the top</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-6 flex justify-end">
        <Link href="/vip">
          <Button variant="outline" className="border-white/10 text-text-secondary hover:text-text-primary hover:bg-white/5">
            View Benefits
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}