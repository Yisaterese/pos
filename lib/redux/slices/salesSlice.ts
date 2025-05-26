import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

// Sample sales data for charts and reports
const initialSalesData = {
  dailySales: [
    { date: "2023-05-01", sales: 1890.45, orders: 32 },
    { date: "2023-05-02", sales: 1654.32, orders: 28 },
    { date: "2023-05-03", sales: 2100.87, orders: 35 },
    { date: "2023-05-04", sales: 2541.23, orders: 42 },
    { date: "2023-05-05", sales: 2245.65, orders: 38 },
    { date: "2023-05-06", sales: 1987.43, orders: 33 },
    { date: "2023-05-07", sales: 1765.21, orders: 30 },
    { date: "2023-05-08", sales: 2345.67, orders: 39 },
    { date: "2023-05-09", sales: 2567.89, orders: 43 },
    { date: "2023-05-10", sales: 2123.45, orders: 36 },
    { date: "2023-05-11", sales: 1987.65, orders: 33 },
    { date: "2023-05-12", sales: 2345.67, orders: 39 },
    { date: "2023-05-13", sales: 2678.9, orders: 45 },
    { date: "2023-05-14", sales: 2456.78, orders: 41 },
    { date: "2023-05-15", sales: 2345.67, orders: 39 },
    { date: "2023-05-16", sales: 2123.45, orders: 36 },
    { date: "2023-05-17", sales: 1987.65, orders: 33 },
    { date: "2023-05-18", sales: 2345.67, orders: 39 },
    { date: "2023-05-19", sales: 2678.9, orders: 45 },
    { date: "2023-05-20", sales: 2456.78, orders: 41 },
    { date: "2023-05-21", sales: 2345.67, orders: 39 },
    { date: "2023-05-22", sales: 2123.45, orders: 36 },
    { date: "2023-05-23", sales: 1987.65, orders: 33 },
    { date: "2023-05-24", sales: 2345.67, orders: 39 },
    { date: "2023-05-25", sales: 2678.9, orders: 45 },
    { date: "2023-05-26", sales: 2456.78, orders: 41 },
    { date: "2023-05-27", sales: 2345.67, orders: 39 },
    { date: "2023-05-28", sales: 2123.45, orders: 36 },
    { date: "2023-05-29", sales: 1987.65, orders: 33 },
    { date: "2023-05-30", sales: 2345.67, orders: 39 },
  ],
  salesByCategory: [
    { category: "Electronics", sales: 35367.65, percentage: 45 },
    { category: "Clothing", sales: 15718.95, percentage: 20 },
    { category: "Accessories", sales: 11789.21, percentage: 15 },
    { category: "Home Goods", sales: 7859.47, percentage: 10 },
    { category: "Books", sales: 3929.74, percentage: 5 },
    { category: "Other", sales: 3929.74, percentage: 5 },
  ],
  salesByPaymentMethod: [
    { method: "Credit Card", orders: 423, amount: 25329.45, percentage: 56 },
    { method: "Debit Card", orders: 156, amount: 9351.23, percentage: 21 },
    { method: "Cash", orders: 98, amount: 5878.32, percentage: 13 },
    { method: "Mobile Payment", orders: 84, amount: 4672.89, percentage: 10 },
  ],
  hourlyDistribution: [
    { hour: "9AM", sales: 1245.67, orders: 21 },
    { hour: "10AM", sales: 2345.67, orders: 39 },
    { hour: "11AM", sales: 3456.78, orders: 58 },
    { hour: "12PM", sales: 4567.89, orders: 76 },
    { hour: "1PM", sales: 5678.9, orders: 95 },
    { hour: "2PM", sales: 4567.89, orders: 76 },
    { hour: "3PM", sales: 3456.78, orders: 58 },
    { hour: "4PM", sales: 2345.67, orders: 39 },
    { hour: "5PM", sales: 3456.78, orders: 58 },
    { hour: "6PM", sales: 4567.89, orders: 76 },
    { hour: "7PM", sales: 3456.78, orders: 58 },
    { hour: "8PM", sales: 2345.67, orders: 39 },
  ],
  productPerformance: [
    { product: "Wireless Headphones", units: 145, revenue: 13049.55, profit: 5219.82 },
    { product: "Smart Watch", units: 78, revenue: 15599.22, profit: 7799.61 },
    { product: "Bluetooth Speaker", units: 112, revenue: 6718.88, profit: 2687.55 },
    { product: "Leather Wallet", units: 95, revenue: 3277.5, profit: 1638.75 },
    { product: "Cotton T-Shirt", units: 156, revenue: 3118.44, profit: 1559.22 },
  ],
  taxReport: [
    { month: "January", sales: 35000, tax: 2450 },
    { month: "February", sales: 32000, tax: 2240 },
    { month: "March", sales: 38000, tax: 2660 },
    { month: "April", sales: 42000, tax: 2940 },
    { month: "May", sales: 45000, tax: 3150 },
  ],
  employeePerformance: [
    { employee: "John Smith", sales: 12500, transactions: 210, avgSale: 59.52 },
    { employee: "Sarah Johnson", sales: 15600, transactions: 245, avgSale: 63.67 },
    { employee: "Michael Brown", sales: 9800, transactions: 175, avgSale: 56.0 },
    { employee: "Emily Davis", sales: 14300, transactions: 230, avgSale: 62.17 },
    { employee: "David Wilson", sales: 11200, transactions: 195, avgSale: 57.44 },
  ],
}

interface SalesState {
  data: typeof initialSalesData
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: SalesState = {
  data: initialSalesData,
  status: "idle",
  error: null,
}

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    addSale: (state, action: PayloadAction<{ date: string; amount: number; orders: number }>) => {
      const { date, amount, orders } = action.payload
      const existingDayIndex = state.data.dailySales.findIndex((day) => day.date === date)

      if (existingDayIndex !== -1) {
        state.data.dailySales[existingDayIndex].sales += amount
        state.data.dailySales[existingDayIndex].orders += orders
      } else {
        state.data.dailySales.push({ date, sales: amount, orders })
      }
    },
    updateSalesData: (state, action: PayloadAction<typeof initialSalesData>) => {
      state.data = action.payload
    },
  },
})

export const { addSale, updateSalesData } = salesSlice.actions
export default salesSlice.reducer
