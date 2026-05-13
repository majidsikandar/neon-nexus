'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { GameCard } from '@/components/shared'
import { mockGames, gameCategories } from '@/config/mock-data'
import type { GameCategory } from '@/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export default function GamesPage() {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  const filteredGames = mockGames.filter((game) => {
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.provider.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.playerCount - a.playerCount
      case 'new':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      case 'rtp':
        return b.rtp - a.rtp
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">
          Games
        </h1>
        <p className="text-text-secondary">
          {mockGames.length} games available
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input
            placeholder="Search games or providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 bg-bg-card border-white/5 rounded-xl"
          />
        </div>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="h-12 bg-bg-card border-white/5">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Sort
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-bg-card border-white/10">
            <DropdownMenuItem onClick={() => setSortBy('popular')}>
              Most Popular
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('new')}>
              Newest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('rtp')}>
              Highest RTP
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('name')}>
              A-Z
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory('all')}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
            selectedCategory === 'all'
              ? 'gradient-primary text-white'
              : 'bg-bg-card text-text-secondary hover:text-text-primary'
          )}
        >
          All Games
        </button>
        {gameCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as GameCategory)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
              selectedCategory === category.id
                ? 'gradient-primary text-white'
                : 'bg-bg-card text-text-secondary hover:text-text-primary'
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted">
          Showing {sortedGames.length} games
        </p>
        {selectedCategory !== 'all' && (
          <Badge variant="outline" className="border-white/10 text-text-secondary">
            {gameCategories.find((c) => c.id === selectedCategory)?.name}
          </Badge>
        )}
      </div>

      {/* Games Grid */}
      {sortedGames.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {sortedGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 rounded-full bg-bg-card flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No games found</h3>
          <p className="text-sm text-text-muted">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  )
}