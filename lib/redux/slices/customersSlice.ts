import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

// Sample customer data with Indian names
const initialCustomers = [
  {
    id: "1",
    firstName: "Rajesh",
    lastName: "Sharma",
    email: "rajesh.sharma@example.com",
    phone: "+91 98765 43210",
    address: "123 MG Road, Bangalore, Karnataka",
    joinDate: "2023-01-15",
    totalSpent: 12450.67,
    lastPurchase: "2023-04-28",
    loyaltyPoints: 250,
  },
  {
    id: "2",
    firstName: "Priya",
    lastName: "Patel",
    email: "priya.patel@example.com",
    phone: "+91 87654 32109",
    address: "456 Anna Salai, Chennai, Tamil Nadu",
    joinDate: "2023-02-20",
    totalSpent: 8765.54,
    lastPurchase: "2023-05-01",
    loyaltyPoints: 175,
  },
  {
    id: "3",
    firstName: "Amit",
    lastName: "Singh",
    email: "amit.singh@example.com",
    phone: "+91 76543 21098",
    address: "789 Linking Road, Mumbai, Maharashtra",
    joinDate: "2023-03-10",
    totalSpent: 5432.21,
    lastPurchase: "2023-04-15",
    loyaltyPoints: 110,
  },
  {
    id: "4",
    firstName: "Sneha",
    lastName: "Gupta",
    email: "sneha.gupta@example.com",
    phone: "+91 65432 10987",
    address: "321 Park Street, Kolkata, West Bengal",
    joinDate: "2023-03-25",
    totalSpent: 9876.65,
    lastPurchase: "2023-04-30",
    loyaltyPoints: 200,
  },
  {
    id: "5",
    firstName: "Vikram",
    lastName: "Reddy",
    email: "vikram.reddy@example.com",
    phone: "+91 54321 09876",
    address: "654 Jubilee Hills, Hyderabad, Telangana",
    joinDate: "2023-04-05",
    totalSpent: 4321.1,
    lastPurchase: "2023-05-02",
    loyaltyPoints: 85,
  },
]

export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  joinDate: string
  totalSpent: number
  lastPurchase: string
  loyaltyPoints: number
}

export interface Purchase {
  id: string
  customerId: string
  date: string
  items: {
    productId: string
    productName: string
    quantity: number
    price: number
  }[]
  total: number
  paymentMethod: string
}

interface CustomersState {
  items: Customer[]
  purchases: Purchase[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

// Sample purchase history with Indian products
const initialPurchases: Purchase[] = [
  {
    id: "P001",
    customerId: "4",
    date: "2023-04-30",
    items: [
      { productId: "1", productName: "Masala Chai Tea", quantity: 1, price: 120 },
      { productId: "3", productName: "Bluetooth Speaker", quantity: 1, price: 1299 },
    ],
    total: 1419,
    paymentMethod: "Credit Card",
  },
  {
    id: "P002",
    customerId: "4",
    date: "2023-04-15",
    items: [{ productId: "2", productName: "Smart Fitness Band", quantity: 1, price: 2499 }],
    total: 2499,
    paymentMethod: "UPI",
  },
  {
    id: "P003",
    customerId: "4",
    date: "2023-03-22",
    items: [
      { productId: "4", productName: "Handcrafted Leather Wallet", quantity: 1, price: 899 },
      { productId: "5", productName: "Cotton Kurta", quantity: 2, price: 1598 },
    ],
    total: 2497,
    paymentMethod: "Cash",
  },
  {
    id: "P004",
    customerId: "1",
    date: "2023-04-28",
    items: [
      { productId: "2", productName: "Smart Fitness Band", quantity: 1, price: 2499 },
      { productId: "1", productName: "Masala Chai Tea", quantity: 2, price: 240 },
    ],
    total: 2739,
    paymentMethod: "Credit Card",
  },
]

const initialState: CustomersState = {
  items: initialCustomers,
  purchases: initialPurchases,
  status: "idle",
  error: null,
}

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.items.push(action.payload)
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.items.findIndex((customer) => customer.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((customer) => customer.id !== action.payload)
    },
    addPurchase: (state, action: PayloadAction<Purchase>) => {
      state.purchases.push(action.payload)

      // Update customer total spent and last purchase date
      const customer = state.items.find((c) => c.id === action.payload.customerId)
      if (customer) {
        customer.totalSpent += action.payload.total
        customer.lastPurchase = action.payload.date
        customer.loyaltyPoints += Math.floor(action.payload.total / 100) // 1 point per ₹100 spent
      }
    },
  },
})

export const { addCustomer, updateCustomer, deleteCustomer, addPurchase } = customersSlice.actions
export default customersSlice.reducer
