import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

// Sample product data with Indian products
export const initialProducts = [
  {
    id: "1",
    name: "Masala Chai Tea",
    category: "Food",
    price: 120,
    stock: 45,
    sku: "MCT-001",
    barcode: "890123456789",
    image: "",
    description: "Premium blend of Indian spices and Assam tea leaves",
    costPrice: 60,
    supplier: "Himalayan Tea Exports",
    reorderPoint: 10,
    lastUpdated: "2023-05-01",
  },
  {
    id: "2",
    name: "Smart Fitness Band",
    category: "Electronics",
    price: 2499,
    stock: 28,
    sku: "SFB-002",
    barcode: "890123456790",
    image: "",
    description: "Water-resistant fitness tracker with heart rate monitor",
    costPrice: 1200,
    supplier: "TechIndia Solutions",
    reorderPoint: 5,
    lastUpdated: "2023-05-02",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 1299,
    stock: 32,
    sku: "BS-003",
    barcode: "890123456791",
    image: "",
    description: "Portable Bluetooth speaker with 10-hour battery life",
    costPrice: 700,
    supplier: "SoundWave Electronics",
    reorderPoint: 8,
    lastUpdated: "2023-05-03",
  },
  {
    id: "4",
    name: "Handcrafted Leather Wallet",
    category: "Accessories",
    price: 899,
    stock: 65,
    sku: "HLW-004",
    barcode: "890123456792",
    image: "",
    description: "Genuine leather wallet handcrafted by artisans from Rajasthan",
    costPrice: 450,
    supplier: "Rajasthan Handicrafts",
    reorderPoint: 15,
    lastUpdated: "2023-05-04",
  },
  {
    id: "5",
    name: "Cotton Kurta",
    category: "Clothing",
    price: 799,
    stock: 120,
    sku: "CK-005",
    barcode: "890123456793",
    image: "",
    description: "100% cotton traditional kurta, available in multiple colors",
    costPrice: 350,
    supplier: "Fabindia Wholesale",
    reorderPoint: 20,
    lastUpdated: "2023-05-05",
  },
  {
    id: "6",
    name: "Basmati Rice (5kg)",
    category: "Food",
    price: 450,
    stock: 85,
    sku: "BR-006",
    barcode: "890123456794",
    image: "",
    description: "Premium long-grain basmati rice from Punjab",
    costPrice: 280,
    supplier: "Punjab Agro Foods",
    reorderPoint: 15,
    lastUpdated: "2023-05-06",
  },
  {
    id: "7",
    name: "Copper Water Bottle",
    category: "Accessories",
    price: 349,
    stock: 55,
    sku: "CWB-007",
    barcode: "890123456795",
    image: "",
    description: "Ayurvedic copper water bottle for health benefits",
    costPrice: 180,
    supplier: "Ayush Products",
    reorderPoint: 10,
    lastUpdated: "2023-05-07",
  },
  {
    id: "8",
    name: "Yoga Mat",
    category: "Sports",
    price: 599,
    stock: 40,
    sku: "YM-008",
    barcode: "890123456796",
    image: "",
    description: "Non-slip eco-friendly yoga mat",
    costPrice: 300,
    supplier: "Fitness India",
    reorderPoint: 8,
    lastUpdated: "2023-05-08",
  },
]

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
