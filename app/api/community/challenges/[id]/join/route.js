import { NextResponse } from "next/server"
import { getChallengeById, joinChallenge } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function POST(request, { params }) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    // Check if challenge exists
    const challenge = await getChallengeById(id)
    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 })
    }

    // Join challenge
    await joinChallenge(user.userId, id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error joining challenge:", error)
    return NextResponse.json({ error: "Failed to join challenge" }, { status: 500 })
  }
}
