import { NextResponse } from "next/server"
import { registerUser } from "@/lib/server-auth-actions"
import { generateToken } from "@/lib/auth-utils"
import { setAuthCookie } from "@/lib/server-auth"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Register user
    const user = await registerUser({ name, email, password })

    // Generate token
    const token = generateToken(user)

    // Set cookie
    setAuthCookie(token)

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
