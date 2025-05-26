"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Mail, Phone, Trash, User } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FadeIn, SlideIn, StaggeredItem, StaggeredList } from "@/components/animations"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // This would normally fetch the customer based on the ID
  const customer = {
    id: params.id,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    joinDate: "January 15, 2023",
    lastPurchase: "May 1, 2023",
    totalSpent: 1245.89,
    orders: 12,
    status: "Active",
    notes: "Prefers email communication. Interested in electronics products.",
  }

  const handleDelete = () => {
    setDeleteDialogOpen(false)

    toast({
      title: "Customer deleted",
      description: `${customer.name} has been deleted successfully.`,
      variant: "destructive",
    })

    // Redirect to customers page after deletion
    setTimeout(() => {
      router.push("/customers")
    }, 500)
  }

  const handleViewPurchaseHistory = () => {
    router.push(`/customers/${params.id}/purchases`)
  }

  const handleEditCustomer = () => {
    router.push(`/customers/${params.id}/edit`)
  }

  return (
    <FadeIn className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/customers">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{customer.name}</h2>
            <p className="text-muted-foreground">Customer since {customer.joinDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/customers/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
        <SlideIn direction="left" className="md:row-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Customer Profile</CardTitle>
              <CardDescription>Basic information about the customer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Badge variant={customer.status === "Active" ? "default" : "secondary"}>{customer.status}</Badge>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{customer.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{customer.address}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="font-medium mb-2">Notes</p>
                <p className="text-sm text-muted-foreground">{customer.notes}</p>
              </div>
              <Button onClick={handleViewPurchaseHistory} className="w-full">
                View Purchase History
              </Button>

              <Button onClick={handleEditCustomer} variant="outline" className="w-full">
                Edit Customer
              </Button>
            </CardContent>
          </Card>
        </SlideIn>

        <div className="space-y-4">
          <SlideIn direction="right" delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle>Customer Overview</CardTitle>
                <CardDescription>Summary of customer activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Total Orders</h3>
                    <p className="text-2xl font-bold">{customer.orders}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Total Spent</h3>
                    <p className="text-2xl font-bold">${customer.totalSpent.toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Average Order Value</h3>
                    <p className="text-2xl font-bold">${(customer.totalSpent / customer.orders).toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Last Purchase</h3>
                    <p className="text-2xl font-bold">{customer.lastPurchase}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideIn>

          <SlideIn direction="right" delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest customer interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <StaggeredList className="space-y-4">
                  {[
                    {
                      action: "Placed order",
                      date: "May 1, 2023 - 09:32 AM",
                      details: "Order #ORD-001 for $179.98",
                    },
                    {
                      action: "Updated profile",
                      date: "April 15, 2023 - 02:15 PM",
                      details: "Changed phone number",
                    },
                    {
                      action: "Contacted support",
                      date: "April 10, 2023 - 11:45 AM",
                      details: "Inquiry about product warranty",
                    },
                  ].map((activity, index) => (
                    <StaggeredItem key={index} className="flex justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{activity.date}</p>
                      </div>
                    </StaggeredItem>
                  ))}
                </StaggeredList>
              </CardContent>
            </Card>
          </SlideIn>
        </div>

        <SlideIn direction="up" delay={0.3} className="md:col-span-2">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="orders" className="flex-1">
                Purchase History
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex-1">
                Wishlist
              </TabsTrigger>
              <TabsTrigger value="support" className="flex-1">
                Support History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase History</CardTitle>
                  <CardDescription>All orders placed by this customer</CardDescription>
                </CardHeader>
                <CardContent>
                  <StaggeredList className="space-y-4">
                    {[
                      {
                        order: "ORD-001",
                        date: "May 1, 2023",
                        items: 2,
                        status: "Delivered",
                        total: 179.98,
                      },
                      {
                        order: "ORD-002",
                        date: "April 15, 2023",
                        items: 1,
                        status: "Delivered",
                        total: 89.99,
                      },
                      {
                        order: "ORD-003",
                        date: "March 22, 2023",
                        items: 3,
                        status: "Delivered",
                        total: 269.97,
                      },
                      {
                        order: "ORD-004",
                        date: "February 10, 2023",
                        items: 2,
                        status: "Delivered",
                        total: 124.5,
                      },
                      {
                        order: "ORD-005",
                        date: "January 28, 2023",
                        items: 4,
                        status: "Delivered",
                        total: 345.75,
                      },
                    ].map((order, index) => (
                      <StaggeredItem key={index} className="flex justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">Order #{order.order}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.date} • {order.items} items
                          </p>
                        </div>
                        <div className="text-center">
                          <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>{order.status}</Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <Button variant="link" size="sm" className="h-auto p-0" asChild>
                            <Link href={`/orders/${order.order}`}>View details</Link>
                          </Button>
                        </div>
                      </StaggeredItem>
                    ))}
                  </StaggeredList>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="wishlist" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Wishlist</CardTitle>
                  <CardDescription>Products the customer is interested in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        name: "Bluetooth Speaker",
                        price: 59.99,
                        image: "",
                        addedOn: "April 28, 2023",
                      },
                      {
                        name: "Smart Watch",
                        price: 199.99,
                        image: "",
                        addedOn: "April 15, 2023",
                      },
                    ].map((product, index) => (
                      <Card
                        key={index}
                        className="overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                      >
                        <CardContent className="p-4 flex flex-col items-center">
                          <div className="w-full aspect-square bg-muted rounded-md mb-3 flex items-center justify-center">
                            <img
                              src={product.image || ""}
                              alt={product.name}
                              className="h-16 w-16 object-contain"
                            />
                          </div>
                          <div className="text-center w-full">
                            <h3 className="font-medium text-sm">{product.name}</h3>
                            <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground mb-2">Added on {product.addedOn}</p>
                            <Button variant="outline" size="sm" className="w-full">
                              Add to Cart
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="support" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Support History</CardTitle>
                  <CardDescription>Customer support interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <StaggeredList className="space-y-4">
                    {[
                      {
                        ticket: "TKT-001",
                        date: "April 10, 2023",
                        subject: "Product warranty inquiry",
                        status: "Resolved",
                      },
                      {
                        ticket: "TKT-002",
                        date: "March 5, 2023",
                        subject: "Order delivery delay",
                        status: "Resolved",
                      },
                    ].map((ticket, index) => (
                      <StaggeredItem key={index} className="flex justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">Ticket #{ticket.ticket}</p>
                          <p className="text-sm text-muted-foreground">{ticket.subject}</p>
                        </div>
                        <div className="text-center">
                          <Badge variant={ticket.status === "Resolved" ? "default" : "warning"}>{ticket.status}</Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{ticket.date}</p>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            View details
                          </Button>
                        </div>
                      </StaggeredItem>
                    ))}
                  </StaggeredList>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </SlideIn>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {customer.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FadeIn>
  )
}
