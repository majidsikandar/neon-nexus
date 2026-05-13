'use client'

import Link from 'next/link'
import { ArrowRight, TrendingUp, Gamepad2 } from 'lucide-react'
import {
  HeroCarousel,
  GameCard,
  LiveWinnersFeed,
  DailyRewardWidget,
  TournamentPreviewSection,
  VIPProgressPromo,
} from '@/components/shared'
import { mockGames } from '@/config/mock-data'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const popularGames = mockGames.filter((g) => g.isPopular).slice(0, 6)
  const newGames = mockGames.filter((g) => g.isNew).slice(0, 4)

  return (
    <div className="space-y-10 pb-24 lg:pb-8">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Live Winners Feed */}
      <LiveWinnersFeed />

      {/* Continue Playing / Quick Access */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-text-primary flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-accent-purple" />
            Quick Play
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {popularGames.slice(0, 6).map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      </section>

      {/* Daily Reward Widget */}
      <DailyRewardWidget />

      {/* Trending Games */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-text-primary flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent-cyan" />
            Trending Now
          </h2>
          <Link href="/games">
            <Button variant="ghost" size="sm" className="text-accent-purple">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popularGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      </section>

      {/* Tournament Preview */}
      <TournamentPreviewSection />

      {/* New Games */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-text-primary">
            New Releases
          </h2>
          <Link href="/games?category=new">
            <Button variant="ghost" size="sm" className="text-accent-purple">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      </section>

      {/* VIP Progress Promo */}
      <VIPProgressPromo />
    </div>
  )
}