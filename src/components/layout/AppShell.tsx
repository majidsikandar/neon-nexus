'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore, useUserStore } from '@/store'
import { mockUser } from '@/config/mock-data'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { MobileTopBar } from './MobileTopBar'
import { MobileBottomNav } from './MobileBottomNav'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import {
  Home,
  Gamepad2,
  Gift,
  Trophy,
  Gem,
  Wallet,
  User,
  Settings,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/games', label: 'Games', icon: Gamepad2 },
  { href: '/rewards', label: 'Rewards', icon: Gift },
  { href: '/tournaments', label: 'Tournaments', icon: Trophy },
  { href: '/vip', label: 'VIP', icon: Gem },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed, mobileNavOpen, setMobileNavOpen } = useUIStore()
  const { setUser } = useUserStore()

  // Initialize mock user
  useEffect(() => {
    setUser(mockUser)
  }, [setUser])

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Desktop Layout */}
      <Sidebar />
      <Header />

      {/* Main Content */}
      <main
        className={cn(
          'min-h-screen transition-all duration-300',
          'pt-[72px] lg:pl-[260px]',
          sidebarCollapsed && 'lg:pl-[84px]'
        )}
      >
        <div className="max-w-[1440px] mx-auto p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Layout */}
      <MobileTopBar />
      <MobileBottomNav />

      {/* Mobile Navigation Sheet */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-[300px] bg-bg-surface border-r border-white/5 p-0">
          <div className="p-4">
            <Link href="/home" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-gradient">
                Neon Nexus
              </span>
            </Link>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-card">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-sm font-bold text-white">NP</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">NeonPlayer</p>
                <p className="text-xs text-text-muted">Level 5 • Gold VIP</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}