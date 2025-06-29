"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, WifiOff } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "@/components/search-bar";
import { FilterButton } from "@/components/filter-button";
import { ExportButton } from "@/components/export-button";
import { useToast } from "@/components/ui/use-toast";
import { MobileHeader } from "@/components/mobile-header";
import { PageTransition } from "@/components/page-transition";
import { useOffline } from "@/hooks/use-offline";
import { OfflineIndicator } from "@/components/offline-indicator";
import { getCachedProducts, cacheProductsForOffline, saveOfflineTransaction } from "@/lib/offline-storage";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addPendingTransaction } from "@/lib/redux/slices/offlineSlice";
import { initialProducts } from "@/utils/data/data";
import { Product } from "@/types/types";

export default function ProductsPage() {
  const { isOffline } = useOffline();
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);

  // Load cached products when offline or fetch from API when online
  useEffect(() => {
    const loadProducts = async () => {
      if (isOffline) {
        const cachedProducts = await getCachedProducts();
        if (cachedProducts && cachedProducts.length > 0) {
          setProducts(cachedProducts);
          setFilteredProducts(cachedProducts);
        }
      } else {
        // Commented-out API call for fetching products
        // try {
        //   const response = await fetch("/api/products");
        //   if (!response.ok) throw new Error("Failed to fetch products");
        //   const data = await response.json();
        //   setProducts(data);
        //   setFilteredProducts(data);
        //   await cacheProductsForOffline(data); // Cache for offline use
        // } catch (error) {
        //   console.error("Error fetching products:", error);
        //   setProducts(initialProducts); // Fallback to dummy data
        //   setFilteredProducts(initialProducts);
        // }
      }
    };

    loadProducts();
  }, [isOffline]);

  // Cache products for offline use
  useEffect(() => {
    const cacheProducts = async () => {
      if (!isOffline && products.length > 0) {
        await cacheProductsForOffline(products);
      }
    };

    cacheProducts();
  }, [products, isOffline]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseQuery) || // Search by name
        product.category.toLowerCase().includes(lowerCaseQuery) // Search by category
    );
    setFilteredProducts(filtered);
  };

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      const productName = products.find((p) => p.id === productToDelete)?.name;

      try {
        if (isOffline) {
          // Save deletion for offline sync
          const offlineTransaction = await saveOfflineTransaction({
            type: "product",
            data: { action: "delete", productId: productToDelete },
          });

          // Add to Redux store
          dispatch(addPendingTransaction(offlineTransaction));

          toast({
            title: "Product deleted offline",
            description: `${productName} has been removed from your inventory. This will be synchronized when you're back online.`,
            variant: "destructive",
          });
        } else {
          // Commented-out API call for deleting product
          // const response = await fetch(`/api/products/${productToDelete}`, {
          //   method: "DELETE",
          // });
          // if (!response.ok) throw new Error("Failed to delete product");
          toast({
            title: "Product deleted",
            description: `${productName} has been removed from your inventory.`,
            variant: "destructive",
          });
        }

        // Update local state
        setProducts(products.filter((p) => p.id !== productToDelete));
        setFilteredProducts(filteredProducts.filter((p) => p.id !== productToDelete));
        setDeleteDialogOpen(false);
        setProductToDelete(null);
      } catch (error) {
        console.error("Error deleting product:", error);
        toast({
          title: "Error",
          description: "There was an error deleting the product. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const confirmDelete = (id: string) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  return (
      <PageTransition>
        <MobileHeader title="Products" />
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
            <h2 className="text-3xl font-bold tracking-tight">Products</h2>
            <Button asChild>
              <Link href="/products/add">+ Add product</Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 w-full">
            <div className="w-full sm:w-auto flex-1">
              <SearchBar placeholder="Search products..." onSearch={handleSearch} className="w-full" />
            </div>
            <div className="flex items-center gap-2">
              <FilterButton
                  options={[
                    { label: "In Stock", value: "in-stock" },
                    { label: "Low Stock", value: "low-stock" },
                    { label: "Out of Stock", value: "out-of-stock" },
                    { label: "Electronics", value: "electronics" },
                    { label: "Clothing", value: "clothing" },
                    { label: "Sports", value: "sports" },
                    { label: "Accessories", value: "accessories" },
                    { label: "Food & Beverages", value: "food & beverages" },
                    { label: "Home and Kitchen", value: "home and kitchen" },
                  ]}
              />
              <ExportButton type="products" />
            </div>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>Manage your product inventory, stock levels, and pricing</CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-auto">
              <div className="w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.id}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-right">
                            ${typeof product.price === "number" ? product.price.toFixed(2) : "0.00"}
                          </TableCell>
                          <TableCell className="text-right">{product.stock}</TableCell>
                          <TableCell>
                            <Badge
                                variant={
                                  product.stock > product.reorderPoint
                                      ? "default"
                                      : product.stock === 0
                                          ? "destructive"
                                          : "warning"
                                }
                            >
                              {product.stock > product.reorderPoint
                                  ? "In Stock"
                                  : product.stock === 0
                                      ? "Out of Stock"
                                      : "Low Stock"}
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
                                  <Link href={`/products/${product.id}`}>View product</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/products/${product.id}/edit`}>Edit product</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/products/${product.id}/update-stock`}>Update stock</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <Link href={`/products/${product.id}`}>View history</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => confirmDelete(product.id)}
                                >
                                  Delete product
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

          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this product? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteProduct}>
                  {isOffline ? "Delete Offline" : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <OfflineIndicator />
      </PageTransition>
  );
}