export const initialProducts = [
    {
        id: "1",
        name: "Smart Fitness Band",
        category: "Electronics",
        price: 2499,
        stock: 28,
        sku: "SFB-002",
        barcode: "890123456790",
        image: "/images/pos/smartFitnessBand.jpg",
        description: "Water-resistant fitness tracker with heart rate monitor",
        costPrice: 1200,
        supplier: "TechIndia Solutions",
        reorderPoint: 5,
        lastUpdated: "2023-05-02",
        additionalImage: "/images/pos/smartFitnessBand_alt.jpg", // Placeholder
        taxRate: 7.5, // Default tax rate
        discount: 0, // No discount
        weight: 0.15, // Estimated weight in kg
        length: 25.0, // Estimated length in cm
        width: 4.0, // Estimated width in cm
        height: 1.5, // Estimated height in cm
        notes: "Track steps and heart rate effectively.", // Placeholder note
    },
    {
        id: "2",
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1299,
        stock: 32,
        sku: "BS-003",
        barcode: "890123456791",
        image: "/images/pos/bluetoothSpeaker.jpg",
        description: "Portable Bluetooth speaker with 10-hour battery life",
        costPrice: 700,
        supplier: "SoundWave Electronics",
        reorderPoint: 8,
        lastUpdated: "2023-05-03",
        additionalImage: "/images/pos/bluetoothSpeaker_alt.jpg", // Placeholder
        taxRate: 7.5, // Default tax rate
        discount: 5, // Small discount
        weight: 0.5, // Estimated weight in kg
        length: 15.0, // Estimated length in cm
        width: 5.0, // Estimated width in cm
        height: 5.0, // Estimated height in cm
        notes: "Great for outdoor use with durable design.", // Placeholder note
    },
    {
        id: "3",
        name: "Cotton Kurta",
        category: "Clothing",
        price: 799,
        stock: 120,
        sku: "CK-005",
        barcode: "890123456793",
        image: "/images/pos/cottonKurta.jpg",
        description: "100% cotton traditional kurta, available in multiple colors",
        costPrice: 350,
        supplier: "Fabindia Wholesale",
        reorderPoint: 20,
        lastUpdated: "2023-05-05",
        additionalImage: "/images/pos/cottonKurta_alt.jpg", // Placeholder
        taxRate: 7.5, // Default tax rate
        discount: 10, // Discount for clothing
        weight: 0.3, // Estimated weight in kg
        length: 70.0, // Estimated length in cm
        width: 50.0, // Estimated width in cm
        height: 1.0, // Estimated height in cm
        notes: "Hand wash recommended for longevity.", // Placeholder note
    },
    {
        id: "4",
        name: "Basmati Rice (5kg)",
        category: "Food",
        price: 450,
        stock: 85,
        sku: "BR-006",
        barcode: "890123456794",
        image: "/images/pos/basmaticRice.jpg",
        description: "Premium long-grain basmati rice from Punjab",
        costPrice: 280,
        supplier: "Punjab Agro Foods",
        reorderPoint: 15,
        lastUpdated: "2023-05-06",
        additionalImage: "/images/pos/basmaticRice_alt.jpg", // Placeholder
        taxRate: 0, // No tax on food (varies by region)
        discount: 0, // No discount
        weight: 5.0, // Actual weight in kg
        length: 30.0, // Estimated length in cm
        width: 20.0, // Estimated width in cm
        height: 10.0, // Estimated height in cm
        notes: "Store in a cool, dry place.", // Placeholder note
    },
    {
        id: "5",
        name: "Copper Water Bottle",
        category: "Accessories",
        price: 349,
        stock: 55,
        sku: "CWB-007",
        barcode: "890123456795",
        image: "image/pos/copperWaterBottle.jpg",
        description: "Ayurvedic copper water bottle for health benefits",
        costPrice: 180,
        supplier: "Ari Products",
        reorderPoint: 10,
        lastUpdated: "2023-05-07",
        additionalImage: "/images/pos/copperWaterBottle_alt.jpg", // Placeholder
        taxRate: 7.5, // Default tax rate
        discount: 0, // No discount
        weight: 0.4, // Estimated weight in kg
        length: 25.0, // Estimated length in cm
        width: 7.0, // Estimated width in cm
        height: 7.0, // Estimated height in cm
        notes: "Clean regularly to maintain copper shine.", // Placeholder note
    },
    {
        id: "6",
        name: "Yoga Mat",
        category: "Sports",
        price: 599,
        stock: 40,
        sku: "YM-008",
        barcode: "890123456796",
        image: "/images/pos/yogaMat.jpg",
        description: "Non-slip eco-friendly yoga mat",
        costPrice: 300,
        supplier: "Fitness Nigeria",
        reorderPoint: 8,
        lastUpdated: "2023-05-08",
        additionalImage: "/images/pos/yogaMat_alt.jpg", // Placeholder
        taxRate: 7.5, // Default tax rate
        discount: 5, // Small discount
        weight: 0.8, // Estimated weight in kg
        length: 180.0, // Estimated length in cm
        width: 60.0, // Estimated width in cm
        height: 0.5, // Estimated height in cm
        notes: "Ideal for all levels of yoga practice.", // Placeholder note
    },
    {
        id: "7",
        name: "Masala Chai Tea",
        category: "Food",
        price: 120,
        stock: 45,
        sku: "MCT-001",
        barcode: "890123456789",
        image: "/images/pos/masalaTea.jpg",
        description: "Premium blend of Indian spices and Assam tea leaves",
        costPrice: 60,
        supplier: "Himalayan Tea Exports",
        reorderPoint: 10,
        lastUpdated: "2023-05-01",
        additionalImage: "/images/pos/masalaTea_alt.jpg", // Placeholder
        taxRate: 0, // No tax on food (varies by region)
        discount: 0, // No discount
        weight: 0.25, // Estimated weight in kg
        length: 15.0, // Estimated length in cm
        width: 10.0, // Estimated width in cm
        height: 5.0, // Estimated height in cm
        notes: "Brew with milk for authentic taste.", // Placeholder note
    },
    {
        id: "8",
        name: "Handcrafted Leather Wallet",
        category: "Accessories",
        price: 899,
        stock: 65,
        sku: "HLW-004",
        barcode: "890123456792",
        image: "/images/products/leatherWallet.jpg",
        description: "Genuine leather wallet handcrafted by artisans from Rajasthan",
        costPrice: 450,
        supplier: "Rajasthan Handicrafts",
        reorderPoint: 15,
        lastUpdated: "2023-05-04",
        additionalImage: "/images/pos/leatherWallet_alt.jpg", // Placeholder
        taxRate: 7.5, // Default tax rate
        discount: 10, // Discount for accessories
        weight: 0.2, // Estimated weight in kg
        length: 12.0, // Estimated length in cm
        width: 9.0, // Estimated width in cm
        height: 1.0, // Estimated height in cm
        notes: "Limited edition design.", // Placeholder note
    },
];