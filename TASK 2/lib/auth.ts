import { cookies } from "next/headers"
import { sql } from "./db"
import type { User } from "./db"

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id")?.value

    if (!userId) {
      return null
    }

    const users = await sql`
      SELECT * FROM users WHERE id = ${userId}
    `

    return (users[0] as User) || null
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function setUserSession(userId: number) {
  const cookieStore = await cookies()
  cookieStore.set("user_id", userId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function clearUserSession() {
  const cookieStore = await cookies()
  cookieStore.delete("user_id")
}
