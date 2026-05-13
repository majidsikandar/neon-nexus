'use client'

import { motion } from 'framer-motion'
import { Gem, Star, Crown, Zap, Gift, TrendingUp, Users, Clock } from 'lucide-react'
import { vipTiers } from '@/config/mock-data'
import { useUserStore } from '@/store'
import { cn, formatNumber } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default function VIPPage() {
  const { user } = useUserStore()
  const currentTier = vipTiers.find((t) => t.tier === user?.vipTier) || vipTiers[2]

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-2 flex items-center justify-center gap-3">
          <Crown className="w-8 h-8 text-accent-gold" />
          VIP Club
        </h1>
        <p className="text-text-secondary">
          Unlock exclusive benefits as you climb the ranks
        </p>
      </div>

      {/* Current Tier Hero */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-accent-purple/30 to-accent-cyan/20 border-white/10 p-8">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30"
            style={{ background: currentTier.color }}
          />
        </div>

        <div className="relative flex flex-col md:flex-row items-center gap-8">
          {/* Tier Badge */}
          <div
            className="w-28 h-28 rounded-3xl flex items-center justify-center"
            style={{ background: `${currentTier.color}30` }}
          >
            <Gem className="w-14 h-14" style={{ color: currentTier.color }} />
          </div>

          {/* Tier Info */}
          <div className="flex-1 text-center md:text-left">
            <Badge
              className="mb-2 text-sm px-3 py-1"
              style={{ background: `${currentTier.color}30`, color: currentTier.color }}
            >
              <Star className="w-3 h-3 mr-1" />
              {currentTier.name} Member
            </Badge>
            <h2 className="font-heading text-3xl font-bold text-text-primary mb-2">
              {currentTier.name} VIP
            </h2>
            <p className="text-text-secondary mb-4">
              You&apos;re on your way to {vipTiers[vipTiers.indexOf(currentTier) + 1]?.name || 'max'} VIP!
            </p>

            {/* Progress to Next Tier */}
            {vipTiers[vipTiers.indexOf(currentTier) + 1] && (
              <div className="max-w-md">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-muted">
                    {formatNumber(user?.xp || 0)} XP
                  </span>
                  <span className="text-text-muted">
                    {formatNumber(vipTiers[vipTiers.indexOf(currentTier) + 1].minXP)} XP
                  </span>
                </div>
                <Progress
                  value={((user?.xp || 0) - currentTier.minXP) / (vipTiers[vipTiers.indexOf(currentTier) + 1].minXP - currentTier.minXP) * 100}
                  className="h-3"
                />
                <p className="text-sm text-text-muted mt-2">
                  {formatNumber(vipTiers[vipTiers.indexOf(currentTier) + 1].minXP - (user?.xp || 0))} XP until {vipTiers[vipTiers.indexOf(currentTier) + 1].name}
                </p>
              </div>
            )}
          </div>

          {/* Current Benefits Summary */}
          <div className="flex flex-col gap-2">
            {currentTier.benefits.slice(0, 3).map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-text-secondary">
                <Zap className="w-4 h-4 text-accent-cyan" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* All Tiers */}
      <div>
        <h2 className="font-heading text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent-purple" />
          VIP Tiers
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vipTiers.map((tier, index) => {
            const isCurrentTier = tier.tier === currentTier.tier
            const isUnlocked = index <= vipTiers.indexOf(currentTier)

            return (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={cn(
                    'relative overflow-hidden p-5 transition-all',
                    isCurrentTier
                      ? 'border-2 glow-purple'
                      : 'border-white/5',
                    !isUnlocked && 'opacity-60'
                  )}
                  style={{
                    background: isCurrentTier
                      ? `linear-gradient(180deg, ${tier.color}20 0%, transparent 100%)`
                      : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${tier.color}30` }}
                      >
                        <Gem className="w-6 h-6" style={{ color: tier.color }} />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg" style={{ color: tier.color }}>
                          {tier.name}
                        </h3>
                        <p className="text-xs text-text-muted">
                          {formatNumber(tier.minXP)}+ XP
                        </p>
                      </div>
                    </div>
                    {isCurrentTier && (
                      <Badge className="bg-accent-purple text-white">Current</Badge>
                    )}
                    {!isUnlocked && (
                      <Badge variant="outline" className="border-white/10 text-text-muted">
                        Locked
                      </Badge>
                    )}
                  </div>

                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                        <Zap className="w-3 h-3 text-accent-cyan" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Exclusive Rewards */}
      <Card className="bg-bg-card border-white/5 p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-accent-gold" />
          Exclusive VIP Rewards
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-xl bg-bg-elevated/50 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent-purple" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">Personal Manager</h4>
                <p className="text-sm text-text-muted">Platinum+</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary">
              Dedicated account manager for personalized support and exclusive offers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-bg-elevated/50 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent-gold/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent-gold" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">Priority Withdrawals</h4>
                <p className="text-sm text-text-muted">Gold+</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary">
              Get your withdrawals processed within 1 hour, 24/7.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-bg-elevated/50 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent-cyan/20 flex items-center justify-center">
                <Gift className="w-5 h-5 text-accent-cyan" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">Monthly Cashback</h4>
                <p className="text-sm text-text-muted">All Tiers</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary">
              Receive up to 10% of your monthly losses back as cash.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-bg-elevated/50 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent-green/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-accent-green" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">Exclusive Tournaments</h4>
                <p className="text-sm text-text-muted">Gold+</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary">
              Access to members-only tournaments with guaranteed prize pools.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}