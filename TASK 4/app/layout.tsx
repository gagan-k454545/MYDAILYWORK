import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import EnhancedHeader from "@/components/enhanced-header"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ShopHub - Premium E-Commerce Experience",
  description:
    "Discover amazing products with seamless shopping experience, QR payments, and premium customer service.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex flex-col min-h-screen">
            <EnhancedHeader />
            <main className="flex-1">{children}</main>
            <footer className="bg-gray-900 text-white py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">ShopHub</h3>
                    <p className="text-gray-400 text-sm">
                      Your premium destination for quality products and exceptional shopping experience.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          Contact
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          FAQ
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          Shipping
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Categories</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          Electronics
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          Fashion
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          Home & Garden
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          Sports
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Connect</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          Facebook
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          Twitter
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          Instagram
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          LinkedIn
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                  <p>&copy; 2024 ShopHub. All rights reserved. Built with ❤️ using Next.js</p>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
