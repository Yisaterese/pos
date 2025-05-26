"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, UserPlus, WifiOff } from "lucide-react"
import Link from "next/link"
import { SearchBar } from "@/components/search-bar"
import { FilterButton } from "@/components/filter-button"
import { ExportButton } from "@/components/export-button"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MobileHeader } from "@/components/mobile-header"
import { PageTransition } from "@/components/page-transition"
import { useOffline } from "@/hooks/use-offline"
import { OfflineIndicator } from "@/components/offline-indicator"
import { getCachedCustomers, cacheCustomersForOffline, saveOfflineTransaction } from "@/lib/offline-storage"
import { useAppDispatch } from "@/lib/redux/hooks"
import { addPendingTransaction } from "@/lib/redux/slices/offlineSlice"

export default function CustomersPage() {
  const { isOffline } = useOffline()
  const dispatch = useAppDispatch()
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      orders: 12,
      spent: 1245.89,
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      orders: 8,
      spent: 876.5,
      status: "Active",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      phone: "+1 (555) 456-7890",
      orders: 5,
      spent: 432.25,
      status: "Inactive",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 234-5678",
      orders: 15,
      spent: 1567.75,
      status: "Active",
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      phone: "+1 (555) 876-5432",
      orders: 3,
      spent: 289.99,
      status: "Active",
    },
    {
      id: 6,
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
      phone: "+1 (555) 345-6789",
      orders: 7,
      spent: 654.3,
      status: "Active",
    },
    {
      id: 7,
      name: "David Miller",
      email: "david.miller@example.com",
      phone: "+1 (555) 567-8901",
      orders: 0,
      spent: 0,
      status: "Inactive",
    },
  ])

  // Load cached customers when offline
  useEffect(() => {
    const loadCachedCustomers = async () => {
      if (isOffline) {
        const cachedCustomers = await getCachedCustomers()
        if (cachedCustomers && cachedCustomers.length > 0) {
          setCustomers(cachedCustomers)
        }
      }
    }

    loadCachedCustomers()
  }, [isOffline])

  // Cache customers for offline use
  useEffect(() => {
    const cacheCustomers = async () => {
      if (!isOffline && customers.length > 0) {
        await cacheCustomersForOffline(customers)
      }
    }

    cacheCustomers()
  }, [customers, isOffline])

  const [addCustomerOpen, setAddCustomerOpen] = useState(false)
  const { toast } = useToast()

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const newCustomer = {
      id: customers.length + 1,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      orders: 0,
      spent: 0,
      status: "Active",
    }

    try {
      if (isOffline) {
        // Save customer for offline sync
        const offlineTransaction = await saveOfflineTransaction({
          type: "customer",
          data: { action: "add", customer: newCustomer },
        })

        // Add to Redux store
        dispatch(addPendingTransaction(offlineTransaction))

        toast({
          title: "Customer added offline",
          description: `${newCustomer.name} has been added to your customer database. This will be synchronized when you're back online.`,
        })
      } else {
        // In a real app, this would be an API call
        // For now, we'll just update the local state
        toast({
          title: "Customer added",
          description: `${newCustomer.name} has been added to your customer database.`,
        })
      }

      // Update local state
      setCustomers([...customers, newCustomer])
      setAddCustomerOpen(false)
    } catch (error) {
      console.error("Error adding customer:", error)
      toast({
        title: "Error",
        description: "There was an error adding the customer. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCustomer = async (id: number) => {
    const customerToDelete = customers.find((c) => c.id === id)

    if (!customerToDelete) return

    try {
      if (isOffline) {
        // Save deletion for offline sync
        const offlineTransaction = await saveOfflineTransaction({
          type: "customer",
          data: { action: "delete", customerId: id },
        })

        // Add to Redux store
        dispatch(addPendingTransaction(offlineTransaction))

        toast({
          title: "Customer deleted offline",
          description: `${customerToDelete.name} has been removed from your customer database. This will be synchronized when you're back online.`,
          variant: "destructive",
        })
      } else {
        // In a real app, this would be an API call
        toast({
          title: "Customer deleted",
          description: `${customerToDelete.name} has been removed from your customer database.`,
          variant: "destructive",
        })
      }

      // Update local state
      setCustomers(customers.filter((c) => c.id !== id))
    } catch (error) {
      console.error("Error deleting customer:", error)
      toast({
        title: "Error",
        description: "There was an error deleting the customer. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <PageTransition>
      <MobileHeader title="Customers" />
      <div className="flex flex-col w-full max-w-full p-4 md:p-8 pt-6">
        {isOffline && (
          <div className="bg-warning/20 p-2 text-center mb-4">
            <div className="flex items-center justify-center gap-2 text-sm">
              <WifiOff className="h-4 w-4" />
              <span>You're working offline. Changes will be synchronized when you're back online.</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-6 gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <div className="flex items-center gap-2">
            <Dialog open={addCustomerOpen} onOpenChange={setAddCustomerOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddCustomer}>
                  <DialogHeader>
                    <DialogTitle>Add New Customer</DialogTitle>
                    <DialogDescription>Add a new customer to your database.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" name="name" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input id="email" name="email" type="email" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Phone
                      </Label>
                      <Input id="phone" name="phone" className="col-span-3" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">{isOffline ? "Add Customer Offline" : "Add Customer"}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <ExportButton type="customers" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 w-full">
          <div className="w-full sm:w-auto flex-1">
            <SearchBar placeholder="Search customers..." className="w-full" />
          </div>
          <FilterButton
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "High Value", value: "high-value" },
              { label: "New", value: "new" },
            ]}
          />
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Customer Database</CardTitle>
            <CardDescription>Manage your customer information and purchase history</CardDescription>
          </CardHeader>
          <CardContent className="p-0 overflow-auto">
            <div className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.email}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>${customer.spent.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/customers/${customer.id}`}>View details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/customers/${customer.id}/edit`}>Edit customer</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/customers/${customer.id}/purchases`}>View purchase history</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteCustomer(customer.id)}
                            >
                              Delete customer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <OfflineIndicator />
    </PageTransition>
  )
}
