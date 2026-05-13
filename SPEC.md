# Neon Nexus - Premium Social Slot Gaming Platform

## 1. Project Overview

**Project Name:** Neon Nexus
**Type:** Social slot gaming web application (Next.js App Router)
**Core Functionality:** Premium social gaming platform with slot games, rewards, VIP progression, tournaments, and fintech-grade wallet UX
**Target Users:** Social gamers, casual players seeking premium gaming experience

## 2. UI/UX Specification

### Layout Structure

#### Desktop (≥1024px)
- Left sidebar: 260px expanded, 84px collapsed
- Top header: 72px height
- Main content max-width: 1440px
- Page padding: 32px
- Section gap: 48-64px

#### Mobile (<1024px)
- Top bar: 64px height
- Floating bottom navigation: 72px height
- Page padding: 16px
- Card radius: 20-24px

### Visual Design

#### Color Tokens
```
--bg-base: #070B14;
--bg-surface: #0F172A;
--bg-card: #131C31;
--bg-elevated: #18233B;

--text-primary: #F8FAFC;
--text-secondary: #94A3B8;
--text-muted: #64748B;

--accent-purple: #8B5CF6;
--accent-cyan: #22D3EE;
--accent-green: #10B981;
--accent-gold: #F59E0B;
--accent-red: #EF4444;

--radius-card: 24px;
--radius-button: 16px;

--shadow-card: 0 10px 30px rgba(0,0,0,0.35);
--shadow-glow: 0 0 30px rgba(139,92,246,0.25);
```

#### Primary Gradient
`linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)`

#### Typography
- Font family: "Outfit" (headings), "DM Sans" (body)
- Headings: 700 weight, tracking -0.02em
- Body: 400/500 weight
- Scale: 12px, 14px, 16px, 18px, 24px, 32px, 48px, 64px

#### Spacing System
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px, 3xl: 64px

#### Visual Effects
- Glassmorphism: backdrop-blur-xl, bg-opacity-80
- Glow effects: box-shadow with accent colors at 25% opacity
- Card shadows: multi-layer with dark base
- Micro-animations: 180-300ms ease-out

### Components

#### Navigation
**Desktop Sidebar:**
- Logo at top
- Nav items with icons + labels
- Active state: purple accent bg, glow
- Hover: subtle bg shift
- User avatar + balance at bottom

**Mobile Bottom Nav:**
- 5 items: Home, Games, Rewards, Wallet, Profile
- Floating pill design with blur
- Active: purple gradient fill

#### Header (Desktop)
- Search bar (centered)
- Notification bell with badge
- Balance display
- User avatar dropdown

#### HeroCarousel
- Height: 420-520px desktop, 280-340px mobile
- Radius: 28px
- Dark gradient overlay (bottom-focused)
- Animated glow background
- CTA button bottom-left
- Countdown timer
- Event badge top-right

#### GameCard
- 3:4 aspect ratio
- Rounded 24px
- Subtle border (#ffffff10)
- Dark overlay gradient
- Title at bottom with provider
- Hover: scale 1.03, image zoom, border glow
- Favorite button top-right
- Play CTA slides up on hover

#### Rewards Components
- DailyStreakCard: circular progress, flame icon, day count
- XPProgressCard: progress bar, level badge, points to next
- MissionCard: icon, title, progress, claim button
- MysteryChest: animated chest, lock states, rarity glow

#### Wallet Components
- BalanceSummaryCard: large balance, hidden toggle, quick actions
- TransactionTable: date, type, amount, status badge
- Deposit/Withdraw forms: clean inputs, prominent CTAs

#### VIP Components
- TierHero: current tier badge, XP progress, benefits preview
- TierBenefitsGrid: benefit cards per tier
- TierComparison: table comparing all tiers

### Animation Specs
- Button hover: 180ms scale(1.02) + glow
- Card hover: 220ms scale(1.03) + image zoom
- Modal open: 300ms fade + scale(0.95 → 1)
- Reward claim: 600ms glow burst + confetti
- Page transitions: 300-400ms fade + slide
- XP progress: smooth 1s animation
- Loading: skeleton pulse 1.5s infinite

## 3. Functionality Specification

### Pages

#### 1. Home Dashboard
- HeroCarousel with promotional content
- ContinuePlayingSection (recent games)
- TrendingGamesSection (horizontal scroll)
- DailyRewardWidget (claim button + streak)
- TournamentPreviewSection (active + upcoming)
- LiveWinnersFeed (scrolling ticker)
- VIPProgressPromo (current tier + progress)
- Footer (links, social, legal)

#### 2. Games Lobby
- SearchBar with debounce
- CategoryTabs: Popular, New, Slots, Crash, Live, High RTP, Jackpot, Bonus Buy
- ProviderFilter dropdown
- SortDropdown: Popular, New, A-Z, RTP
- ResponsiveGameGrid (2-8 columns)
- Infinite scroll / load more

#### 3. Game Detail Page
- Game preview with play button
- Game info: provider, RTP, volatility
- Similar games section
- Game history (if played)

#### 4. Rewards Center
- DailyStreakCard (7-day cycle)
- XPProgressCard with level system
- DailyMissions (3 active)
- WeeklyMissions (3 active)
- MysteryChestGrid (3 chests, unlock costs)
- RewardHistory tab

#### 5. Wallet
- BalanceSummaryCard with balance
- Tabs: Deposit, Withdraw, History, Rewards
- Transaction table with filters
- Payment methods (mock)
- Transaction details modal

#### 6. VIP Dashboard
- CurrentTierHero with benefits
- XPProgressToNextTier
- TierBenefitsGrid
- TierComparison table
- ExclusiveRewards section

#### 7. Tournaments
- ActiveTournaments list
- UpcomingTournaments list
- TournamentCard: name, prize pool, players, time remaining
- Leaderboard
- My Performance section

#### 8. Profile
- Avatar upload
- Username, email
- Stats: games played, total wins, favorite games
- Activity history
- Preferences

#### 9. Settings
- Account settings
- Security (password, 2FA)
- Notifications preferences
- Appearance (theme toggle)
- Language
- Responsible gaming limits

#### 10. Login/Signup
- Email + password
- Social login buttons (mock)
- Forgot password flow
- Form validation with Zod

### User Interactions
- Smooth page transitions
- Skeleton loading states
- Pull-to-refresh on mobile
- Infinite scroll for games
- Swipeable carousels
- Toast notifications for actions

### Data Handling
- Mock data for all features
- Zustand stores: user, games, wallet, rewards, ui
- TanStack Query for async data (mock)
- LocalStorage for preferences

## 4. Acceptance Criteria

### Visual
- [ ] Dark theme with purple/cyan accents throughout
- [ ] Consistent 24px card radius
- [ ] Proper glow effects on interactive elements
- [ ] Smooth 180-300ms animations
- [ ] Mobile-first responsive design
- [ ] No cheap casino aesthetics

### Functional
- [ ] All 10 pages navigable
- [ ] Sidebar collapses on desktop
- [ ] Mobile bottom nav works
- [ ] Game cards have hover states
- [ ] Rewards show progression
- [ ] Wallet shows transactions
- [ ] VIP tiers display correctly

### Technical
- [ ] TypeScript types for all data
- [ ] Zustand stores for state
- [ ] Framer Motion animations
- [ ] shadcn/ui components customized
- [ ] Tailwind with custom tokens
- [ ] Mock data throughout

### Performance
- [ ] Next Image for game images
- [ ] Lazy loading for game grid
- [ ] Skeleton loaders
- [ ] Reduced motion support