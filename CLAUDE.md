# Neon Nexus - Premium Social Gaming Platform

## Project Overview
A premium social slot gaming web application built with Next.js App Router, featuring a futuristic dark gaming theme. The platform mimics premium gaming experiences like Stake.us, Shuffle, Steam, Discord, Linear, and modern mobile gaming reward systems.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme tokens
- **UI Components**: shadcn/ui (customized with Neon Nexus theme)
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (mock data currently)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Theme & Design System

### Color Tokens (in globals.css)
- `--bg-base: #070B14` - Base background
- `--bg-surface: #0F172A` - Surface cards
- `--bg-card: #131C31` - Card background
- `--bg-elevated: #18233B` - Elevated elements

- `--text-primary: #F8FAFC` - Primary text
- `--text-secondary: #94A3B8` - Secondary text
- `--text-muted: #64748B` - Muted text

- `--accent-purple: #8B5CF6` - Primary accent
- `--accent-cyan: #22D3EE` - Secondary accent
- `--accent-green: #10B981` - Success/winning
- `--accent-gold: #F59E0B` - VIP/rewards
- `--accent-red: #EF4444` - Errors/alerts

### Typography
- Headings: Outfit (font-heading)
- Body: DM Sans (font-sans)

### Border Radius
- Card: 24px
- Button: 16px

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/          # Main app pages
│   │   ├── home/             # Dashboard home
│   │   ├── games/            # Games lobby
│   │   ├── rewards/          # Rewards center
│   │   ├── tournaments/      # Tournament listings
│   │   ├── vip/              # VIP dashboard
│   │   ├── wallet/           # Wallet/balance
│   │   ├── profile/          # User profile
│   │   └── settings/         # Account settings
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Redirects to /home
├── components/
│   ├── layout/               # AppShell, Sidebar, Header, MobileNav
│   ├── shared/              # GameCard, HeroCarousel, etc.
│   └── ui/                  # shadcn components
├── config/
│   └── mock-data.ts         # All mock data (games, users, etc.)
├── store/
│   └── index.ts             # Zustand stores
└── types/
    └── index.ts             # TypeScript interfaces
```

## Key Features

### 1. Home Dashboard
- HeroCarousel with promotional content
- LiveWinnersFeed (scrolling ticker)
- Quick access to trending games
- DailyRewardWidget with streak system
- TournamentPreviewSection
- VIP progress preview

### 2. Games Lobby
- Search functionality
- Category filters (Popular, New, Slots, Crash, Live, etc.)
- Sort options (Popular, New, RTP, A-Z)
- Responsive game grid

### 3. Rewards Center
- Daily streak tracking
- XP/Level progression
- Daily & Weekly missions
- Reward history

### 4. Wallet
- Balance display with hide toggle
- Deposit/Withdraw dialogs
- Transaction history

### 5. VIP Club
- 6 tiers: Bronze → Obsidian
- Tier benefits grid
- Progress to next tier

### 6. Tournaments
- Active & upcoming tournaments
- Prize pool, player count, time remaining

## Running the Project

```bash
cd neon-nexus
npm run dev
# Visit http://localhost:3000
```

## Notes
- Uses mock data for all features (no backend required)
- Images from picsum.photos for game thumbnails
- Avatars from dicebear API
- Zustand stores initialized with mock user data
- All interactive elements have hover states and animations via Framer Motion