import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { CartItem, Product } from "./types"

interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getDiscountedTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          } else {
            return { items: [...state.items, { ...product, quantity: 1 }] }
          }
        })
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items
            .map((item) => (item.id === productId ? { ...item, quantity: quantity } : item))
            .filter((item) => item.quantity > 0),
        }))
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      getDiscountedTotal: () => {
        const total = get().getTotalPrice()
        // Apply 10% discount for orders over Rs 5000
        return total > 5000 ? total * 0.9 : total
      },
    }),
    {
      name: "ecommerce-cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
