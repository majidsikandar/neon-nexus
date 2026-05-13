'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, User, Bell, Shield, Palette, Globe, AlertTriangle, HelpCircle, LogOut } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    promotions: true,
  })

  const [limits, setLimits] = useState({
    daily: 1000,
    weekly: 5000,
    monthly: 20000,
  })

  const settingsSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Personal Information', description: 'Update your profile details' },
        { label: 'Email & Password', description: 'Manage your login credentials' },
        { label: 'Two-Factor Authentication', description: 'Add extra security to your account' },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', description: 'Receive updates via email' },
        { label: 'Push Notifications', description: 'Get instant notifications on mobile' },
        { label: 'SMS Alerts', description: 'Receive text message alerts' },
        { label: 'Promotional Offers', description: 'Receive bonus and promotional emails' },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { label: 'Login History', description: 'View your recent login activity' },
        { label: 'Self-Exclusion', description: 'Temporarily restrict your account' },
        { label: 'Cool-Off Period', description: 'Take a short break from gaming' },
      ],
    },
    {
      title: 'Preferences',
      icon: Palette,
      items: [
        { label: 'Language', description: 'English' },
        { label: 'Theme', description: 'Dark Mode' },
        { label: 'Currency', description: 'USD ($)' },
      ],
    },
  ]

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-2 flex items-center gap-3">
          <Settings className="w-8 h-8 text-accent-purple" />
          Settings
        </h1>
        <p className="text-text-secondary">
          Manage your account preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <Card className="bg-bg-card border-white/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-accent-purple" />
                </div>
                <h3 className="font-heading font-bold text-lg text-text-primary">
                  {section.title}
                </h3>
              </div>

              <div className="space-y-3">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="font-medium text-text-primary">{item.label}</p>
                      <p className="text-sm text-text-muted">{item.description}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-text-muted">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Responsible Gaming Limits */}
      <Card className="bg-bg-card border-white/5 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-accent-gold/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-accent-gold" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-text-primary">
              Responsible Gaming
            </h3>
            <p className="text-sm text-text-muted">
              Set spending limits to play responsibly
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm text-text-secondary">Daily Limit</label>
            <Input
              type="number"
              value={limits.daily}
              onChange={(e) => setLimits({ ...limits, daily: parseInt(e.target.value) })}
              className="bg-bg-elevated border-white/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-text-secondary">Weekly Limit</label>
            <Input
              type="number"
              value={limits.weekly}
              onChange={(e) => setLimits({ ...limits, weekly: parseInt(e.target.value) })}
              className="bg-bg-elevated border-white/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-text-secondary">Monthly Limit</label>
            <Input
              type="number"
              value={limits.monthly}
              onChange={(e) => setLimits({ ...limits, monthly: parseInt(e.target.value) })}
              className="bg-bg-elevated border-white/10"
            />
          </div>
        </div>

        <Button className="mt-4 gradient-primary">
          Save Limits
        </Button>
      </Card>

      {/* Notification Toggles */}
      <Card className="bg-bg-card border-white/5 p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-accent-cyan" />
          Notification Preferences
        </h3>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary capitalize">
                  {key === 'promotions' ? 'Promotional Offers' : `${key} Notifications`}
                </p>
                <p className="text-sm text-text-muted">
                  {key === 'email' && 'Receive notifications via email'}
                  {key === 'push' && 'Get push notifications on your device'}
                  {key === 'sms' && 'Receive text message alerts'}
                  {key === 'promotions' && 'Receive bonus and promotional emails'}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, [key]: checked })
                }
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Help & Support */}
      <Card className="bg-bg-card border-white/5 p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-accent-green" />
          Help & Support
        </h3>

        <div className="grid gap-3 md:grid-cols-2">
          <Button variant="outline" className="justify-start border-white/10 h-12">
            <Globe className="w-5 h-5 mr-3" />
            Help Center
          </Button>
          <Button variant="outline" className="justify-start border-white/10 h-12">
            <HelpCircle className="w-5 h-5 mr-3" />
            Contact Support
          </Button>
        </div>
      </Card>

      {/* Sign Out */}
      <Button variant="outline" className="w-full border-accent-red/30 text-accent-red hover:bg-accent-red/10 h-12">
        <LogOut className="w-5 h-5 mr-2" />
        Sign Out
      </Button>
    </div>
  )
}