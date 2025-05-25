import { NextResponse } from "next/server"
import { getAllForumCategories } from "@/lib/db"
import { isAuthenticated } from "@/lib/auth"

export async function GET() {
  try {
    // Check if user is authenticated
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const categories = await getAllForumCategories()
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching forum categories:", error)
    return NextResponse.json({ error: "Failed to fetch forum categories" }, { status: 500 })
  }
}
