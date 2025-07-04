export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  imageUrl: string
  category: string
  color: string
  rating: number
  reviewCount: number
  inStock: boolean
  brand: string
  tags: string[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface PaymentMethod {
  id: string
  name: string
  type: "card" | "digital" | "qr"
  icon: string
  description: string
}
