"use client"

import { useOffline } from "@/hooks/use-offline"
import { WifiOff, CloudOff, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

export function OfflineIndicator() {
  const { isOffline, hasOfflineData, pendingSyncs } = useOffline()
  const { toast } = useToast()
  const [isSyncing, setIsSyncing] = useState(false)

  if (!isOffline && !hasOfflineData) return null

  const handleSync = async () => {
    if (isOffline) {
      toast({
        title: "You're offline",
        description: "Please connect to the internet to sync your data.",
        variant: "destructive",
      })
      return
    }

    setIsSyncing(true)
    try {
      // In a real implementation, this would trigger the sync process
      // For now, we'll simulate it with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear pending transactions
      localStorage.removeItem("pendingTransactions")

      toast({
        title: "Sync complete",
        description: "All your data has been synchronized.",
      })
    } catch (error) {
      toast({
        title: "Sync failed",
        description: "There was an error synchronizing your data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div
      className={`fixed bottom-20 md:bottom-4 right-4 z-50 p-3 rounded-lg shadow-lg ${isOffline ? "bg-destructive text-destructive-foreground" : "bg-warning text-warning-foreground"}`}
    >
      <div className="flex items-center gap-2">
        {isOffline ? (
          <>
            <WifiOff className="h-4 w-4" />
            <span className="text-sm font-medium">You're offline</span>
          </>
        ) : (
          <>
            <CloudOff className="h-4 w-4" />
            <span className="text-sm font-medium">
              {pendingSyncs} pending {pendingSyncs === 1 ? "transaction" : "transactions"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-7 px-2 text-xs bg-background/20 hover:bg-background/40"
              onClick={handleSync}
              disabled={isSyncing}
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  Syncing...
                </>
              ) : (
                "Sync Now"
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
