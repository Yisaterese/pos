import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface InventoryTransaction {
  id: string
  productId: string
  type: "in" | "out"
  quantity: number
  date: string
  reason: string
  performedBy: string
}

interface InventoryState {
  transactions: InventoryTransaction[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

// Sample inventory transactions
const initialTransactions: InventoryTransaction[] = [
  {
    id: "INV001",
    productId: "1",
    type: "in",
    quantity: 20,
    date: "2023-05-01",
    reason: "Initial stock",
    performedBy: "John Smith",
  },
  {
    id: "INV002",
    productId: "2",
    type: "in",
    quantity: 15,
    date: "2023-05-01",
    reason: "Initial stock",
    performedBy: "John Smith",
  },
  {
    id: "INV003",
    productId: "3",
    type: "in",
    quantity: 25,
    date: "2023-05-02",
    reason: "Restock",
    performedBy: "Sarah Johnson",
  },
  {
    id: "INV004",
    productId: "1",
    type: "out",
    quantity: 5,
    date: "2023-05-03",
    reason: "Sale",
    performedBy: "System",
  },
  {
    id: "INV005",
    productId: "2",
    type: "out",
    quantity: 2,
    date: "2023-05-04",
    reason: "Sale",
    performedBy: "System",
  },
]

const initialState: InventoryState = {
  transactions: initialTransactions,
  status: "idle",
  error: null,
}

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<InventoryTransaction>) => {
      state.transactions.push(action.payload)
    },
    updateTransaction: (state, action: PayloadAction<InventoryTransaction>) => {
      const index = state.transactions.findIndex((tx) => tx.id === action.payload.id)
      if (index !== -1) {
        state.transactions[index] = action.payload
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter((tx) => tx.id !== action.payload)
    },
  },
})

export const { addTransaction, updateTransaction, deleteTransaction } = inventorySlice.actions
export default inventorySlice.reducer
