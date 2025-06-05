import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartState {
  items: CartItem[]
  total: number
  tax: number
  taxRate: number
  discount: number
  customer: {
    id: string
    name: string
  } | null
}

const initialState: CartState = {
  items: [],
  total: 0,
  tax: 0,
  taxRate: 0.08, // 7% tax rate
  discount: 0,
  customer: null,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }

      // Recalculate totals
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      state.total = subtotal
      state.tax = subtotal * state.taxRate
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)

      // Recalculate totals
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      state.total = subtotal
      state.tax = subtotal * state.taxRate
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload
      const item = state.items.find((item) => item.id === id)

      if (item) {
        item.quantity = quantity
      }

      // Recalculate totals
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      state.total = subtotal
      state.tax = subtotal * state.taxRate
    },
    setCustomer: (state, action: PayloadAction<{ id: string; name: string } | null>) => {
      state.customer = action.payload
    },
    applyDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.tax = 0
      state.discount = 0
      state.customer = null
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, setCustomer, applyDiscount, clearCart } = cartSlice.actions

export default cartSlice.reducer
