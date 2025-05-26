const CACHE_NAME = "etiraj-pos-cache-v1"
const OFFLINE_URL = "/offline"

// Assets to cache immediately on service worker install
const PRECACHE_ASSETS = [
  "/",
  "/offline",
  "/pos",
  "/products",
  "/customers",
  "/analytics",
  "/favicon.ico",
  "/manifest.json",
]

// Install event - precache key resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS)
      })
      .then(() => {
        return self.skipWaiting()
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME
            })
            .map((cacheName) => {
              return caches.delete(cacheName)
            }),
        )
      })
      .then(() => {
        return self.clients.claim()
      }),
  )
})

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // Skip non-GET requests
  if (event.request.method !== "GET") {
    // For API requests, we'll handle them with the sync event
    if (event.request.url.includes("/api/")) {
      // If it's an API request and we're offline, queue it for later
      if (!navigator.onLine) {
        // This would be handled by the sync manager in a real implementation
        console.log("Offline API request queued:", event.request.url)
      }
    }
    return
  }

  // For navigation requests, use network-first strategy
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL)
      }),
    )
    return
  }

  // For assets, use cache-first strategy
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(event.request)
        .then((response) => {
          // Don't cache responses that aren't successful
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clone the response as it can only be consumed once
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // If the request is for an image, return a placeholder
          if (event.request.destination === "image") {
            return caches.match(placeholderimage)
          }
          return caches.match(OFFLINE_URL)
        })

    }),
  )
})

// Background sync for queued operations
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-transactions") {
    event.waitUntil(syncTransactions())
  }
})

// Function to sync transactions when back online
async function syncTransactions() {
  // In a real implementation, this would retrieve queued transactions from IndexedDB
  // and send them to the server
  console.log("Syncing transactions...")

  // Example implementation:
  // const db = await openDB('offline-transactions', 1);
  // const transactions = await db.getAll('transactions');
  // for (const transaction of transactions) {
  //   try {
  //     await fetch('/api/transactions', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(transaction)
  //     });
  //     await db.delete('transactions', transaction.id);
  //   } catch (error) {
  //     console.error('Failed to sync transaction:', error);
  //   }
  // }
}

// Listen for push notifications
self.addEventListener("push", (event) => {
  const data = event.data.json()
  const options = {
    body: data.body,
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    data: {
      url: data.url,
    },
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  event.waitUntil(clients.openWindow(event.notification.data.url))
})
