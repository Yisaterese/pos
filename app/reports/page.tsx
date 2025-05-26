"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Filter, Printer } from "lucide-react"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
} from "recharts"

export default function ReportsPage() {
  const { toast } = useToast()
  const [activeReport, setActiveReport] = useState("sales")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [dateRange, setDateRange] = useState({ from: null, to: null })

  const salesData = useAppSelector((state) => state.sales.data)

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  const handleExport = () => {
    toast({
      title: "Report Exported",
      description: `The ${activeReport} report has been exported successfully.`,
    })
  }

  const handlePrint = () => {
    toast({
      title: "Printing Report",
      description: `The ${activeReport} report is being sent to the printer.`,
    })
  }

  const handleReportTypeChange = (type: string) => {
    setActiveReport(type)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleExport}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Card className="w-full md:w-64 flex-shrink-0">
          <CardHeader>
            <CardTitle>Report Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant={activeReport === "sales" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => handleReportTypeChange("sales")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Sales Summary
            </Button>
            <Button
              variant={activeReport === "inventory" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => handleReportTypeChange("inventory")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Inventory Status
            </Button>
            <Button
              variant={activeReport === "products" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => handleReportTypeChange("products")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Product Performance
            </Button>
            <Button
              variant={activeReport === "customers" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => handleReportTypeChange("customers")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Customer Analysis
            </Button>
            <Button
              variant={activeReport === "tax" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => handleReportTypeChange("tax")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Tax Report
            </Button>
            <Button
              variant={activeReport === "employees" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => handleReportTypeChange("employees")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Employee Performance
            </Button>
          </CardContent>
        </Card>

        <div className="flex-1 space-y-4 w-full">
          {activeReport === "sales" && (
            <Card>
              <CardHeader>
                <CardTitle>Sales Summary Report</CardTitle>
                <CardDescription>View and export sales data for the selected period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <DatePickerWithRange className="w-full" />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all" value={paymentFilter} onValueChange={setPaymentFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Payment Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Methods</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="mobile">Mobile Payment</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="summary" className="flex-1">
                      Summary
                    </TabsTrigger>
                    <TabsTrigger value="daily" className="flex-1">
                      Daily
                    </TabsTrigger>
                    <TabsTrigger value="products" className="flex-1">
                      By Product
                    </TabsTrigger>
                    <TabsTrigger value="payment" className="flex-1">
                      By Payment
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="summary">
                    <Card>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-muted rounded-lg p-4">
                            <div className="text-sm font-medium text-muted-foreground">Total Sales</div>
                            <div className="text-2xl font-bold">$45,231.89</div>
                          </div>
                          <div className="bg-muted rounded-lg p-4">
                            <div className="text-sm font-medium text-muted-foreground">Total Orders</div>
                            <div className="text-2xl font-bold">761</div>
                          </div>
                          <div className="bg-muted rounded-lg p-4">
                            <div className="text-sm font-medium text-muted-foreground">Average Order Value</div>
                            <div className="text-2xl font-bold">$59.42</div>
                          </div>
                        </div>

                        <div className="mt-6 h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={salesData.dailySales.slice(-30)}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                              <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="daily">
                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Orders</TableHead>
                              <TableHead>Sales</TableHead>
                              <TableHead>Average Order</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {salesData.dailySales.slice(-5).map((day) => (
                              <TableRow key={day.date}>
                                <TableCell>{day.date}</TableCell>
                                <TableCell>{day.orders}</TableCell>
                                <TableCell>${day.sales.toFixed(2)}</TableCell>
                                <TableCell>${(day.sales / day.orders).toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="products">
                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead>Units Sold</TableHead>
                              <TableHead>Revenue</TableHead>
                              <TableHead>Profit</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {salesData.productPerformance.map((product) => (
                              <TableRow key={product.product}>
                                <TableCell>{product.product}</TableCell>
                                <TableCell>{product.units}</TableCell>
                                <TableCell>${product.revenue.toFixed(2)}</TableCell>
                                <TableCell>${product.profit.toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="payment">
                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Payment Method</TableHead>
                              <TableHead>Orders</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Percentage</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {salesData.salesByPaymentMethod.map((method) => (
                              <TableRow key={method.method}>
                                <TableCell>{method.method}</TableCell>
                                <TableCell>{method.orders}</TableCell>
                                <TableCell>${method.amount.toFixed(2)}</TableCell>
                                <TableCell>{method.percentage}%</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        <div className="p-6 h-[300px]">
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
                              >
                                {salesData.salesByPaymentMethod.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {activeReport === "inventory" && (
            <Card>
              <CardHeader>
                <CardTitle>Inventory Status Report</CardTitle>
                <CardDescription>Current inventory levels and stock status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground">Total Items</div>
                    <div className="text-2xl font-bold">1,432</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground">Low Stock Items</div>
                    <div className="text-2xl font-bold text-amber-500">8</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground">Out of Stock</div>
                    <div className="text-2xl font-bold text-red-500">3</div>
                  </div>
                </div>

                <div className="h-[300px] mt-6">
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
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="stock" name="Units in Stock" fill="#8884d8" />
                      <Bar yAxisId="right" dataKey="value" name="Inventory Value ($)" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Average Stock</TableHead>
                      <TableHead>Total Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Electronics</TableCell>
                      <TableCell>245</TableCell>
                      <TableCell>32</TableCell>
                      <TableCell>$35,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Clothing</TableCell>
                      <TableCell>320</TableCell>
                      <TableCell>45</TableCell>
                      <TableCell>$18,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Accessories</TableCell>
                      <TableCell>180</TableCell>
                      <TableCell>28</TableCell>
                      <TableCell>$12,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Home Goods</TableCell>
                      <TableCell>150</TableCell>
                      <TableCell>25</TableCell>
                      <TableCell>$9,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Books</TableCell>
                      <TableCell>210</TableCell>
                      <TableCell>35</TableCell>
                      <TableCell>$5,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeReport === "products" && (
            <Card>
              <CardHeader>
                <CardTitle>Product Performance Report</CardTitle>
                <CardDescription>Sales and profitability by product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData.productPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="product" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
                      <Bar dataKey="profit" name="Profit" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Units Sold</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Profit Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesData.productPerformance.map((product) => (
                      <TableRow key={product.product}>
                        <TableCell>{product.product}</TableCell>
                        <TableCell>{product.units}</TableCell>
                        <TableCell>${product.revenue.toFixed(2)}</TableCell>
                        <TableCell>${product.profit.toFixed(2)}</TableCell>
                        <TableCell>{((product.profit / product.revenue) * 100).toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeReport === "customers" && (
            <Card>
              <CardHeader>
                <CardTitle>Customer Analysis Report</CardTitle>
                <CardDescription>Customer demographics and purchasing behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground">Total Customers</div>
                    <div className="text-2xl font-bold">1,245</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground">Returning Customers</div>
                    <div className="text-2xl font-bold">68%</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground">Average Lifetime Value</div>
                    <div className="text-2xl font-bold">$485</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "New", value: 32 },
                            { name: "Returning", value: 68 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill="#8884d8" />
                          <Cell fill="#82ca9d" />
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                    <p className="text-center text-sm text-muted-foreground mt-2">Customer Type</p>
                  </div>

                  <div className="h-[300px]">
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
                        >
                          {COLORS.map((color, index) => (
                            <Cell key={`cell-${index}`} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                    <p className="text-center text-sm text-muted-foreground mt-2">Age Distribution</p>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Average Order</TableHead>
                      <TableHead>Last Purchase</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>$1,245.67</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>$103.81</TableCell>
                      <TableCell>2023-04-28</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>$876.54</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>$109.57</TableCell>
                      <TableCell>2023-05-01</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Robert Johnson</TableCell>
                      <TableCell>$543.21</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>$108.64</TableCell>
                      <TableCell>2023-04-15</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Emily Davis</TableCell>
                      <TableCell>$987.65</TableCell>
                      <TableCell>9</TableCell>
                      <TableCell>$109.74</TableCell>
                      <TableCell>2023-04-30</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Michael Wilson</TableCell>
                      <TableCell>$432.10</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>$108.03</TableCell>
                      <TableCell>2023-05-02</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeReport === "tax" && (
            <Card>
              <CardHeader>
                <CardTitle>Tax Report</CardTitle>
                <CardDescription>Sales tax collected and tax liability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground">Total Tax Collected</div>
                    <div className="text-2xl font-bold">$3,166.23</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground">Current Tax Rate</div>
                    <div className="text-2xl font-bold">7.5%</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground">Taxable Sales</div>
                    <div className="text-2xl font-bold">$42,216.40</div>
                  </div>
                </div>

                <div className="h-[300px] mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData.taxReport} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="sales" name="Sales" fill="#8884d8" />
                      <Bar yAxisId="right" dataKey="tax" name="Tax" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Taxable Sales</TableHead>
                      <TableHead>Tax Rate</TableHead>
                      <TableHead>Tax Collected</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesData.taxReport.map((month) => (
                      <TableRow key={month.month}>
                        <TableCell>{month.month}</TableCell>
                        <TableCell>${month.sales.toFixed(2)}</TableCell>
                        <TableCell>7.0%</TableCell>
                        <TableCell>${month.tax.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeReport === "employees" && (
            <Card>
              <CardHeader>
                <CardTitle>Employee Performance Report</CardTitle>
                <CardDescription>Sales performance by employee</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData.employeePerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="employee" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" name="Sales ($)" fill="#8884d8" />
                      <Bar dataKey="transactions" name="Transactions" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Transactions</TableHead>
                      <TableHead>Avg. Sale</TableHead>
                      <TableHead>Conversion Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesData.employeePerformance.map((employee) => (
                      <TableRow key={employee.employee}>
                        <TableCell>{employee.employee}</TableCell>
                        <TableCell>${employee.sales.toFixed(2)}</TableCell>
                        <TableCell>{employee.transactions}</TableCell>
                        <TableCell>${employee.avgSale.toFixed(2)}</TableCell>
                        <TableCell>{Math.floor(Math.random() * 10) + 20}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
