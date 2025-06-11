"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { MinusCircle, PlusCircle, ShoppingCart, Trash2, WifiOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { FilterButton } from "@/components/filter-button";
import { SearchBar } from "@/components/search-bar";
import { MobileHeader } from "@/components/mobile-header";
import { PageTransition } from "@/components/page-transition";
import { useOffline } from "@/hooks/use-offline";
import { OfflineIndicator } from "@/components/offline-indicator";
import { saveOfflineTransaction } from "@/lib/offline-storage";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addPendingTransaction } from "@/lib/redux/slices/offlineSlice";
import { getCachedProducts } from "@/lib/offline-storage";
import { initialProducts } from "@/utils/data/data";
import { addToCart, removeFromCart, updateQuantity, clearCart } from "@/lib/redux/slices/cartSlice";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  barcode: string;
  image: string;
  description: string;
  costPrice: number;
  supplier: string;
  reorderPoint: number;
  lastUpdated: string;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function POSPage() {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOffline } = useOffline();
  const cart = useAppSelector((state) => state.cart ?? {
    items: [],
    total: 0,
    tax: 0,
    taxRate: 0.08,
    discount: 0,
    customer: null,
  });
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (cart !== undefined) {
      setIsHydrated(true);
    }
  }, [cart]);

  useEffect(() => {
    const loadProducts = async () => {
      if (isOffline) {
        const cachedProducts = await getCachedProducts();
        if (cachedProducts && cachedProducts.length > 0) {
          setProducts(cachedProducts);

        } else {
          setProducts(initialProducts);
        }
      } else {
        const cachedProducts = await getCachedProducts();
        if (cachedProducts && cachedProducts.length > 0) {
          setProducts(cachedProducts);
        } else {
          setProducts(initialProducts);
        }
      }
    };
    loadProducts();
  }, [isOffline]);

  if (!isHydrated) {
    return <div>Loading cart...</div>;
  }

  const filteredProducts =
      activeCategory === "all"
          ? products
          : products.filter((product) => product.category === activeCategory);

  const handleAddToCart = (product: Product) => {
    dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image || "",
        })
    );

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (id: string, change: number) => {
    const item = cart.items.find((item) => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const handleCheckout = async () => {
    if (cart.items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before proceeding to checkout.",
        variant: "destructive",
      });
      return;
    }

    const subtotal = cart.total;
    const tax = cart.tax;
    const total = subtotal + tax;

    const transaction = {
      items: cart.items,
      subtotal,
      tax,
      total,
      timestamp: new Date().toISOString(),
      status: isOffline ? "pending" : "completed",
      customer: cart.customer,
    };

    try {
      if (isOffline) {
        const offlineTransaction = await saveOfflineTransaction({
          type: "sale",
          data: transaction,
        });
        dispatch(addPendingTransaction(offlineTransaction));
        toast({
          title: "Sale completed offline",
          description: "This transaction will be synchronized when you're back online.",
        });
      } else {
        console.log("Processing online transaction:", transaction);
        toast({
          title: "Sale completed",
          description: `Transaction of $${total.toFixed(2)} has been processed.`,
        });
      }
      // Delay clearCart until after payment is confirmed in CheckoutPage
      router.push("/checkout");
    } catch (error) {
      console.error("Error processing transaction:", error);
      toast({
        title: "Error",
        description: "There was an error processing your transaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
      <PageTransition>
        <MobileHeader title="Point of Sale" />
        <div className="flex flex-col h-screen w-full max-w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-b gap-4">
            <h2 className="text-2xl font-bold">Point of Sale</h2>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleClearCart}>
                Clear Cart
              </Button>
              <Button onClick={handleCheckout}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Checkout
              </Button>
            </div>
          </div>

          {isOffline && (
              <div className="bg-warning/20 p-2 text-center">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <WifiOff className="h-4 w-4" />
                  <span>You're working offline. Your transactions will be synchronized when you're back online.</span>
                </div>
              </div>
          )}

          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden w-full">
            <div className="w-full lg:w-2/3 p-4 overflow-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-4">
                <div className="w-full sm:w-auto flex-1">
                  <SearchBar placeholder="Search products by name or scan barcode..." className="w-full" />
                </div>
                <FilterButton
                    options={[
                      { label: "In Stock", value: "in-stock" },
                      { label: "On Sale", value: "on-sale" },
                      { label: "New Arrivals", value: "new" },
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
                        <Card key={product.id} className="overflow-hidden w-full ">
                          <CardContent className="flex pt-4 flex-col items-center ">
                              <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={100}
                                  height={100}
                                  className="h-full w-full mb-3 object-contain rounded"
                              />
                            <div className="text-center w-full">
                              <h3 className="font-medium text-sm truncate w-full">{product.name}</h3>
                              <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                              <Button className="w-full mt-2" size="sm" onClick={() => handleAddToCart(product)}>
                                Add to Cart
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                    ))
                )}
              </div>
            </div>

            <div className="w-full lg:w-1/3 border-t lg:border-t-0 lg:border-l flex flex-col">
              <Card className="flex-1 rounded-none border-0 shadow-none">
                <CardHeader className="px-4 py-3 border-b">
                  <CardTitle>Current Order</CardTitle>
                  <CardDescription>{cart.items.length} items in cart</CardDescription>
                </CardHeader>
                <CardContent className="p-0 flex flex-col flex-1">
                  <div className="flex-1 overflow-auto">
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
                          {cart.items.map((item: CartItem) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => handleUpdateQuantity(item.id, -1)}
                                    >
                                      <MinusCircle className="h-4 w-4" />
                                    </Button>
                                    <span className="w-6 text-center">{item.quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => handleUpdateQuantity(item.id, 1)}
                                    >
                                      <PlusCircle className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                                <TableCell>
                                  <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => handleRemoveFromCart(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
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
                        <span>${cart.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (8%)</span>
                        <span>${cart.tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${(cart.total + cart.tax).toFixed(2)}</span>
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
        <OfflineIndicator />
      </PageTransition>
  );
}