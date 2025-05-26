"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [prevPath, setPrevPath] = useState<string | null>(null)

  const routes = ["/", "/pos", "/products", "/customers", "/analytics"]

  useEffect(() => {
    if (prevPath) {
      const prevIndex = routes.indexOf(prevPath)
      const currentIndex = routes.indexOf(pathname)

      if (prevIndex !== -1 && currentIndex !== -1) {
        setDirection(currentIndex > prevIndex ? "left" : "right")
      } else {
        setDirection(null)
      }
    }

    setPrevPath(pathname)
  }, [pathname])

  const variants = {
    initial: (direction: "left" | "right" | null) => {
      return {
        x: direction === "right" ? "-10%" : direction === "left" ? "10%" : 0,
        opacity: 0,
      }
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: "left" | "right" | null) => {
      return {
        x: direction === "right" ? "10%" : direction === "left" ? "-10%" : 0,
        opacity: 0,
        transition: {
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        },
      }
    },
  }

  return (
    <motion.div
      key={pathname}
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  )
}
