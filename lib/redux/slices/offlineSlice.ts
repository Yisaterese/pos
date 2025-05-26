import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

interface OfflineState {
  isOffline: boolean
  pendingTransactions: any[]
  lastSyncTime: number | null
}

const initialState: OfflineState = {
  isOffline: false,
  pendingTransactions: [],
  lastSyncTime: null,
}

export const offlineSlice = createSlice({
  name: "offline",
  initialState,
  reducers: {
    setOfflineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffline = action.payload
    },
    addPendingTransaction: (state, action: PayloadAction<any>) => {
      state.pendingTransactions.push(action.payload)
    },
    removePendingTransaction: (state, action: PayloadAction<string>) => {
      state.pendingTransactions = state.pendingTransactions.filter((txn) => txn.id !== action.payload)
    },
    clearPendingTransactions: (state) => {
      state.pendingTransactions = []
    },
    setLastSyncTime: (state, action: PayloadAction<number>) => {
      state.lastSyncTime = action.payload
    },
  },
})

export const {
  setOfflineStatus,
  addPendingTransaction,
  removePendingTransaction,
  clearPendingTransactions,
  setLastSyncTime,
} = offlineSlice.actions

export const selectOfflineStatus = (state: RootState) => state.offline.isOffline
export const selectPendingTransactions = (state: RootState) => state.offline.pendingTransactions
export const selectLastSyncTime = (state: RootState) => state.offline.lastSyncTime

export default offlineSlice.reducer
