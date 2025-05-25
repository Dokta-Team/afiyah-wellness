import { NextResponse } from "next/server"
import { getMemberActivities } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  try {
    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const activities = await getMemberActivities(user.userId)
    return NextResponse.json(activities)
  } catch (error) {
    console.error("Error fetching member activities:", error)
    return NextResponse.json({ error: "Failed to fetch member activities" }, { status: 500 })
  }
}
