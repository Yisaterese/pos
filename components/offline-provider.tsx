"use client"

import type React from "react"

import { useEffect } from "react"
import { registerServiceWorker } from "@/lib/service-worker"
import { useAppDispatch } from "@/lib/redux/hooks"
import { setOfflineStatus } from "@/lib/redux/slices/offlineSlice"

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Register service worker
    registerServiceWorker()

    // Set initial offline status
    dispatch(setOfflineStatus(!navigator.onLine))

    // Add event listeners for online/offline events
    const handleOnline = () => {
      dispatch(setOfflineStatus(false))
      // Trigger sync when coming back online
      if ("serviceWorker" in navigator && "SyncManager" in window) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.sync.register("sync-transactions")
        })
      }
    }

    const handleOffline = () => {
      dispatch(setOfflineStatus(true))
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [dispatch])

  return <>{children}</>
}
