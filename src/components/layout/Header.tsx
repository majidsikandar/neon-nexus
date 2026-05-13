'use client'

import { useState } from 'react'
import { Search, Bell, Eye, EyeOff, Menu } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { useUIStore, useUserStore, useNotificationStore } from '@/store'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const [showBalance, setShowBalance] = useState(true)
  const { setMobileNavOpen } = useUIStore()
  const { user } = useUserStore()
  const { notifications, unreadCount } = useNotificationStore()

  return (
    <header className="h-[72px] bg-bg-surface/80 backdrop-blur-xl border-b border-white/5 fixed top-0 left-0 right-0 z-30 lg:left-[260px]">
      <div className="h-full max-w-[1440px] mx-auto px-6 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-text-secondary"
          onClick={() => setMobileNavOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              placeholder="Search games..."
              className="w-full pl-11 pr-4 h-11 bg-bg-card border-white/5 rounded-xl text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-accent-purple/50 focus:border-accent-purple/50"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Balance - Desktop */}
          <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-bg-card border border-white/5">
            <div className="text-right">
              <p className="text-xs text-text-muted">Balance</p>
              <p className="text-sm font-bold text-accent-green">
                {showBalance ? formatCurrency(user?.balance || 0) : '••••••'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-text-muted hover:text-text-primary"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-text-secondary hover:text-text-primary"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-red rounded-full text-xs text-white flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-bg-card border-white/10">
              <DropdownMenuLabel className="text-text-primary">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              {notifications.slice(0, 5).map((notif) => (
                <DropdownMenuItem key={notif.id} className="flex flex-col items-start gap-1 p-3">
                  <p className="text-sm font-medium text-text-primary">{notif.title}</p>
                  <p className="text-xs text-text-muted">{notif.message}</p>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-center text-accent-purple text-sm">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon" className="relative">
                <Avatar className="w-9 h-9 border-2 border-accent-purple">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-accent-purple/20 text-accent-purple">
                    NP
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-bg-card border-white/10">
              <DropdownMenuLabel className="text-text-primary">
                <div className="flex flex-col">
                  <span>{user?.username || 'Player'}</span>
                  <span className="text-xs text-text-muted font-normal">{user?.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-text-secondary hover:text-text-primary">
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-text-secondary hover:text-text-primary">
                Wallet
              </DropdownMenuItem>
              <DropdownMenuItem className="text-text-secondary hover:text-text-primary">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-accent-red">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}