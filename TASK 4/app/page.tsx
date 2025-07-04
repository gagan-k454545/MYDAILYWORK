// app/page.tsx
"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import ProductFilters from "@/components/product-filters"
import type { Product } from "@/lib/types"
import { toast } from "@/hooks/use-toast"

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products") // Fetch from your API route
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data: Product[] = await res.json()
        setAllProducts(data)
        setFilteredProducts(data) // Initialize filtered products with all products
      } catch (e: any) {
        setError(e.message)
        toast({
          title: "Error fetching products",
          description: "Could not load products. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-60px)]">
      <ProductFilters products={allProducts} onFilterChange={setFilteredProducts} />
      <main className="flex-1 p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        {filteredProducts.length === 0 ? (
          <div className="text-center text-muted-foreground py-10">No products found matching your criteria.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
