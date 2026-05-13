import type { Metadata } from 'next'
import { Outfit, DM_Sans } from 'next/font/google'
import './globals.css'
import { AppShell } from '@/components/layout'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const outfit = Outfit({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Neon Nexus - Premium Social Gaming',
  description: 'Experience the future of social slot gaming with premium rewards, tournaments, and VIP benefits.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(outfit.variable, dmSans.variable, 'dark')}
    >
      <body className="min-h-full bg-bg-base font-sans antialiased">
        <TooltipProvider>
          <AppShell>{children}</AppShell>
        </TooltipProvider>
      </body>
    </html>
  )
}