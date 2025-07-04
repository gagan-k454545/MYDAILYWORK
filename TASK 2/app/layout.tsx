import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JobIndia - Find Jobs in India | Top Indian Companies",
  description:
    "India's leading job portal. Connect with top Indian companies like TCS, Infosys, Flipkart, Zomato. Find jobs in Bangalore, Mumbai, Delhi, Hyderabad and more.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Toaster />

        {/* Footer */}
        <footer className="bg-muted/50 border-t py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-4">
                  <span className="text-orange-600">Job</span>
                  <span className="text-green-600">India</span>
                </h3>
                <p className="text-sm text-muted-foreground">
                  India's leading job portal connecting talented professionals with amazing opportunities across the
                  country.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-4">For Job Seekers</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="/jobs" className="hover:text-primary">
                      Browse Jobs
                    </a>
                  </li>
                  <li>
                    <a href="/register?type=candidate" className="hover:text-primary">
                      Create Account
                    </a>
                  </li>
                  <li>
                    <a href="/candidate/dashboard" className="hover:text-primary">
                      Dashboard
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">For Employers</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="/employer/post-job" className="hover:text-primary">
                      Post a Job
                    </a>
                  </li>
                  <li>
                    <a href="/register?type=employer" className="hover:text-primary">
                      Create Account
                    </a>
                  </li>
                  <li>
                    <a href="/employer/dashboard" className="hover:text-primary">
                      Dashboard
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 JobBoard. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
