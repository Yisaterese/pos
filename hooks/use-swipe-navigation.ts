"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type SwipeDirection = "left" | "right"

interface SwipeOptions {
  threshold?: number
  routes?: string[]
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

export function useSwipeNavigation({
  threshold = 100,
  routes = ["/", "/pos", "/products", "/customers", "/analytics"],
  onSwipeLeft,
  onSwipeRight,
}: SwipeOptions = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  const [isSwiping, setIsSwiping] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection | null>(null)
  const [swipeProgress, setSwipeProgress] = useState(0)

  // Find current route index
  const currentIndex = routes.indexOf(pathname)

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX)
    setTouchEndX(e.targetTouches[0].clientX)
    setIsSwiping(true)
    setSwipeDirection(null)
    setSwipeProgress(0)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchStartX) return

    const currentX = e.targetTouches[0].clientX
    setTouchEndX(currentX)

    // Calculate swipe progress as a percentage
    const diff = currentX - touchStartX
    const direction = diff > 0 ? "right" : "left"
    setSwipeDirection(direction)

    // Calculate progress (0-100%)
    const progress = Math.min(Math.abs(diff) / threshold, 1) * 100
    setSwipeProgress(progress)

    // Prevent default if we're swiping horizontally to avoid page scrolling
    if (Math.abs(diff) > 30) {
      e.preventDefault()
    }
  }

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return

    setIsSwiping(false)

    const diff = touchEndX - touchStartX

    // If swipe distance is greater than threshold, navigate
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe right - go to previous page
        if (onSwipeRight) {
          onSwipeRight()
        } else if (currentIndex > 0) {
          router.push(routes[currentIndex - 1])
        }
      } else {
        // Swipe left - go to next page
        if (onSwipeLeft) {
          onSwipeLeft()
        } else if (currentIndex < routes.length - 1) {
          router.push(routes[currentIndex + 1])
        }
      }
    }

    // Reset
    setTouchStartX(null)
    setTouchEndX(null)
    setSwipeProgress(0)
    setSwipeDirection(null)
  }

  useEffect(() => {
    // Only add event listeners on mobile devices
    const isMobile = window.innerWidth < 768

    if (isMobile) {
      document.addEventListener("touchstart", handleTouchStart, { passive: false })
      document.addEventListener("touchmove", handleTouchMove, { passive: false })
      document.addEventListener("touchend", handleTouchEnd)

      return () => {
        document.removeEventListener("touchstart", handleTouchStart)
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [touchStartX, touchEndX, pathname, routes])

  return {
    isSwiping,
    swipeDirection,
    swipeProgress,
    currentRoute: pathname,
    nextRoute: currentIndex < routes.length - 1 ? routes[currentIndex + 1] : null,
    prevRoute: currentIndex > 0 ? routes[currentIndex - 1] : null,
  }
}
