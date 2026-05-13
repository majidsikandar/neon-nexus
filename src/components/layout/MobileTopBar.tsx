'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Bell, Zap, Eye, EyeOff, Menu } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { useUIStore, useUserStore, useNotificationStore } from '@/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

export function MobileTopBar() {
  const [showBalance, setShowBalance] = useState(true)
  const { setMobileNavOpen } = useUIStore()
  const { user } = useUserStore()
  const { notifications, unreadCount } = useNotificationStore()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 lg:hidden h-[64px] bg-bg-surface/95 backdrop-blur-xl border-b border-white/5">
      <div className="h-full px-4 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading font-bold text-lg text-gradient">
            NN
          </span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Balance */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-bg-card border border-white/5">
            <span className="text-xs text-text-muted">$</span>
            <span className="text-sm font-bold text-accent-green">
              {showBalance ? formatCurrency(user?.balance || 0).replace('$', '') : '••••'}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            </Button>
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative w-9 h-9"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-red rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </Button>

          {/* Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="absolute top-16 left-0 right-0 px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input
            placeholder="Search games..."
            className="w-full pl-10 h-10 bg-bg-card border-white/5 rounded-xl text-sm"
          />
        </div>
      </div>
    </header>
  )
}