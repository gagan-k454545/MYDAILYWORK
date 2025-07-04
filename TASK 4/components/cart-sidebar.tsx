"use client"

import { ShoppingCart, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCartStore()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-transparent">
          <ShoppingCart className="h-5 w-5" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {getTotalItems()}
            </span>
          )}
          <span className="sr-only">View cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({getTotalItems()})</SheetTitle>
        </SheetHeader>
        <Separator />
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow text-muted-foreground">
            <ShoppingCart className="h-16 w-16 mb-4" />
            <p>Your cart is empty.</p>
            <Link href="/">
              <Button variant="link" className="mt-4">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-b-0">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-muted-foreground text-xs">Rs {item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Label htmlFor={`quantity-${item.id}`} className="sr-only">
                        Quantity
                      </Label>
                      <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                        className="w-16 h-8 text-center"
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                  <div className="font-semibold text-right">Rs {(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-4 border-t">
              <div className="flex justify-between items-center text-lg font-semibold mb-4">
                <span>Total:</span>
                <span>Rs {getTotalPrice().toFixed(2)}</span>
              </div>
              <Link href="/checkout">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
              <Button
                variant="outline"
                className="w-full mt-2 bg-transparent"
                onClick={() => useCartStore.getState().clearCart()}
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
