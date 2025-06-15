"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addProduct } from "@/lib/redux/slices/productsSlice";
import { ImageUpload } from "@/components/image-upload";

export default function AddProductPage() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    barcode: "",
    category: "",
    description: "",
    costPrice: "",
    sellingPrice: "",
    taxRate: "",
    discount: "",
    currentStock: "",
    lowStockThreshold: "",
    vendor: "",
    reorderQuantity: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    notes: "",
    mainImage: "",
    additionalImage: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const numericFields = [
      "costPrice", "sellingPrice", "taxRate", "discount", "currentStock", "lowStockThreshold",
      "reorderQuantity", "weight", "length", "width", "height"
    ];

    if (numericFields.includes(id)) {
      // Allow empty string or valid numbers (including decimals)
      if (value === "" || /^[\d]*\.?[\d]*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [id]: value }));
      }
    } else {
      // Allow all characters for text fields
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleImageChange = (field: "mainImage" | "additionalImage") => (image: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: image || "" }));
  };

  const handleSaveProduct = () => {
    const product = {
      id: formData.id || `PROD-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.sellingPrice) || 0,
      stock: parseInt(formData.currentStock) || 0,
      sku: formData.id || `PROD-${Date.now()}`,
      barcode: formData.barcode,
      image: formData.mainImage,
      description: formData.description,
      costPrice: parseFloat(formData.costPrice) || 0,
      supplier: formData.vendor,
      reorderPoint: parseInt(formData.lowStockThreshold) || 0,
      lastUpdated: new Date().toISOString(),
      additionalImage: formData.additionalImage,
      taxRate: parseFloat(formData.taxRate) || 0,
      discount: parseFloat(formData.discount) || 0,
      weight: parseFloat(formData.weight) || 0,
      length: parseFloat(formData.length) || 0,
      width: parseFloat(formData.width) || 0,
      height: parseFloat(formData.height) || 0,
      notes: formData.notes,
    };

    dispatch(addProduct(product));
    toast({ title: "Success", description: `${product.name} has been added! (Mock)` });

    setFormData({
      name: "",
      id: "",
      barcode: "",
      category: "",
      description: "",
      costPrice: "",
      sellingPrice: "",
      taxRate: "",
      discount: "",
      currentStock: "",
      lowStockThreshold: "",
      vendor: "",
      reorderQuantity: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      notes: "",
      mainImage: "",
      additionalImage: "",
    });
  };

  return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details of your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input id="product-name" value={formData.name} onChange={handleInputChange} placeholder="Enter product name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-id">Product ID/SKU</Label>
                  <Input id="product-id" value={formData.id} onChange={handleInputChange} placeholder="Enter product ID or SKU" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="barcode">Barcode</Label>
                  <Input id="barcode" value={formData.barcode} onChange={handleInputChange} placeholder="Enter barcode number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={handleSelectChange} value={formData.category}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
                      <SelectItem value="Home & Kitchen">Home & Kitchen</SelectItem>
                      <SelectItem value="Beauty & Personal Care">Beauty & Personal Care</SelectItem>
                      <SelectItem value="Sports & Outdoors">Sports & Outdoors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={formData.description} onChange={handleInputChange} placeholder="Enter product description" rows={4} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
                <CardDescription>Set the pricing details for your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cost-price">Cost Price</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">$</span>
                      <Input id="cost-price" type="number" step="0.01" value={formData.costPrice} onChange={handleInputChange} className="pl-7" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="selling-price">Selling Price</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">$</span>
                      <Input id="selling-price" type="number" step="0.01" value={formData.sellingPrice} onChange={handleInputChange} className="pl-7" placeholder="0.00" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                  <Input id="tax-rate" type="number" step="0.01" value={formData.taxRate} onChange={handleInputChange} placeholder="7.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input id="discount" type="number" step="0.01" value={formData.discount} onChange={handleInputChange} placeholder="0" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Information</CardTitle>
                <CardDescription>Manage your product inventory</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-stock">Current Stock</Label>
                  <Input id="current-stock" type="number" value={formData.currentStock} onChange={handleInputChange} placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="low-stock-threshold">Low Stock Threshold</Label>
                  <Input id="low-stock-threshold" type="number" value={formData.lowStockThreshold} onChange={handleInputChange} placeholder="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor/Supplier</Label>
                  <Input id="vendor" value={formData.vendor} onChange={handleInputChange} placeholder="Enter vendor name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reorder-quantity">Reorder Quantity</Label>
                  <Input id="reorder-quantity" type="number" value={formData.reorderQuantity} onChange={handleInputChange} placeholder="50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Upload images of your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Main Image</Label>
                    <ImageUpload
                        initialImage={formData.mainImage}
                        onImageChange={handleImageChange("mainImage")}
                        buttonText="Upload Main Image"
                        aspectRatio={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Additional Image</Label>
                    <ImageUpload
                        initialImage={formData.additionalImage}
                        onImageChange={handleImageChange("additionalImage")}
                        buttonText="Upload Additional Image"
                        aspectRatio={1}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Add any additional details about the product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" type="number" step="0.01" value={formData.weight} onChange={handleInputChange} placeholder="0.00" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="length">Length (cm)</Label>
                    <Input id="length" type="number" step="0.1" value={formData.length} onChange={handleInputChange} placeholder="0.0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (cm)</Label>
                    <Input id="width" type="number" step="0.1" value={formData.width} onChange={handleInputChange} placeholder="0.0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input id="height" type="number" step="0.1" value={formData.height} onChange={handleInputChange} placeholder="0.0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" value={formData.notes} onChange={handleInputChange} placeholder="Any additional notes" rows={3} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/products">Cancel</Link>
          </Button>
          <Button onClick={handleSaveProduct}>Save Product</Button>
        </div>
      </div>
  );
}