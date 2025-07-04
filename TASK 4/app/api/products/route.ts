import { NextResponse } from "next/server"
import type { Product } from "@/lib/types"

const products: Product[] = [
  {
    id: "prod1",
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.",
    price: 14999.0, // Adjusted to a typical INR price range
    originalPrice: 19999.0,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    category: "Electronics",
    color: "Black",
    rating: 4.8,
    reviewCount: 1247,
    inStock: true,
    brand: "AudioTech",
    tags: ["bestseller", "premium"],
  },
  {
    id: "prod2",
    name: "Smart Fitness Watch",
    description:
      "Track your health and fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and 7-day battery life.",
    price: 22999.0,
    originalPrice: 29999.0,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    category: "Electronics",
    color: "Silver",
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    brand: "FitTech",
    tags: ["new", "fitness"],
  },
  {
    id: "prod3",
    name: "Organic Cotton T-Shirt",
    description:
      "Sustainably made from 100% organic cotton, this comfortable t-shirt is perfect for everyday wear with a relaxed fit.",
    price: 1499.0,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    category: "Apparel",
    color: "White",
    rating: 4.4,
    reviewCount: 324,
    inStock: true,
    brand: "EcoWear",
    tags: ["sustainable", "organic"],
  },
  {
    id: "prod4",
    name: "Ergonomic Office Chair",
    description:
      "Designed for maximum comfort during long work sessions with lumbar support, adjustable height, and breathable mesh back.",
    price: 25999.0,
    originalPrice: 34999.0,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    category: "Home & Office",
    color: "Grey",
    rating: 4.7,
    reviewCount: 567,
    inStock: true,
    brand: "ComfortPlus",
    tags: ["ergonomic", "office"],
  },
  {
    id: "prod5",
    name: "Portable Coffee Maker",
    description:
      "Brew perfect coffee anywhere with this compact, battery-powered espresso maker. Compatible with ground coffee and pods.",
    price: 6999.0,
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    category: "Kitchen",
    color: "Black",
    rating: 4.3,
    reviewCount: 198,
    inStock: true,
    brand: "BrewMaster",
    tags: ["portable", "coffee"],
  },
  {
    id: "prod6",
    name: "Wireless Gaming Mouse",
    description:
      "High-precision gaming mouse with customizable RGB lighting, 16000 DPI sensor, and ultra-fast wireless connectivity.",
    price: 5999.0,
    originalPrice: 7999.0,
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
    category: "Electronics",
    color: "Black",
    rating: 4.9,
    reviewCount: 1456,
    inStock: true,
    brand: "GamePro",
    tags: ["gaming", "rgb"],
  },
  {
    id: "prod7",
    name: "Leather Crossbody Bag",
    description:
      "Handcrafted genuine leather crossbody bag with multiple compartments, perfect for daily use or travel.",
    price: 9999.0,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    category: "Accessories",
    color: "Brown",
    rating: 4.5,
    reviewCount: 289,
    inStock: true,
    brand: "LeatherCraft",
    tags: ["handmade", "leather"],
  },
  {
    id: "prod8",
    name: "Insulated Water Bottle",
    description:
      "Keep drinks cold for 24 hours or hot for 12 hours with this double-wall vacuum insulated stainless steel bottle.",
    price: 2499.0,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop",
    category: "Sports & Outdoors",
    color: "Blue",
    rating: 4.6,
    reviewCount: 743,
    inStock: true,
    brand: "HydroFlow",
    tags: ["insulated", "eco-friendly"],
  },
  {
    id: "prod9",
    name: "Bluetooth Speaker",
    description:
      "Portable waterproof Bluetooth speaker with 360-degree sound, 20-hour battery life, and built-in power bank.",
    price: 11999.0,
    originalPrice: 14999.0,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    category: "Electronics",
    color: "Blue",
    rating: 4.7,
    reviewCount: 634,
    inStock: false,
    brand: "SoundWave",
    tags: ["waterproof", "portable"],
  },
  {
    id: "prod10",
    name: "Yoga Mat Premium",
    description:
      "Non-slip premium yoga mat made from eco-friendly TPE material, perfect for all types of yoga and exercise.",
    price: 4499.0,
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    category: "Sports & Outdoors",
    color: "Purple",
    rating: 4.4,
    reviewCount: 412,
    inStock: true,
    brand: "ZenFit",
    tags: ["yoga", "eco-friendly", "new"],
  },
]

export async function GET() {
  try {
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
