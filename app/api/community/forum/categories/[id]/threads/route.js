import { NextResponse } from "next/server"
import { getForumThreadsByCategory, getForumCategoryById } from "@/lib/db"
import { isAuthenticated } from "@/lib/auth"

export async function GET(request, { params }) {
  try {
    // Check if user is authenticated
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    // Check if category exists
    const category = await getForumCategoryById(id)
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    const threads = await getForumThreadsByCategory(id)
    return NextResponse.json(threads)
  } catch (error) {
    console.error("Error fetching forum threads:", error)
    return NextResponse.json({ error: "Failed to fetch forum threads" }, { status: 500 })
  }
}
