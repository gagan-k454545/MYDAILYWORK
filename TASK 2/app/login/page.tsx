import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { sql } from "@/lib/db"
import { setUserSession } from "@/lib/auth"
import Link from "next/link"
import type { User } from "@/lib/db"

async function loginUser(formData: FormData) {
  "use server"

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    throw new Error("Email and password are required")
  }

  try {
    const users = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    const user = users[0] as User

    if (!user) {
      throw new Error("Invalid credentials")
    }

    // Simple password verification (in production, use bcrypt)
    const expectedHash = `$2b$10$${Buffer.from(password).toString("base64")}`

    if (user.password_hash !== expectedHash) {
      throw new Error("Invalid credentials")
    }

    await setUserSession(user.id)

    if (user.user_type === "candidate") {
      redirect("/candidate/dashboard")
    } else {
      redirect("/employer/dashboard")
    }
  } catch (error) {
    console.error("Login error:", error)
    throw new Error("Login failed")
  }
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
