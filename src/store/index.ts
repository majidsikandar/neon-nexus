import { create } from 'zustand'
import type { User, VIPTier } from '@/types'

interface UserState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  updateBalance: (amount: number) => void
  addXP: (amount: number) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  updateBalance: (amount) => set((state) => ({
    user: state.user ? { ...state.user, balance: state.user.balance + amount } : null
  })),
  addXP: (amount) => set((state) => {
    if (!state.user) return state
    const newXP = state.user.xp + amount
    const newLevel = Math.floor(newXP / 1000) + 1
    return { user: { ...state.user, xp: newXP, level: newLevel } }
  }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))

interface UIState {
  sidebarCollapsed: boolean
  mobileNavOpen: boolean
  currentPage: string
  setSidebarCollapsed: (collapsed: boolean) => void
  setMobileNavOpen: (open: boolean) => void
  setCurrentPage: (page: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  mobileNavOpen: false,
  currentPage: 'home',
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  setCurrentPage: (currentPage) => set({ currentPage }),
}))

interface NotificationState {
  notifications: Array<{ id: string; type: string; title: string; message: string }>
  unreadCount: number
  addNotification: (notification: { type: string; title: string; message: string }) => void
  markAsRead: (id: string) => void
  clearNotifications: () => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    { id: '1', type: 'success', title: 'Welcome Bonus!', message: 'You received 1000 coins bonus' },
    { id: '2', type: 'info', title: 'Daily Reward', message: 'Come back tomorrow for more rewards' },
  ],
  unreadCount: 2,
  addNotification: (notification) => set((state) => ({
    notifications: [{ ...notification, id: Date.now().toString() }, ...state.notifications],
    unreadCount: state.unreadCount + 1,
  })),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n } : n),
    unreadCount: Math.max(0, state.unreadCount - 1),
  })),
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}))

interface GameState {
  favorites: string[]
  recentlyPlayed: string[]
  toggleFavorite: (gameId: string) => void
  addToRecentlyPlayed: (gameId: string) => void
}

export const useGameStore = create<GameState>((set) => ({
  favorites: [],
  recentlyPlayed: [],
  toggleFavorite: (gameId) => set((state) => ({
    favorites: state.favorites.includes(gameId)
      ? state.favorites.filter(id => id !== gameId)
      : [...state.favorites, gameId]
  })),
  addToRecentlyPlayed: (gameId) => set((state) => ({
    recentlyPlayed: [gameId, ...state.recentlyPlayed.filter(id => id !== gameId)].slice(0, 10)
  })),
}))