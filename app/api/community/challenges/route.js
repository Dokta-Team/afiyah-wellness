import { NextResponse } from "next/server"
import { getAllChallenges } from "@/lib/db"
import { isAuthenticated } from "@/lib/auth"

export async function GET() {
  try {
    // Check if user is authenticated
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const challenges = await getAllChallenges()
    return NextResponse.json(challenges)
  } catch (error) {
    console.error("Error fetching challenges:", error)
    return NextResponse.json({ error: "Failed to fetch challenges" }, { status: 500 })
  }
}
