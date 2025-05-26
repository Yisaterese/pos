"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface ActionButtonProps {
  children: React.ReactNode
  action: "delete" | "edit" | "view" | "create" | "update" | "export" | "print" | "download" | "custom"
  customAction?: () => void
  redirectUrl?: string
  itemName?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}

export function ActionButton({
  children,
  action,
  customAction,
  redirectUrl,
  itemName = "item",
  variant,
}: ActionButtonProps) {
  const { toast } = useToast()
  const router = useRouter()

  const handleAction = () => {
    if (customAction) {
      customAction()
      return
    }

    if (redirectUrl) {
      router.push(redirectUrl)
      return
    }

    // Default actions with toast notifications
    switch (action) {
      case "delete":
        toast({
          title: "Item deleted",
          description: `${itemName} has been deleted successfully.`,
          variant: "destructive",
        })
        break
      case "edit":
        toast({
          title: "Item edited",
          description: `${itemName} has been updated successfully.`,
        })
        break
      case "view":
        toast({
          title: "Viewing details",
          description: `Viewing details for ${itemName}.`,
        })
        break
      case "create":
        toast({
          title: "Item created",
          description: `${itemName} has been created successfully.`,
        })
        break
      case "update":
        toast({
          title: "Item updated",
          description: `${itemName} has been updated successfully.`,
        })
        break
      case "export":
        toast({
          title: "Export initiated",
          description: `Exporting ${itemName}...`,
        })
        break
      case "print":
        toast({
          title: "Print initiated",
          description: `Printing ${itemName}...`,
        })
        break
      case "download":
        toast({
          title: "Download initiated",
          description: `Downloading ${itemName}...`,
        })
        break
      default:
        toast({
          title: "Action completed",
          description: `Action on ${itemName} completed successfully.`,
        })
    }
  }

  return (
    <Button variant={variant || (action === "delete" ? "destructive" : "default")} onClick={handleAction}>
      {children}
    </Button>
  )
}
