"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Eye, Filter } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { FadeIn, SlideIn } from "@/components/animations"
import { SearchBar } from "@/components/search-bar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"

export default function CustomerPurchasesPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()

  // This would normally fetch the customer based on the ID
  const customer = {
    id: params.id,
    name: "John Doe",
    email: "john.doe@example.com",
    totalSpent: 1245.89,
    orders: 12,
  }

  const handleExport = () => {
    toast({
      title: "Export initiated",
      description: `Exporting purchase history for ${customer.name}...`,
    })
  }

  return (
    <FadeIn className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href={`/customers/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Purchase History</h2>
            <p className="text-muted-foreground">
              {customer.name} • {customer.orders} orders • ${customer.totalSpent.toFixed(2)} total spent
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <SlideIn direction="left" className="w-full md:w-64 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Date Range</h3>
                <DatePickerWithRange className="w-full" />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Status</h3>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Payment Method</h3>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Orders</span>
                  <span className="font-medium">{customer.orders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Spent</span>
                  <span className="font-medium">${customer.totalSpent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Average Order Value</span>
                  <span className="font-medium">${(customer.totalSpent / customer.orders).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">First Purchase</span>
                  <span className="font-medium">Jan 15, 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Purchase</span>
                  <span className="font-medium">May 1, 2023</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideIn>

        <SlideIn direction="right" delay={0.1} className="flex-1 space-y-4">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Order History</CardTitle>
                <CardDescription>All orders placed by this customer</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <SearchBar placeholder="Search orders..." />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "ORD-001",
                      date: "May 1, 2023",
                      items: 2,
                      status: "Delivered",
                      total: 179.98,
                    },
                    {
                      id: "ORD-002",
                      date: "April 15, 2023",
                      items: 1,
                      status: "Delivered",
                      total: 89.99,
                    },
                    {
                      id: "ORD-003",
                      date: "March 22, 2023",
                      items: 3,
                      status: "Delivered",
                      total: 269.97,
                    },
                    {
                      id: "ORD-004",
                      date: "February 10, 2023",
                      items: 2,
                      status: "Delivered",
                      total: 124.5,
                    },
                    {
                      id: "ORD-005",
                      date: "January 28, 2023",
                      items: 4,
                      status: "Delivered",
                      total: 345.75,
                    },
                    {
                      id: "ORD-006",
                      date: "January 15, 2023",
                      items: 1,
                      status: "Delivered",
                      total: 235.7,
                    },
                  ].map((order) => (
                    <TableRow key={order.id} className="animate-fadeIn">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/orders/${order.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Purchase Trends</CardTitle>
              <CardDescription>Analysis of customer purchasing patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Most Purchased Categories</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Electronics</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Accessories</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Home & Kitchen</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Other</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Purchase Frequency</h3>
                  <div className="flex items-center justify-center h-[200px]">
                    <div className="text-center">
                      <div className="text-3xl font-bold">Monthly</div>
                      <p className="text-sm text-muted-foreground">Average purchase frequency</p>
                      <p className="text-sm text-muted-foreground mt-2">Last purchase: 7 days ago</p>
                      <p className="text-sm text-muted-foreground">Next predicted purchase: ~23 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideIn>
      </div>
    </FadeIn>
  )
}
