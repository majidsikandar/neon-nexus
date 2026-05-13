'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, Play, TrendingUp, Sparkles, Users } from 'lucide-react'
import { cn, formatNumber } from '@/lib/utils'
import type { Game } from '@/types'
import { useGameStore } from '@/store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface GameCardProps {
  game: Game
  index?: number
}

export function GameCard({ game, index = 0 }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { toggleFavorite } = useGameStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div
        className={cn(
          'relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer',
          'bg-bg-card border border-white/5',
          'transition-all duration-220',
          isHovered && 'scale-[1.03] border-accent-purple/50 glow-purple'
        )}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={game.thumbnail}
            alt={game.name}
            fill
            className={cn(
              'object-cover transition-transform duration-300',
              isHovered && 'scale-110'
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {game.isNew && (
              <Badge className="bg-accent-cyan/90 text-bg-base text-xs font-bold px-2 py-0.5">
                <Sparkles className="w-3 h-3 mr-1" />
                NEW
              </Badge>
            )}
            {game.isPopular && !game.isNew && (
              <Badge className="bg-accent-purple/90 text-white text-xs font-bold px-2 py-0.5">
                <TrendingUp className="w-3 h-3 mr-1" />
                HOT
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(game.id)
            }}
            className={cn(
              'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center',
              'bg-black/40 backdrop-blur-sm border border-white/10',
              'transition-all duration-200 hover:scale-110',
              game.isFavorite ? 'text-accent-red' : 'text-white/70 hover:text-white'
            )}
          >
            <Heart
              className={cn('w-4 h-4', game.isFavorite && 'fill-current')}
            />
          </button>

          {/* Play Button - Shows on hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <Button
              size="lg"
              className="relative z-10 gradient-primary hover:scale-110 transition-transform"
            >
              <Play className="w-5 h-5 mr-2 fill-white" />
              Play Now
            </Button>
          </motion.div>

          {/* Game Info - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-heading font-bold text-lg text-white mb-1 line-clamp-1">
              {game.name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-xs text-text-secondary">{game.provider}</p>
              <div className="flex items-center gap-1 text-text-muted">
                <Users className="w-3 h-3" />
                <span className="text-xs">{formatNumber(game.playerCount)}</span>
              </div>
            </div>

            {/* RTP Badge */}
            <div className="mt-2">
              <span
                className={cn(
                  'text-xs font-bold px-2 py-0.5 rounded-full',
                  game.rtp >= 97
                    ? 'bg-accent-green/20 text-accent-green'
                    : game.rtp >= 95
                    ? 'bg-accent-gold/20 text-accent-gold'
                    : 'bg-white/10 text-text-secondary'
                )}
              >
                RTP {game.rtp}%
              </span>
            </div>
          </div>

          {/* Jackpot Amount */}
          {game.jackpotAmount && (
            <div className="absolute top-3 right-14">
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-accent-gold/90 text-bg-base">
                ${formatNumber(game.jackpotAmount)}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}