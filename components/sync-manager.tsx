"use client"

import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { selectPendingTransactions, clearPendingTransactions, setLastSyncTime } from "@/lib/redux/slices/offlineSlice"
import { useToast } from "@/components/ui/use-toast"

export function SyncManager() {
  const dispatch = useAppDispatch()
  const pendingTransactions = useAppSelector(selectPendingTransactions)
  const { toast } = useToast()
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    // Check if we have pending transactions and we're online
    if (pendingTransactions.length > 0 && navigator.onLine && !isSyncing) {
      syncTransactions()
    }
  }, [pendingTransactions, isSyncing])

  const syncTransactions = async () => {
    if (isSyncing) return

    setIsSyncing(true)

    try {
      // In a real app, this would make API calls to sync each transaction
      console.log("Syncing transactions:", pendingTransactions)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear pending transactions after successful sync
      dispatch(clearPendingTransactions())
      dispatch(setLastSyncTime(Date.now()))

      toast({
        title: "Sync complete",
        description: `${pendingTransactions.length} transactions have been synchronized.`,
      })
    } catch (error) {
      console.error("Error syncing transactions:", error)
      toast({
        title: "Sync failed",
        description: "There was an error synchronizing your transactions. We'll try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  // This component doesn't render anything visible
  return null
}
