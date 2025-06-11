import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import {initialProducts} from "@/utils/data/data";



export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  sku: string
  barcode: string
  image: string
  description: string
  costPrice: number
  supplier: string
  reorderPoint: number
  lastUpdated: string
}

interface ProductsState {
  items: Product[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: ProductsState = {
  items: initialProducts,
  status: "idle",
  error: null,
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload)
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((product) => product.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((product) => product.id !== action.payload)
    },
    updateStock: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload
      const product = state.items.find((p) => p.id === id)
      if (product) {
        product.stock += quantity
      }
    },
  },
})

export const { addProduct, updateProduct, deleteProduct, updateStock } = productsSlice.actions
export default productsSlice.reducer
