import { NextResponse } from "next/server"
import { getForumThreadById, createForumPost } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { ObjectId } from "mongodb"

export async function POST(request, { params }) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const { content } = await request.json()

    // Validate input
    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    // Check if thread exists
    const thread = await getForumThreadById(id)
    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 })
    }

    // Check if thread is locked
    if (thread.isLocked) {
      return NextResponse.json({ error: "Thread is locked" }, { status: 403 })
    }

    // Create post
    const post = {
      _id: new ObjectId().toString(),
      threadId: id,
      content,
      authorId: user.userId,
      authorName: user.name,
      createdAt: new Date(),
      updatedAt: null,
      isEdited: false,
    }

    await createForumPost(post)

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating forum post:", error)
    return NextResponse.json({ error: "Failed to create forum post" }, { status: 500 })
  }
}
