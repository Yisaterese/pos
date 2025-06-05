"use client"
import Image from "next/image";
import { StaticImageData } from "next/image";
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { MinusCircle, PlusCircle, ShoppingCart, Trash2, WifiOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { FilterButton } from "@/components/filter-button"
import { SearchBar } from "@/components/search-bar"
import { MobileHeader } from "@/components/mobile-header"
import { PageTransition } from "@/components/page-transition"
import { useOffline } from "@/hooks/use-offline"
import { OfflineIndicator } from "@/components/offline-indicator"
import { saveOfflineTransaction } from "@/lib/offline-storage"
import { useAppDispatch } from "@/lib/redux/hooks"
import { addPendingTransaction } from "@/lib/redux/slices/offlineSlice"
import { getCachedProducts } from "@/lib/offline-storage"
import { initialProducts } from "@/utils/data/data";
import Link from "next/link";

// Define Product type based on initialProducts structure
type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: string;
  image: string | StaticImageData;
};

// Define CartItem type for cart items (no image, stock, or status properties)
type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

export default function POSPage() {
  const { toast } = useToast()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isOffline } = useOffline()
  const [activeCategory, setActiveCategory] = useState("all")
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "PRD001", name: "Wireless Headphones", price: 89.99, qty: 1 },
    { id: "PRD002", name: "Organic Coffee Beans", price: 12.99, qty: 2 },
    { id: "PRD003", name: "Leather Wallet", price: 34.5, qty: 1 },
  ])
  const [products, setProducts] = useState<Product[]>(initialProducts)

  // Load products (from cache when offline, or initial products)
  useEffect(() => {
    const loadProducts = async () => {
      if (isOffline) {
        // Load cached products when offline
        const cachedProducts = await getCachedProducts()
        if (cachedProducts && cachedProducts.length > 0) {
          // Ensure cached products have category and normalize it
          const validatedProducts = cachedProducts.map((product: Product) => ({
            ...product,
            category: (product.category || "uncategorized").toLowerCase(), // Normalize category
            image: typeof product.image === "string" ? product.image : null,
          }))
          setProducts(validatedProducts)
        } else {
          // Fallback to initial products
          setProducts(initialProducts)
        }
      } else {
        // For now, use initial products or cached products
        const cachedProducts = await getCachedProducts()
        if (cachedProducts && cachedProducts.length > 0) {
          const validatedProducts = cachedProducts.map((product: Product) => ({
            ...product,
            category: (product.category || "uncategorized").toLowerCase(), // Normalize category
            image: typeof product.image === "string" ? product.image : null,
          }))
          setProducts(validatedProducts)
        } else {
          setProducts(initialProducts)
        }
      }
    }

    loadProducts()
  }, [isOffline, toast])

  const filteredProducts =
      activeCategory === "all"
          ? products
          : products.filter((product: Product) => product.category === activeCategory)

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item))
      } else {
        return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }]
      }
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const updateQuantity = (id: string, change: number) => {
    setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item)),
    )
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    })
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before proceeding to checkout.",
        variant: "destructive",
      })
      return
    }

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const taxRate = 0.08; // Typical US sales tax rate (8%)
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    // Create transaction object
    const transaction = {
      items: cartItems,
      subtotal,
      tax,
      total,
      timestamp: new Date().toISOString(),
      status: isOffline ? "pending" : "completed",
      customer: null, // Could be set if customer is selected
    }

    try {
      if (isOffline) {
        // Save transaction for offline use
        const offlineTransaction = await saveOfflineTransaction({
          type: "sale",
          data: transaction,
        })

        // Add to Redux store
        dispatch(addPendingTransaction(offlineTransaction))

        toast({
          title: "Sale completed offline",
          description: "This transaction will be synchronized when you're back online.",
        })
      } else {
        // In a real app, this would be an API call
        // For now, we'll just simulate it
        console.log("Processing online transaction:", transaction)

        toast({
          title: "Sale completed",
          description: `Transaction of $${total.toFixed(2)} has been processed.`,
        })
      }

      // Clear cart and redirect
      setCartItems([])
      router.push("/checkout")
    } catch (error) {
      console.error("Error processing transaction:", error)
      toast({
        title: "Error",
        description: "There was an error processing your transaction. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const taxRate = 0.08 // GST rate in Dollars
  const tax = subtotal * taxRate
  const total = subtotal + tax

  return (
      <PageTransition>
        <MobileHeader title="Point of Sale"/>
        <div className="flex flex-col h-screen w-full max-w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-b gap-4">
            <h2 className="text-2xl font-bold">Point of Sale</h2>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Link href={"/checkout"}>
              <Button onClick={handleCheckout}>
                <ShoppingCart className="mr-2 h-4 w-4"/>
                Checkout
              </Button>
              </Link>
            </div>
          </div>

          {isOffline && (
              <div className="bg-warning/20 p-2 text-center">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <WifiOff className="h-4 w-4"/>
                  <span>You're working offline. Your transactions will be synchronized when you're back online.</span>
                </div>
              </div>
          )}

          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden w-full">
            {/* Product Selection Area */}
            <div className="w-full lg:w-2/3 p-4 overflow-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-4">
                <div className="w-full sm:w-auto flex-1">
                  <SearchBar placeholder="Search products by name or scan barcode..." className="w-full"/>
                </div>
                <FilterButton
                    options={[
                      {label: "In Stock", value: "in-stock"},
                      {label: "On Sale", value: "on-sale"},
                      {label: "New Arrivals", value: "new"},
                    ]}
                />
              </div>

              <div className="w-full overflow-auto mb-4">
                <Tabs defaultValue="all" className="w-full" value={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="w-full flex flex-wrap">
                    <TabsTrigger value="all" className="flex-1">
                      All Products
                    </TabsTrigger>
                    <TabsTrigger value="electronics" className="flex-1">
                      Electronics
                    </TabsTrigger>
                    <TabsTrigger value="food" className="flex-1">
                      Food & Beverages
                    </TabsTrigger>
                    <TabsTrigger value="clothing" className="flex-1">
                      Clothing
                    </TabsTrigger>
                    <TabsTrigger value="accessories" className="flex-1">
                      Accessories
                    </TabsTrigger>
                    <TabsTrigger value="sports" className="flex-1">
                      Sports
                    </TabsTrigger>
                    <TabsTrigger value="home & kitchen" className="flex-1">
                      Home & Kitchen
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.length === 0 ? (
                    <p className="text-center col-span-full text-muted-foreground">
                      No products found in this category.
                    </p>
                ) : (
                    filteredProducts.map((product: Product) => (
                        <Card key={product.id} className="overflow-hidden w-full">
                          <CardContent className="p-4 flex flex-col items-center">
                            <div
                                className="w-full aspect-square bg-muted rounded-md mb-3 flex items-center justify-center">
                              <Image
                                  src={typeof product.image === "string" ? product.image : product.image.src || ""}
                                  alt={product.name}
                                  width={96}
                                  height={96}
                                  className="h-24 w-24 object-contain"
                              />
                            </div>
                            <div className="text-center w-full">
                              <h3 className="font-medium text-sm truncate w-full">{product.name}</h3>
                              <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                              <Button className="w-full mt-2" size="sm" onClick={() => addToCart(product)}>
                                Add to Cart
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                    ))
                )}
              </div>
            </div>

            {/* Cart Area */}
            <div className="w-full lg:w-1/3 border-t lg:border-t-0 lg:border-l flex flex-col">
              <Card className="flex-1 rounded-none border-0 shadow-none">
                <CardHeader className="px-4 py-3 border-b">
                  <CardTitle>Current Order</CardTitle>
                  <CardDescription>{cartItems.length} items in cart</CardDescription>
                </CardHeader>
                <CardContent className="p-0 flex flex-col flex-1">
                  <div className="flex-1 overflow-auto ">
                    <div className="w-full overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead className="text-right">Qty</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cartItems.map((item: CartItem) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => updateQuantity(item.id, -1)}
                                    >
                                      <MinusCircle className="h-4 w-4"/>
                                    </Button>
                                    <span className="w-6 text-center">{item.qty}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => updateQuantity(item.id, 1)}
                                    >
                                      <PlusCircle className="h-4 w-4"/>
                                    </Button>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">${(item.price * item.qty).toFixed(2)}</TableCell>
                                <TableCell>
                                  <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => removeFromCart(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4"/>
                                  </Button>
                                </TableCell>
                              </TableRow>
                          ))}

                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <div className="p-4 border-t">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (18%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <Separator/>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="p-4 border-t sticky bottom-0 bg-background z-10">
                <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md shadow transition-colors"
                    onClick={handleCheckout}
                >
                  {isOffline ? "Complete Sale Offline" : "Proceed to Payment"}
                </Button>
                {isOffline && (
                    <p className="text-xs text-center mt-2 text-muted-foreground">
                      This transaction will be synchronized when you're back online.
                    </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <OfflineIndicator/>
      </PageTransition>
  );
}