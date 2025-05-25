import { NextResponse } from "next/server"
import { getChallengeById, updateChallengeProgress } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function POST(request, { params }) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const { progress } = await request.json()

    // Validate input
    if (progress === undefined || progress < 0 || progress > 100) {
      return NextResponse.json({ error: "Valid progress (0-100) is required" }, { status: 400 })
    }

    // Check if challenge exists
    const challenge = await getChallengeById(id)
    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 })
    }

    // Update progress
    await updateChallengeProgress(user.userId, id, progress)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating challenge progress:", error)
    return NextResponse.json({ error: "Failed to update challenge progress" }, { status: 500 })
  }
}
