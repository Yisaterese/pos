"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CreditCard } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { FilterButton } from "@/components/filter-button"
import { ExportButton } from "@/components/export-button"
import { ConfigureButton } from "@/components/configure-button"

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState("all")

  // Sample transaction data
  const transactions = [
    {
      id: "TRX-001",
      date: "2023-05-01 14:30",
      customer: "Priya",
      method: "Credit Card",
      amount: 89.99,
      status: "Completed",
    },
    {
      id: "TRX-002",
      date: "2023-05-01 15:45",
      customer: "Jane Smith",
      method: "PayPal",
      amount: 124.5,
      status: "Completed",
    },
    {
      id: "TRX-003",
      date: "2023-05-02 09:15",
      customer: "Robert Johnson",
      method: "Cash",
      amount: 45.0,
      status: "Completed",
    },
    {
      id: "TRX-004",
      date: "2023-05-02 11:30",
      customer: "Emily Davis",
      method: "Credit Card",
      amount: 199.99,
      status: "Failed",
    },
    {
      id: "TRX-005",
      date: "2023-05-03 13:20",
      customer: "Michael Wilson",
      method: "Mobile Payment",
      amount: 34.5,
      status: "Pending",
    },
    {
      id: "TRX-006",
      date: "2023-05-03 16:45",
      customer: "Sarah Brown",
      method: "Credit Card",
      amount: 59.99,
      status: "Refunded",
    },
  ]

  const filteredTransactions =
    statusFilter === "all" ? transactions : transactions.filter((t) => t.status.toLowerCase() === statusFilter)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
        <div className="flex items-center gap-2">
          <ExportButton type="transactions" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <SearchBar placeholder="Search transactions..." />
        <Select defaultValue="all" onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
        <FilterButton
          options={[
            { label: "Today", value: "today" },
            { label: "This Week", value: "week" },
            { label: "This Month", value: "month" },
            { label: "Credit Card", value: "credit-card" },
            { label: "Cash", value: "cash" },
          ]}
        />
      </div>

      <Tabs defaultValue="transactions" className="space-y-4 w-full">
        <TabsList className="w-full">
          <TabsTrigger value="transactions" className="flex-1">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="methods" className="flex-1">
            Payment Methods
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4 w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>View and manage payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "Completed"
                              ? "default"
                              : transaction.status === "Pending"
                                ? "warning"
                                : transaction.status === "Failed"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4 w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure available payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 w-full">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-8 w-8" />
                    <div>
                      <p className="text-sm font-medium leading-none">Credit/Debit Cards</p>
                      <p className="text-sm text-muted-foreground">Accept Visa, Mastercard, Amex</p>
                    </div>
                  </div>
                  <ConfigureButton
                    title="Credit Card Configuration"
                    description="Configure your credit card payment processor"
                    fields={[
                      { id: "api-key", label: "API Key", type: "password" },
                      { id: "merchant-id", label: "Merchant ID" },
                      { id: "webhook", label: "Webhook URL" },
                    ]}
                  />
                </div>

                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">P</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">PayPal</p>
                      <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                    </div>
                  </div>
                  <ConfigureButton
                    title="PayPal Configuration"
                    description="Configure your PayPal integration"
                    fields={[
                      { id: "client-id", label: "Client ID" },
                      { id: "secret", label: "Secret Key", type: "password" },
                      { id: "environment", label: "Environment" },
                    ]}
                  />
                </div>

                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                      <span className="text-green-600 dark:text-green-300 font-bold">$</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">Cash</p>
                      <p className="text-sm text-muted-foreground">Accept cash payments</p>
                    </div>
                  </div>
                  <ConfigureButton
                    title="Cash Configuration"
                    description="Configure your cash payment settings"
                    fields={[
                      { id: "drawer-id", label: "Cash Drawer ID" },
                      { id: "require-approval", label: "Require Approval For" },
                      { id: "default-change", label: "Default Change Amount" },
                    ]}
                  />
                </div>

                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                      <span className="text-purple-600 dark:text-purple-300 font-bold">M</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">Mobile Payments</p>
                      <p className="text-sm text-muted-foreground">Accept Apple Pay, Google Pay</p>
                    </div>
                  </div>
                  <ConfigureButton
                    title="Mobile Payment Configuration"
                    description="Configure mobile payment options"
                    fields={[
                      { id: "apple-merchant", label: "Apple Merchant ID" },
                      { id: "google-merchant", label: "Google Merchant ID" },
                      { id: "supported-methods", label: "Supported Methods" },
                    ]}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure payment processing settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Currency</h3>
                <Select defaultValue="usd">
                  <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD - US Dollar</SelectItem>
                    <SelectItem value="eur">EUR - Euro</SelectItem>
                    <SelectItem value="gbp">GBP - British Pound</SelectItem>
                    <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Tax Rate</h3>
                <div className="flex items-center space-x-2">
                  <Input type="number" placeholder="7.5" className="max-w-[100px]" defaultValue="7.5" />
                  <span>%</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Receipt Settings</h3>
                <div className="space-y-2 w-full">
                  <div className="flex items-center space-x-2">
                    <Input placeholder="Business Name" defaultValue="Etiraj Store" className="w-full md:w-[400px]" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Address Line 1"
                      defaultValue="123 Main Street"
                      className="w-full md:w-[400px]"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input placeholder="Address Line 2" defaultValue="Suite 101" className="w-full md:w-[400px]" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Phone Number"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full md:w-[400px]"
                    />
                  </div>
                </div>
              </div>

              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
