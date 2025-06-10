"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { FilterButton } from "@/components/filter-button";
import { ExportButton } from "@/components/export-button";
import { ConfigureButton } from "@/components/configure-button";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { selectPendingTransactions, removePendingTransaction } from "@/lib/redux/slices/offlineSlice";

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample static transactions (could be fetched from an API in a real app)
  const staticTransactions = [
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
  ];

  // Fetch pending transactions from Redux
  const pendingTransactions = useAppSelector(selectPendingTransactions);
  const dispatch = useAppDispatch();

  // Combine static and pending transactions
  const allTransactions = [...staticTransactions, ...pendingTransactions];

  const filteredTransactions = statusFilter === "all"
      ? allTransactions
      : allTransactions.filter((t) => t.status.toLowerCase() === statusFilter);

  // Function to handle removing a pending transaction
  const handleRemoveTransaction = (id: string) => {
    dispatch(removePendingTransaction(id));
  };

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
                      <TableHead>Action</TableHead> {/* New column for pending transactions */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{transaction.date || "N/A"}</TableCell>
                          <TableCell>{transaction.customer || "N/A"}</TableCell>
                          <TableCell>{transaction.method || "N/A"}</TableCell>
                          <TableCell className="text-right">
                            ${transaction.amount?.toFixed(2) || "0.00"}
                          </TableCell>
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
                          <TableCell>
                            {pendingTransactions.some((t: { id: any; }) => t.id === transaction.id) && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleRemoveTransaction(transaction.id)}
                                >
                                  Remove
                                </Button>
                            )}
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="methods" className="space-y-4 w-full">
            {/* Unchanged payment methods tab */}
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
                  {/* Other payment methods remain unchanged */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 w-full">
            {/* Unchanged settings tab */}
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
                {/* Other settings remain unchanged */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
}