// components/product-filters.tsx
"use client"

import { useState, useMemo, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { Product } from "@/lib/types"

interface ProductFiltersProps {
  products: Product[]
  onFilterChange: (filteredProducts: Product[]) => void
}

export default function ProductFilters({ products, onFilterChange }: ProductFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")

  const allCategories = useMemo(() => {
    const categories = new Set<string>()
    products.forEach((p) => categories.add(p.category))
    return Array.from(categories)
  }, [products])

  const allColors = useMemo(() => {
    const colors = new Set<string>()
    products.forEach((p) => colors.add(p.color))
    return Array.from(colors)
  }, [products])

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) => (checked ? [...prev, category] : prev.filter((c) => c !== category)))
  }

  const handleColorChange = (color: string, checked: boolean) => {
    setSelectedColors((prev) => (checked ? [...prev, color] : prev.filter((c) => c !== color)))
  }

  // ▶ Re-calculate filtered products only after render finishes
  useEffect(() => {
    const filtered = products.filter((product) => {
      // Category filter
      if (selectedCategories.length && !selectedCategories.includes(product.category)) return false
      // Color filter
      if (selectedColors.length && !selectedColors.includes(product.color)) return false
      // Price filter
      const price = product.price
      if (minPrice !== "" && price < Number(minPrice)) return false
      if (maxPrice !== "" && price > Number(maxPrice)) return false
      return true
    })
    onFilterChange(filtered)
  }, [products, selectedCategories, selectedColors, minPrice, maxPrice, onFilterChange])

  return (
    <div className="w-full md:w-64 p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <Accordion type="multiple" className="w-full" defaultValue={["category", "color", "price"]}>
        <AccordionItem value="category">
          <AccordionTrigger className="text-base">Category</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {allCategories.map((category) => (
                <Label key={category} className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  {category}
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="color">
          <AccordionTrigger className="text-base">Color</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {allColors.map((color) => (
                <Label key={color} className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={selectedColors.includes(color)}
                    onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                  />
                  {color}
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="text-base">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="min-price">Min</Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="max-price">Max</Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
