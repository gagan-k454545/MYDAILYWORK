"use client"

import { useCartStore } from "@/lib/cart-store"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, X } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] text-muted-foreground">
        <ShoppingCart className="h-24 w-24 mb-6" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <div className="border rounded-lg p-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-b-0">
              <Image
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-md object-cover"
              />
              <div className="flex-grow grid gap-1">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
                <p className="font-semibold">Rs {item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor={`quantity-${item.id}`} className="sr-only">
                  Quantity
                </Label>
                <Input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                  className="w-20 h-10 text-center"
                />
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Remove item</span>
                </Button>
              </div>
              <div className="font-bold text-lg text-right w-24">Rs {(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4 bg-transparent" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
      <div className="md:col-span-1">
        <div className="border rounded-lg p-6 sticky top-8">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between items-center text-lg mb-2">
            <span>Subtotal:</span>
            <span>Rs {getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-lg mb-4">
            <span>Shipping:</span>
            <span>Rs 0.00</span> {/* Placeholder for shipping */}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between items-center text-xl font-bold mb-6">
            <span>Total:</span>
            <span>Rs {getTotalPrice().toFixed(2)}</span>
          </div>
          <Link href="/checkout">
            <Button className="w-full">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
