import { NextResponse } from "next/server"
import { getAllBlogPosts, createBlogPost } from "@/lib/server-db"
import { getCurrentUser } from "@/lib/server-auth"

// GET all blog posts
export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const posts = await getAllBlogPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

// POST new blog post
export async function POST(request) {
  try {
    // Check authentication
    const user = await getCurrentUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Prepare blog post data
    const blogPost = {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt || "",
      category: data.category || "Uncategorized",
      tags: data.tags || [],
      author: data.author || user.email,
      image: data.image || null,
      date: data.date || new Date().toISOString(),
      published: data.published !== undefined ? data.published : true,
    }

    const createdPost = await createBlogPost(blogPost)

    return NextResponse.json(createdPost, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
