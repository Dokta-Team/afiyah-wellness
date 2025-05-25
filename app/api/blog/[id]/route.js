import { NextResponse } from "next/server"
import { getBlogPostById } from "@/lib/server-db"

// GET blog post by ID
export async function GET(request, { params }) {
  try {
    const { id } = params
    const post = await getBlogPostById(id)

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}
