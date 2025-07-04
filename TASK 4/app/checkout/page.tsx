"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCartStore } from "@/lib/cart-store"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { CreditCard, QrCode, Truck, Shield, ArrowLeft } from "lucide-react"
import QRPayment from "@/components/qr-payment"
import Link from "next/link"
import Image from "next/image"

export default function CheckoutPage() {
  const { items, getTotalPrice, getDiscountedTotal, clearCart } = useCartStore()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<"card" | "qr">("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = getTotalPrice()
  const discount = subtotal - getDiscountedTotal()
  const shipping = subtotal > 5000 ? 0 : 499.0 // Free shipping over Rs 5000
  const tax = getDiscountedTotal() * 0.18 // Assuming 18% GST for India
  const total = getDiscountedTotal() + shipping + tax

  const handleCardPayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsProcessing(true)

    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully! 🎉",
        description: "You will receive a confirmation email shortly.",
        variant: "default",
      })
      clearCart()
      router.push("/")
      setIsProcessing(false)
    }, 2000)
  }

  const handleQRPaymentComplete = () => {
    toast({
      title: "Payment Successful! 🎉",
      description: "Your order has been confirmed.",
      variant: "default",
    })
    clearCart()
    router.push("/")
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to your cart to proceed with checkout.</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase securely</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Section */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Secure Payment
                </CardTitle>
                <CardDescription>Your payment information is encrypted and secure</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "card" | "qr")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Card Payment
                    </TabsTrigger>
                    <TabsTrigger value="qr" className="flex items-center gap-2">
                      <QrCode className="h-4 w-4" />
                      QR Payment
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="space-y-6 mt-6">
                    <form onSubmit={handleCardPayment} className="space-y-4">
                      {/* Shipping Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Truck className="h-5 w-5" />
                          Shipping Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="John" required />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" required />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="john@example.com" required />
                        </div>
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" placeholder="123 Main St" required />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Anytown" required />
                          </div>
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input id="state" placeholder="CA" required />
                          </div>
                          <div>
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input id="zip" placeholder="12345" required />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Payment Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Payment Information
                        </h3>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required />
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 text-lg"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Processing...
                          </div>
                        ) : (
                          `Complete Payment - Rs ${total.toFixed(2)}`
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="qr" className="mt-6">
                    <QRPayment amount={total} onPaymentComplete={handleQRPaymentComplete} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>{items.length} items in your cart</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Image
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm">Rs {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>Rs {subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount:</span>
                      <span>-Rs {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? "FREE" : `Rs ${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (18% GST):</span>
                    <span>Rs {tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>Rs {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Shipping Info */}
                {shipping === 0 && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                    <Truck className="h-4 w-4" />
                    <span>Free shipping applied!</span>
                  </div>
                )}

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>256-bit SSL encrypted checkout</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
