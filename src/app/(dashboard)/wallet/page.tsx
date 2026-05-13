'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Bitcoin,
  Plus,
  Eye,
  EyeOff,
  Search,
  ArrowRightLeft,
  Gift,
} from 'lucide-react'
import { mockTransactions } from '@/config/mock-data'
import { useUserStore } from '@/store'
import { cn, formatCurrency, formatTimeAgo } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true)
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [showDepositDialog, setShowDepositDialog] = useState(false)
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)
  const { user, updateBalance } = useUserStore()

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount)
    if (amount > 0) {
      updateBalance(amount)
      setShowDepositDialog(false)
      setDepositAmount('')
    }
  }

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount)
    if (amount > 0 && amount <= (user?.balance || 0)) {
      updateBalance(-amount)
      setShowWithdrawDialog(false)
      setWithdrawAmount('')
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-4 h-4 text-accent-green" />
      case 'withdraw':
        return <ArrowUpRight className="w-4 h-4 text-accent-red" />
      case 'win':
        return <Gift className="w-4 h-4 text-accent-gold" />
      case 'bonus':
        return <Gift className="w-4 h-4 text-accent-purple" />
      case 'bet':
        return <ArrowRightLeft className="w-4 h-4 text-text-muted" />
      default:
        return <Wallet className="w-4 h-4 text-text-muted" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-accent-green/20 text-accent-green">Completed</Badge>
      case 'pending':
        return <Badge className="bg-accent-gold/20 text-accent-gold">Pending</Badge>
      case 'failed':
        return <Badge className="bg-accent-red/20 text-accent-red">Failed</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">
          Wallet
        </h1>
        <p className="text-text-secondary">
          Manage your balance and transactions
        </p>
      </div>

      {/* Balance Card */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-accent-purple/30 via-accent-purple/20 to-accent-cyan/20 border-white/10 p-6">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent-purple/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-cyan/20 rounded-full blur-2xl" />
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-text-secondary mb-1">Total Balance</p>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-text-primary">
                  {showBalance ? formatCurrency(user?.balance || 0) : '••••••'}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-text-muted hover:text-text-primary"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <Button
              className="gradient-primary flex-1"
              onClick={() => setShowDepositDialog(true)}
            >
              <ArrowDownLeft className="w-4 h-4 mr-2" />
              Deposit
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-white/20 text-text-primary hover:bg-white/5"
              onClick={() => setShowWithdrawDialog(true)}
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-bg-card border-white/5 p-4 text-center">
          <p className="text-sm text-text-muted mb-1">Deposits</p>
          <p className="text-xl font-bold text-accent-green">
            {formatCurrency(mockTransactions.filter((t) => t.type === 'deposit').reduce((acc, t) => acc + t.amount, 0))}
          </p>
        </Card>
        <Card className="bg-bg-card border-white/5 p-4 text-center">
          <p className="text-sm text-text-muted mb-1">Winnings</p>
          <p className="text-xl font-bold text-accent-gold">
            {formatCurrency(mockTransactions.filter((t) => t.type === 'win').reduce((acc, t) => acc + t.amount, 0))}
          </p>
        </Card>
        <Card className="bg-bg-card border-white/5 p-4 text-center">
          <p className="text-sm text-text-muted mb-1">Bonus</p>
          <p className="text-xl font-bold text-accent-purple">
            {formatCurrency(mockTransactions.filter((t) => t.type === 'bonus').reduce((acc, t) => acc + t.amount, 0))}
          </p>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="bg-bg-card border-white/5 p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-accent-cyan" />
          Transaction History
        </h3>

        <div className="space-y-3">
          {mockTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-xl bg-bg-elevated/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-bg-surface flex items-center justify-center">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="font-medium text-text-primary">{transaction.description}</p>
                  <p className="text-sm text-text-muted">
                    {formatTimeAgo(transaction.createdAt)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                  'font-bold',
                  transaction.amount > 0 ? 'text-accent-green' : 'text-text-primary'
                )}>
                  {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                </p>
                {getStatusBadge(transaction.status)}
              </div>
            </motion.div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4 border-white/10">
          View All Transactions
        </Button>
      </Card>

      {/* Deposit Dialog */}
      <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
        <DialogContent className="bg-bg-card border-white/10">
          <DialogHeader>
            <DialogTitle className="text-text-primary">Deposit Funds</DialogTitle>
            <DialogDescription className="text-text-secondary">
              Add funds to your account
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm text-text-secondary">Amount</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="bg-bg-elevated border-white/10"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[50, 100, 250, 500, 1000].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  className="border-white/10"
                  onClick={() => setDepositAmount(amount.toString())}
                >
                  ${amount}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 border-white/10">
                <CreditCard className="w-4 h-4 mr-2" />
                Card
              </Button>
              <Button variant="outline" className="flex-1 border-white/10">
                <Bitcoin className="w-4 h-4 mr-2" />
                Crypto
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDepositDialog(false)}>
              Cancel
            </Button>
            <Button className="gradient-primary" onClick={handleDeposit}>
              Deposit ${depositAmount || '0'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogContent className="bg-bg-card border-white/10">
          <DialogHeader>
            <DialogTitle className="text-text-primary">Withdraw Funds</DialogTitle>
            <DialogDescription className="text-text-secondary">
              Transfer funds to your bank account
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm text-text-secondary">Amount</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="bg-bg-elevated border-white/10"
              />
            </div>
            <p className="text-sm text-text-muted">
              Available balance: {formatCurrency(user?.balance || 0)}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[50, 100, 250, 500].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  className="border-white/10"
                  onClick={() => setWithdrawAmount(amount.toString())}
                >
                  ${amount}
                </Button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>
              Cancel
            </Button>
            <Button className="gradient-primary" onClick={handleWithdraw}>
              Withdraw ${withdrawAmount || '0'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}