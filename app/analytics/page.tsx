"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExportButton } from "@/components/export-button"
import { useAppSelector } from "@/lib/redux/hooks"
import { useToast } from "@/components/ui/use-toast"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { MobileHeader } from "@/components/mobile-header"
import { PageTransition } from "@/components/page-transition"

// Mock data to ensure we have fallback data if Redux state is not available
const mockSalesData = {
  dailySales: Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}/5`,
    sales: Math.floor(Math.random() * 5000) + 1000,
  })),
  salesByPaymentMethod: [
    { method: "Credit Card", amount: 45000 },
    { method: "Cash", amount: 25000 },
    { method: "UPI", amount: 15000 },
    { method: "Bank Transfer", amount: 10000 },
  ],
  hourlyDistribution: Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    sales: Math.floor(Math.random() * 2000) + 500,
    orders: Math.floor(Math.random() * 20) + 5,
  })),
  productPerformance: [
    { product: "Smartphones", revenue: 25000, profit: 10000 },
    { product: "Laptops", revenue: 35000, profit: 15000 },
    { product: "Accessories", revenue: 15000, profit: 7500 },
    { product: "Tablets", revenue: 10000, profit: 4000 },
    { product: "Wearables", revenue: 8000, profit: 3500 },
  ],
  salesByCategory: [
    { category: "Electronics", sales: 45000 },
    { category: "Clothing", sales: 25000 },
    { category: "Home", sales: 15000 },
    { category: "Books", sales: 10000 },
    { category: "Other", sales: 5000 },
  ],
}

export default function AnalyticsPage() {
  const { toast } = useToast()
  const [timeRange, setTimeRange] = useState("30")

  // Get data from Redux with fallback to mock data
  const reduxSalesData = useAppSelector((state) => state.sales.data)
  const salesData = reduxSalesData || mockSalesData

  // Colors for charts - using simple hex values to avoid any potential loading issues
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  const handleExport = () => {
    toast({
      title: "Analytics Exported",
      description: `The analytics data has been exported successfully.`,
    })
  }

  return (
    <PageTransition>
      <MobileHeader title="Analytics" />
      <div className="flex flex-col w-full max-w-full p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between w-full mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <div className="flex items-center gap-2">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <ExportButton type="analytics" />
          </div>
        </div>

        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="sales" className="flex-1">
              Sales
            </TabsTrigger>
            <TabsTrigger value="products" className="flex-1">
              Products
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex-1">
              Customers
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex-1">
              Inventory
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6">
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last period</p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$59.42</div>
                  <p className="text-xs text-muted-foreground">+2.4% from last period</p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24.8%</div>
                  <p className="text-xs text-muted-foreground">+1.2% from last period</p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">761</div>
                  <p className="text-xs text-muted-foreground">+18.7% from last period</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 w-full mb-6">
              <Card className="w-full lg:col-span-4">
                <CardHeader>
                  <CardTitle>Sales Over Time</CardTitle>
                  <CardDescription>Daily sales for the selected period</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={salesData.dailySales.slice(0, Number.parseInt(timeRange))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="w-full lg:col-span-3">
                <CardHeader>
                  <CardTitle>Sales by Payment Method</CardTitle>
                  <CardDescription>Distribution of sales by payment type</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesData.salesByPaymentMethod}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                        nameKey="method"
                        isAnimationActive={false}
                      >
                        {salesData.salesByPaymentMethod.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="w-full mb-6">
              <CardHeader>
                <CardTitle>Sales by Time of Day</CardTitle>
                <CardDescription>Hourly sales distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData.hourlyDistribution}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    barSize={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" name="Sales ($)" fill="#8884d8" isAnimationActive={false} />
                    <Bar dataKey="orders" name="Orders" fill="#82ca9d" isAnimationActive={false} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6">
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Selling Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Wireless Headphones</div>
                  <p className="text-xs text-muted-foreground">342 units sold</p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Most Profitable Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Smart Watch</div>
                  <p className="text-xs text-muted-foreground">$12,450 profit</p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">Requires attention</p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Out of Stock Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Requires immediate action</p>
                </CardContent>
              </Card>
            </div>

            <Card className="w-full mb-6">
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Sales by product category</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData.productPerformance}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    barSize={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="product" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#8884d8" isAnimationActive={false} />
                    <Bar dataKey="profit" name="Profit" fill="#82ca9d" isAnimationActive={false} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="w-full mb-6">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Distribution of sales across product categories</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesData.salesByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="sales"
                      nameKey="category"
                      isAnimationActive={false}
                    >
                      {salesData.salesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6">
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,245</div>
                  <p className="text-xs text-muted-foreground">+85 new this period</p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Returning Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-xs text-muted-foreground">+2.3% from last period</p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customer Lifetime Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$485</div>
                  <p className="text-xs text-muted-foreground">+$12 from last period</p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Customer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">John Doe</div>
                  <p className="text-xs text-muted-foreground">$1,245 spent</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full mb-6">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Customer Demographics</CardTitle>
                  <CardDescription>Age and location distribution</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "18-24", value: 15 },
                          { name: "25-34", value: 35 },
                          { name: "35-44", value: 25 },
                          { name: "45-54", value: 15 },
                          { name: "55+", value: 10 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        isAnimationActive={false}
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Customer Acquisition</CardTitle>
                  <CardDescription>New customers over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { month: "Jan", customers: 45 },
                        { month: "Feb", customers: 52 },
                        { month: "Mar", customers: 48 },
                        { month: "Apr", customers: 61 },
                        { month: "May", customers: 85 },
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="customers"
                        stroke="#8884d8"
                        fill="#8884d8"
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6">
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$124,500</div>
                  <p className="text-xs text-muted-foreground">1,432 products</p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Inventory Turnover</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2x</div>
                  <p className="text-xs text-muted-foreground">Per year</p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Stock Holding Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3,450</div>
                  <p className="text-xs text-muted-foreground">Per month</p>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Restock Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Items to reorder</p>
                </CardContent>
              </Card>
            </div>

            <Card className="w-full mb-6">
              <CardHeader>
                <CardTitle>Inventory Levels by Category</CardTitle>
                <CardDescription>Current stock distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { category: "Electronics", stock: 245, value: 35000 },
                      { category: "Clothing", stock: 320, value: 18000 },
                      { category: "Accessories", stock: 180, value: 12000 },
                      { category: "Home Goods", stock: 150, value: 9000 },
                      { category: "Books", stock: 210, value: 5000 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    barSize={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="stock"
                      name="Units in Stock"
                      fill="#8884d8"
                      isAnimationActive={false}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="value"
                      name="Inventory Value ($)"
                      fill="#82ca9d"
                      isAnimationActive={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}
