'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Gamepad2,
  Gift,
  Trophy,
  Gem,
  Wallet,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils'
import { useUIStore, useUserStore } from '@/store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

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

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore()
  const { user } = useUserStore()

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 84 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 z-40 h-screen bg-bg-surface border-r border-white/5 hidden lg:flex flex-col"
    >
      {/* Logo */}
      <div className="h-[72px] flex items-center px-5 border-b border-white/5">
        <Link href="/home" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-heading font-bold text-xl text-gradient"
              >
                Neon Nexus
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-accent-purple/20 text-accent-purple glow-purple'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              )}
            >
              <Icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-accent-purple')} />
              <AnimatePresence mode="wait">
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-medium text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-white/5">
        <AnimatePresence mode="wait">
          {!sidebarCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-card">
                <Avatar className="w-10 h-10 border-2 border-accent-purple">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-accent-purple/20 text-accent-purple">
                    NP
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {user?.username || 'Player'}
                  </p>
                  <p className="text-xs text-text-muted">
                    Level {user?.level || 1}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-accent-green">
                    {formatCurrency(user?.balance || 0)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(true)}
                  className="w-full text-text-muted hover:text-text-primary"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Collapse
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <Avatar className="w-10 h-10 border-2 border-accent-purple">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-accent-purple/20 text-accent-purple">
                  NP
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(false)}
                className="w-8 h-8 text-text-muted hover:text-text-primary"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  )
}