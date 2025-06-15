export interface Product {
    id: string;
    name: string;
    category: string;
    price: number; // Maps to sellingPrice
    stock: number; // Maps to currentStock
    sku: string; // Maps to id
    barcode: string;
    image: string; // Maps to mainImage
    description: string;
    costPrice: number;
    supplier: string; // Maps to vendor
    reorderPoint: number; // Maps to lowStockThreshold
    lastUpdated: string; // Can be set to current date
    additionalImage: string; // Add this to match formData
    taxRate: number; // Add from formData
    discount: number; // Add from formData
    weight: number; // Add from formData
    length: number; // Add from formData
    width: number; // Add from formData
    height: number; // Add from formData
    notes: string; // Add from formData
}