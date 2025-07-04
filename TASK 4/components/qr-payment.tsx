"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, Smartphone, Wallet, CheckCircle } from "lucide-react"
import Image from "next/image"

interface QRPaymentProps {
  amount: number
  onPaymentComplete: () => void
}

export default function QRPayment({ amount, onPaymentComplete }: QRPaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("")
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "completed">("idle")

  const paymentMethods = [
    {
      id: "paypal",
      name: "PayPal",
      type: "qr",
      icon: "💳",
      description: "Scan QR code with PayPal app",
      qrData: `paypal://pay?amount=${amount}&currency=INR`, // Updated currency to INR
    },
    {
      id: "venmo",
      name: "Venmo",
      type: "qr",
      icon: "📱",
      description: "Scan with Venmo app",
      qrData: `venmo://pay?amount=${amount}`,
    },
    {
      id: "cashapp",
      name: "Cash App",
      type: "qr",
      icon: "💰",
      description: "Scan with Cash App",
      qrData: `cashapp://pay?amount=${amount}`,
    },
    {
      id: "applepay",
      name: "Apple Pay",
      type: "digital",
      icon: "🍎",
      description: "Pay with Touch ID or Face ID",
      qrData: null,
    },
    {
      id: "googlepay",
      name: "Google Pay",
      type: "digital",
      icon: "🔍",
      description: "Pay with Google Pay",
      qrData: null,
    },
  ]

  const handlePayment = async (methodId: string) => {
    setSelectedMethod(methodId)
    setPaymentStatus("processing")

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("completed")
      setTimeout(() => {
        onPaymentComplete()
      }, 2000)
    }, 3000)
  }

  const generateQRCode = (data: string) => {
    // In a real app, you'd use a QR code library like qrcode
    // For demo purposes, we'll use a placeholder QR code image
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`
  }

  if (paymentStatus === "completed") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
          <p className="text-muted-foreground">Your order has been confirmed</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <QrCode className="h-6 w-6" />
          Choose Payment Method
        </CardTitle>
        <CardDescription>
          Total Amount: <span className="text-2xl font-bold text-primary">Rs {amount.toFixed(2)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="qr" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="qr" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              QR Payments
            </TabsTrigger>
            <TabsTrigger value="digital" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Digital Wallets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="qr" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods
                .filter((method) => method.type === "qr")
                .map((method) => (
                  <Card
                    key={method.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedMethod === method.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => selectedMethod !== method.id && handlePayment(method.id)}
                  >
                    <CardContent className="p-4 text-center">
                      {paymentStatus === "processing" && selectedMethod === method.id ? (
                        <div className="space-y-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                          <p className="text-sm">Processing payment...</p>
                        </div>
                      ) : (
                        <>
                          <div className="text-4xl mb-2">{method.icon}</div>
                          <h3 className="font-semibold">{method.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{method.description}</p>

                          {selectedMethod === method.id && method.qrData && (
                            <div className="space-y-4">
                              <Image
                                src={generateQRCode(method.qrData) || "/placeholder.svg"}
                                alt={`${method.name} QR Code`}
                                width={200}
                                height={200}
                                className="mx-auto border rounded-lg"
                              />
                              <Badge variant="outline" className="text-xs">
                                Scan with {method.name} app
                              </Badge>
                            </div>
                          )}

                          {selectedMethod !== method.id && (
                            <Button variant="outline" className="w-full bg-transparent">
                              Select {method.name}
                            </Button>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="digital" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods
                .filter((method) => method.type === "digital")
                .map((method) => (
                  <Card
                    key={method.id}
                    className="cursor-pointer transition-all duration-200 hover:shadow-lg"
                    onClick={() => handlePayment(method.id)}
                  >
                    <CardContent className="p-6 text-center">
                      {paymentStatus === "processing" && selectedMethod === method.id ? (
                        <div className="space-y-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                          <p className="text-sm">Processing payment...</p>
                        </div>
                      ) : (
                        <>
                          <div className="text-4xl mb-4">{method.icon}</div>
                          <h3 className="font-semibold text-lg mb-2">{method.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            Pay with {method.name}
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Wallet className="h-4 w-4" />
            <span>Secure payment powered by 256-bit SSL encryption</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
