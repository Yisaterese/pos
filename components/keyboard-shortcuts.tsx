"use client"

import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

interface KeyboardShortcutsProps {
  shortcuts: {
    key: string
    ctrl?: boolean
    alt?: boolean
    shift?: boolean
    action: () => void
    description: string
  }[]
  enabled?: boolean
}

export function KeyboardShortcuts({ shortcuts, enabled = true }: KeyboardShortcutsProps) {
  const { toast } = useToast()

  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase()
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey : true
        const altMatch = shortcut.alt ? event.altKey : true
        const shiftMatch = shortcut.shift ? event.shiftKey : true

        if (keyMatch && ctrlMatch && altMatch && shiftMatch) {
          event.preventDefault()
          shortcut.action()

          // Show toast notification for the shortcut
          toast({
            title: "Keyboard Shortcut",
            description: shortcut.description,
            duration: 2000,
          })

          break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [shortcuts, enabled, toast])

  return null
}
