'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { cn, formatCountdown } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { heroCarouselItems } from '@/config/mock-data'

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroCarouselItems.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const updateCountdown = () => {
      const target = heroCarouselItems[currentIndex].endsAt
      setCountdown(formatCountdown(target))
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [currentIndex])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroCarouselItems.length) % heroCarouselItems.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroCarouselItems.length)
  }

  const currentItem = heroCarouselItems[currentIndex]

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'purple':
        return 'bg-accent-purple/90 text-white'
      case 'green':
        return 'bg-accent-green/90 text-bg-base'
      case 'gold':
        return 'bg-accent-gold/90 text-bg-base'
      default:
        return 'bg-white/20 text-white'
    }
  }

  return (
    <div className="relative w-full h-[280px] md:h-[420px] lg:h-[480px] rounded-[28px] overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={currentItem.backgroundImage}
            alt={currentItem.title}
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Animated Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent-purple/20 via-transparent to-transparent animate-pulse-glow" />

      {/* Content */}
      <div className="relative h-full p-6 md:p-10 flex flex-col justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl"
          >
            {/* Badge */}
            <Badge className={cn('mb-4', getBadgeColor(currentItem.badgeColor))}>
              {currentItem.badge}
            </Badge>

            {/* Title */}
            <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {currentItem.title}
            </h1>

            {/* Description */}
            <p className="text-text-secondary text-base md:text-lg mb-6">
              {currentItem.description}
            </p>

            {/* CTA & Countdown */}
            <div className="flex items-center gap-4">
              <Link href={currentItem.ctaLink}>
                <Button size="lg" className="gradient-primary hover:scale-105 transition-transform">
                  {currentItem.cta}
                </Button>
              </Link>

              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10">
                <Clock className="w-4 h-4 text-accent-cyan" />
                <span className="text-sm font-mono text-accent-cyan">{countdown}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroCarouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all',
              index === currentIndex
                ? 'w-8 bg-accent-purple'
                : 'bg-white/30 hover:bg-white/50'
            )}
          />
        ))}
      </div>
    </div>
  )
}