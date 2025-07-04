import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sql } from "@/lib/db"
import { setUserSession } from "@/lib/auth"
import Link from "next/link"

async function registerUser(formData: FormData) {
  "use server"

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const userType = formData.get("userType") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const companyName = formData.get("companyName") as string
  const phone = formData.get("phone") as string

  if (!email || !password || !userType || !firstName || !lastName) {
    throw new Error("Missing required fields")
  }

  try {
    // Simple password hashing (in production, use bcrypt)
    const passwordHash = `$2b$10$${Buffer.from(password).toString("base64")}`

    const result = await sql`
      INSERT INTO users (email, password_hash, user_type, first_name, last_name, company_name, phone)
      VALUES (${email}, ${passwordHash}, ${userType}, ${firstName}, ${lastName}, ${companyName || null}, ${phone || null})
      RETURNING id
    `

    const userId = result[0].id
    await setUserSession(userId)

    if (userType === "candidate") {
      // Create candidate profile
      await sql`
        INSERT INTO candidate_profiles (user_id)
        VALUES (${userId})
      `
      redirect("/candidate/dashboard")
    } else {
      redirect("/employer/dashboard")
    }
  } catch (error) {
    console.error("Registration error:", error)
    throw new Error("Registration failed")
  }
}

interface RegisterPageProps {
  searchParams: Promise<{ type?: string }>
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams
  const defaultUserType = params.type || "candidate"

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Join our platform to find your next opportunity or hire top talent.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={registerUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userType">I am a</Label>
              <Select name="userType" defaultValue={defaultUserType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="candidate">Job Seeker</SelectItem>
                  <SelectItem value="employer">Employer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name (Optional)</Label>
              <Input id="companyName" name="companyName" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input id="phone" name="phone" type="tel" />
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
