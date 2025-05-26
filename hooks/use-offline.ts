"use client"

import { useState, useEffect } from "react"

export function useOffline() {
  const [isOffline, setIsOffline] = useState(false)
  const [hasOfflineData, setHasOfflineData] = useState(false)
  const [pendingSyncs, setPendingSyncs] = useState(0)

  useEffect(() => {
    // Check initial online status
    setIsOffline(!navigator.onLine)

    // Add event listeners for online/offline events
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Check for pending syncs in IndexedDB
    const checkPendingSyncs = async () => {
      try {
        // In a real implementation, this would check IndexedDB for pending transactions
        // For now, we'll simulate it with localStorage
        const pendingTransactions = localStorage.getItem("pendingTransactions")
        if (pendingTransactions) {
          const transactions = JSON.parse(pendingTransactions)
          setPendingSyncs(transactions.length)
          setHasOfflineData(transactions.length > 0)
        }
      } catch (error) {
        console.error("Error checking pending syncs:", error)
      }
    }

    checkPendingSyncs()

    // Set up interval to periodically check for pending syncs
    const interval = setInterval(checkPendingSyncs, 5000)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      clearInterval(interval)
    }
  }, [])

  return { isOffline, hasOfflineData, pendingSyncs }
}
