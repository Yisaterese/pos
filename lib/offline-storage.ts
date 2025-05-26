// Type definitions
export interface OfflineTransaction {
  id: string
  type: "sale" | "return" | "inventory"
  data: any
  timestamp: number
  synced: boolean
}

// Function to save a transaction for offline use
export async function saveOfflineTransaction(transaction: Omit<OfflineTransaction, "id" | "timestamp" | "synced">) {
  try {
    // In a real implementation, this would use IndexedDB
    // For simplicity, we'll use localStorage
    const id = `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    const fullTransaction: OfflineTransaction = {
      ...transaction,
      id,
      timestamp: Date.now(),
      synced: false,
    }

    // Get existing transactions
    const existingTransactionsJson = localStorage.getItem("pendingTransactions") || "[]"
    const existingTransactions: OfflineTransaction[] = JSON.parse(existingTransactionsJson)

    // Add new transaction
    existingTransactions.push(fullTransaction)

    // Save back to storage
    localStorage.setItem("pendingTransactions", JSON.stringify(existingTransactions))

    return fullTransaction
  } catch (error) {
    console.error("Error saving offline transaction:", error)
    throw error
  }
}

// Function to get all pending transactions
export async function getPendingTransactions(): Promise<OfflineTransaction[]> {
  try {
    const transactionsJson = localStorage.getItem("pendingTransactions") || "[]"
    return JSON.parse(transactionsJson)
  } catch (error) {
    console.error("Error getting pending transactions:", error)
    return []
  }
}

// Function to mark a transaction as synced
export async function markTransactionSynced(id: string) {
  try {
    const transactionsJson = localStorage.getItem("pendingTransactions") || "[]"
    const transactions: OfflineTransaction[] = JSON.parse(transactionsJson)

    const updatedTransactions = transactions.map((txn) => (txn.id === id ? { ...txn, synced: true } : txn))

    localStorage.setItem("pendingTransactions", JSON.stringify(updatedTransactions))
  } catch (error) {
    console.error("Error marking transaction as synced:", error)
    throw error
  }
}

// Function to remove synced transactions
export async function removeSyncedTransactions() {
  try {
    const transactionsJson = localStorage.getItem("pendingTransactions") || "[]"
    const transactions: OfflineTransaction[] = JSON.parse(transactionsJson)

    const pendingTransactions = transactions.filter((txn) => !txn.synced)

    localStorage.setItem("pendingTransactions", JSON.stringify(pendingTransactions))
  } catch (error) {
    console.error("Error removing synced transactions:", error)
    throw error
  }
}

// Function to cache products for offline use
export async function cacheProductsForOffline(products: any[]) {
  try {
    localStorage.setItem("cachedProducts", JSON.stringify(products))
    localStorage.setItem("productsLastUpdated", Date.now().toString())
  } catch (error) {
    console.error("Error caching products:", error)
    throw error
  }
}

// Function to get cached products
export async function getCachedProducts() {
  try {
    const productsJson = localStorage.getItem("cachedProducts") || "[]"
    return JSON.parse(productsJson)
  } catch (error) {
    console.error("Error getting cached products:", error)
    return []
  }
}

// Function to cache customers for offline use
export async function cacheCustomersForOffline(customers: any[]) {
  try {
    localStorage.setItem("cachedCustomers", JSON.stringify(customers))
    localStorage.setItem("customersLastUpdated", Date.now().toString())
  } catch (error) {
    console.error("Error caching customers:", error)
    throw error
  }
}

// Function to get cached customers
export async function getCachedCustomers() {
  try {
    const customersJson = localStorage.getItem("cachedCustomers") || "[]"
    return JSON.parse(customersJson)
  } catch (error) {
    console.error("Error getting cached customers:", error)
    return []
  }
}
