"use client"

import type React from "react"

import { useSwipeNavigation } from "@/hooks/use-swipe-navigation"
import { SwipeIndicator } from "@/components/swipe-indicator"

interface SwipeNavigationProps {
  children: React.ReactNode
}

export function SwipeNavigation({ children }: SwipeNavigationProps) {
  const { isSwiping, swipeDirection, swipeProgress, nextRoute, prevRoute } = useSwipeNavigation()

  return (
    <>
      <SwipeIndicator
        isVisible={isSwiping && swipeProgress > 10}
        direction={swipeDirection}
        progress={swipeProgress}
        nextRoute={nextRoute}
        prevRoute={prevRoute}
      />
      {children}
    </>
  )
}
