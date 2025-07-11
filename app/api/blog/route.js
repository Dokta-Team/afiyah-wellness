import { NextResponse } from "next/server"
import { getAllBlogPosts } from "@/lib/server-db"

// GET all blog posts
export async function GET() {
  try {
    const posts = await getAllBlogPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
