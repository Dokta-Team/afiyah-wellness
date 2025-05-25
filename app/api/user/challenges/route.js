import { NextResponse } from "next/server"
import { getUserChallenges } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  try {
    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const challenges = await getUserChallenges(user.userId)
    return NextResponse.json(challenges)
  } catch (error) {
    console.error("Error fetching user challenges:", error)
    return NextResponse.json({ error: "Failed to fetch user challenges" }, { status: 500 })
  }
}
