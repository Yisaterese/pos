"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ExportButtonProps {
  type?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}

export function ExportButton({ type = "data", variant = "outline" }: ExportButtonProps) {
  const { toast } = useToast()

  const handleExport = () => {
    toast({
      title: "Export initiated",
      description: `Exporting ${type} as CSV file...`,
    })

    // Simulate export delay
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} has been exported successfully.`,
      })
    }, 1500)
  }

  return (
    <Button variant={variant} onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      Export
    </Button>
  )
}
