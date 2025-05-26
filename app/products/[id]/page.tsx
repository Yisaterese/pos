"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Printer } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FadeIn, SlideIn, StaggeredItem, StaggeredList } from "@/components/animations"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // This would normally fetch the product based on the ID
  const product = {
    id: params.id,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and long battery life.",
    category: "Electronics",
    price: 89.99,
    cost: 45.0,
    stock: 45,
    status: "In Stock",
    sku: "PRD001",
    barcode: "123456789012",
    vendor: "AudioTech Inc.",
    created: "January 15, 2023",
    updated: "May 1, 2023",
    weight: "0.25 kg",
    dimensions: "18 × 15 × 8 cm",
    taxRate: "7.5%",
    lowStockThreshold: 10,
  }

  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false)
      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted",
      })
      router.push("/products")
    }, 1000)
  }

  const handlePrint = () => {
    toast({
      title: "Printing product details",
      description: "The product details are being sent to the printer.",
    })
  }

  return (
    <FadeIn className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{product.name}</h2>
            <p className="text-muted-foreground">
              SKU: {product.sku} • Barcode: {product.barcode}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/products/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                Delete Product
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the product and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
        <SlideIn direction="left" className="md:row-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Image</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="aspect-square w-full max-w-[300px] rounded-md bg-muted flex items-center justify-center">
                <img src="" alt={product.name} className="h-[200px] w-[200px] object-contain" />
              </div>
            </CardContent>
          </Card>
        </SlideIn>

        <div className="space-y-4">
          <SlideIn direction="right" delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>Basic details about the product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Category</h3>
                    <p>{product.category}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Status</h3>
                    <Badge
                      variant={
                        product.status === "In Stock"
                          ? "default"
                          : product.status === "Low Stock"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {product.status}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Vendor</h3>
                    <p>{product.vendor}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Created</h3>
                    <p>{product.created}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Last Updated</h3>
                    <p>{product.updated}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Tax Rate</h3>
                    <p>{product.taxRate}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">Description</h3>
                  <p>{product.description}</p>
                </div>
              </CardContent>
            </Card>
          </SlideIn>

          <SlideIn direction="right" delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Inventory</CardTitle>
                <CardDescription>Pricing and stock information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Selling Price</h3>
                    <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Cost Price</h3>
                    <p className="text-xl">${product.cost.toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Profit Margin</h3>
                    <p className="text-xl">{(((product.price - product.cost) / product.price) * 100).toFixed(2)}%</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Current Stock</h3>
                    <p className="text-xl">{product.stock} units</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Low Stock Threshold</h3>
                    <p className="text-xl">{product.lowStockThreshold} units</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Stock Value</h3>
                    <p className="text-xl">${(product.cost * product.stock).toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideIn>
        </div>

        <SlideIn direction="up" delay={0.3} className="md:col-span-2">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="history" className="flex-1">
                History
              </TabsTrigger>
              <TabsTrigger value="sales" className="flex-1">
                Sales
              </TabsTrigger>
              <TabsTrigger value="related" className="flex-1">
                Related Products
              </TabsTrigger>
            </TabsList>
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product History</CardTitle>
                  <CardDescription>Recent changes and updates to this product</CardDescription>
                </CardHeader>
                <CardContent>
                  <StaggeredList className="space-y-4">
                    {[
                      {
                        action: "Stock updated",
                        date: "May 1, 2023 - 09:32 AM",
                        user: "Admin User",
                        details: "Stock increased from 40 to 45 units",
                      },
                      {
                        action: "Price changed",
                        date: "April 15, 2023 - 02:15 PM",
                        user: "Admin User",
                        details: "Price updated from $79.99 to $89.99",
                      },
                      {
                        action: "Product created",
                        date: "January 15, 2023 - 11:45 AM",
                        user: "Admin User",
                        details: "Initial product creation",
                      },
                    ].map((activity, index) => (
                      <StaggeredItem key={index} className="flex justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.details}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{activity.date}</p>
                          <p className="text-sm text-muted-foreground">{activity.user}</p>
                        </div>
                      </StaggeredItem>
                    ))}
                  </StaggeredList>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sales" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sales History</CardTitle>
                  <CardDescription>Recent sales of this product</CardDescription>
                </CardHeader>
                <CardContent>
                  <StaggeredList className="space-y-4">
                    {[
                      {
                        order: "ORD-001",
                        date: "May 1, 2023",
                        customer: "John Doe",
                        quantity: 2,
                        total: 179.98,
                      },
                      {
                        order: "ORD-002",
                        date: "April 28, 2023",
                        customer: "Jane Smith",
                        quantity: 1,
                        total: 89.99,
                      },
                      {
                        order: "ORD-003",
                        date: "April 25, 2023",
                        customer: "Robert Johnson",
                        quantity: 3,
                        total: 269.97,
                      },
                    ].map((sale, index) => (
                      <StaggeredItem key={index} className="flex justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">Order #{sale.order}</p>
                          <p className="text-sm text-muted-foreground">{sale.customer}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm">{sale.date}</p>
                          <p className="text-sm text-muted-foreground">Qty: {sale.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${sale.total.toFixed(2)}</p>
                        </div>
                      </StaggeredItem>
                    ))}
                  </StaggeredList>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="related" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Related Products</CardTitle>
                  <CardDescription>Products frequently purchased together</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        name: "Bluetooth Speaker",
                        price: 59.99,
                        image: "",
                      },
                      {
                        name: "Headphone Case",
                        price: 19.99,
                        image: "",
                      },
                      {
                        name: "USB-C Charging Cable",
                        price: 12.99,
                        image: "",
                      },
                    ].map((relatedProduct, index) => (
                      <Card
                        key={index}
                        className="overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                      >
                        <CardContent className="p-4 flex flex-col items-center">
                          <div className="w-full aspect-square bg-muted rounded-md mb-3 flex items-center justify-center">
                            <img
                              src={relatedProduct.image || ""}
                              alt={relatedProduct.name}
                              className="h-16 w-16 object-contain"
                            />
                          </div>
                          <div className="text-center">
                            <h3 className="font-medium text-sm">{relatedProduct.name}</h3>
                            <p className="text-primary font-bold">${relatedProduct.price.toFixed(2)}</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              View Product
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </SlideIn>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {product.name}? This action cannot be undone.
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
