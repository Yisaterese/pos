"use client"

import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface MobileHeaderProps {
  title: string
}

export function MobileHeader({ title }: MobileHeaderProps) {
  const pathname = usePathname()
  const routes = ["/", "/pos", "/products", "/customers", "/analytics"]
  const currentIndex = routes.indexOf(pathname)

  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex < routes.length - 1 && currentIndex !== -1

  return (
    <div className="flex items-center justify-between p-4 border-b md:hidden">
      <div className="flex items-center">
        <div className="mr-3 text-xl font-bold">{title}</div>
        <div className="flex items-center text-muted-foreground text-xs">
          {hasPrevious && (
            <div className="flex items-center mr-2">
              <ChevronLeft className="h-3 w-3 mr-1" />
              <span>Swipe right</span>
            </div>
          )}
          {hasNext && (
            <div className="flex items-center">
              <span>Swipe left</span>
              <ChevronRight className="h-3 w-3 ml-1" />
            </div>
          )}
        </div>
      </div>
      <ThemeToggle />
    </div>
  )
}
