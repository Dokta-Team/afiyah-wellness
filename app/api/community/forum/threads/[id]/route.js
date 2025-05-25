import { NextResponse } from "next/server"
import { getForumThreadById, getForumPostsByThread } from "@/lib/db"
import { isAuthenticated } from "@/lib/auth"

export async function GET(request, { params }) {
  try {
    // Check if user is authenticated
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    // Get thread
    const thread = await getForumThreadById(id)
    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 })
    }

    // Get posts
    const posts = await getForumPostsByThread(id)

    return NextResponse.json({ thread, posts })
  } catch (error) {
    console.error("Error fetching forum thread:", error)
    return NextResponse.json({ error: "Failed to fetch forum thread" }, { status: 500 })
  }
}
