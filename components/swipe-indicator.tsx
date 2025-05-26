"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SwipeIndicatorProps {
  isVisible: boolean
  direction: "left" | "right" | null
  progress: number
  nextRoute?: string | null
  prevRoute?: string | null
}

export function SwipeIndicator({ isVisible, direction, progress, nextRoute, prevRoute }: SwipeIndicatorProps) {
  const [label, setLabel] = useState("")

  useEffect(() => {
    // Extract page name from route
    if (direction === "left" && nextRoute) {
      const pageName = nextRoute.split("/").filter(Boolean)[0] || "Home"
      setLabel(pageName.charAt(0).toUpperCase() + pageName.slice(1))
    } else if (direction === "right" && prevRoute) {
      const pageName = prevRoute.split("/").filter(Boolean)[0] || "Home"
      setLabel(pageName.charAt(0).toUpperCase() + pageName.slice(1))
    } else {
      setLabel("")
    }
  }, [direction, nextRoute, prevRoute])

  if (!isVisible || !direction) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: progress / 100 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-between px-4"
        >
          <div
            className={cn(
              "flex items-center justify-center rounded-full bg-primary/20 text-primary",
              "w-12 h-12 transition-opacity",
              direction === "right" ? "opacity-100" : "opacity-0",
            )}
          >
            <ChevronLeft className="h-6 w-6" />
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <span className="text-sm font-medium">{label}</span>
          </div>

          <div
            className={cn(
              "flex items-center justify-center rounded-full bg-primary/20 text-primary",
              "w-12 h-12 transition-opacity",
              direction === "left" ? "opacity-100" : "opacity-0",
            )}
          >
            <ChevronRight className="h-6 w-6" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
