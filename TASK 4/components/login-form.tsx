// components/login-form.tsx
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

// This is a placeholder for a Server Action.
// In a real app, this would handle authentication logic, e.g.,
// interacting with a database (like MongoDB) or an auth provider.
async function authenticateUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === "user@example.com" && password === "password") {
        resolve({ success: true, message: "Login successful!" })
      } else {
        resolve({ success: false, message: "Invalid credentials." })
      }
    }, 1000)
  })
}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
    const result: any = await authenticateUser(formData) // Call the simulated Server Action

    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
        variant: "default",
      })
      // Redirect or update UI on successful login
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      })
    }
    setIsLoading(false)
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
