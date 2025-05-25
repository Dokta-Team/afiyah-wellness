import { NextResponse } from "next/server"
import { createForumThread, getForumCategoryById, createForumPost } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { ObjectId } from "mongodb"

export async function POST(request) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content, categoryId } = await request.json()

    // Validate input
    if (!title || !content || !categoryId) {
      return NextResponse.json({ error: "Title, content, and category are required" }, { status: 400 })
    }

    // Check if category exists
    const category = await getForumCategoryById(categoryId)
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Create thread
    const thread = {
      _id: new ObjectId().toString(),
      title,
      categoryId,
      authorId: user.userId,
      authorName: user.name,
      createdAt: new Date(),
      lastActivityAt: new Date(),
      lastPostBy: user.name,
      viewCount: 0,
      postCount: 1,
      isPinned: false,
      isLocked: false,
    }

    const result = await createForumThread(thread)

    // Create first post
    const post = {
      _id: new ObjectId().toString(),
      threadId: thread._id,
      content,
      authorId: user.userId,
      authorName: user.name,
      createdAt: new Date(),
      updatedAt: null,
      isEdited: false,
    }

    await createForumPost(post)

    return NextResponse.json(thread, { status: 201 })
  } catch (error) {
    console.error("Error creating forum thread:", error)
    return NextResponse.json({ error: "Failed to create forum thread" }, { status: 500 })
  }
}
