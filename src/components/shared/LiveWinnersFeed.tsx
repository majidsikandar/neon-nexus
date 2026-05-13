'use client'

import { motion } from 'framer-motion'
import { Trophy, Sparkles } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { liveWinners } from '@/config/mock-data'

export function LiveWinnersFeed() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-bg-card border border-white/5 p-4">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-accent-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-accent-purple/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-gold/20 border border-accent-gold/30">
          <Trophy className="w-4 h-4 text-accent-gold" />
          <span className="text-sm font-bold text-accent-gold">Live Winners</span>
        </div>

        {/* Scrolling Winners */}
        <div className="flex-1 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...liveWinners, ...liveWinners, ...liveWinners].map((winner, index) => (
              <div
                key={`${winner.username}-${index}`}
                className="flex items-center gap-2"
              >
                <span className="text-sm font-bold text-accent-cyan">{winner.username}</span>
                <span className="text-xs text-text-muted">won</span>
                <span className="text-sm font-bold text-accent-green">
                  {formatCurrency(winner.amount)}
                </span>
                <span className="text-xs text-text-muted">on</span>
                <span className="text-xs text-text-secondary">{winner.game}</span>
                <Sparkles className="w-3 h-3 text-accent-gold" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}