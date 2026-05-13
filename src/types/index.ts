export interface User {
  id: string
  email: string
  username: string
  avatar?: string
  balance: number
  xp: number
  level: number
  vipTier: VIPTier
  createdAt: Date
}

export type VIPTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'obsidian'

export interface Game {
  id: string
  name: string
  provider: string
  thumbnail: string
  rtp: number
  volatility: 'low' | 'medium' | 'high'
  category: GameCategory
  isFavorite: boolean
  playerCount: number
  jackpotAmount?: number
  isNew?: boolean
  isPopular?: boolean
}

export type GameCategory = 'popular' | 'new' | 'slots' | 'crash' | 'live' | 'high-rtp' | 'jackpot' | 'bonus-buy'

export interface Transaction {
  id: string
  type: 'deposit' | 'withdraw' | 'bet' | 'win' | 'bonus' | 'refund'
  amount: number
  status: 'pending' | 'completed' | 'failed'
  description: string
  createdAt: Date
}

export interface Mission {
  id: string
  title: string
  description: string
  progress: number
  target: number
  reward: number
  isDaily: boolean
  isCompleted: boolean
  isClaimed: boolean
  expiresAt: Date
}

export interface Tournament {
  id: string
  name: string
  description: string
  prizePool: number
  entryFee: number
  playerCount: number
  maxPlayers: number
  status: 'upcoming' | 'active' | 'completed'
  startsAt: Date
  endsAt: Date
  gameCategory?: GameCategory
}

export interface Reward {
  id: string
  type: 'xp' | 'bonus' | 'free spins' | 'tournament-ticket' | 'merch'
  amount: number
  description: string
  claimedAt: Date
  expiresAt?: Date
}

export interface DailyStreak {
  currentDay: number
  totalDays: number
  nextReward: number
  canClaim: boolean
  lastClaimedAt?: Date
}

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  isRead: boolean
  createdAt: Date
}