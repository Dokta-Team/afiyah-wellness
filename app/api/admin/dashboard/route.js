import { NextResponse } from "next/server"
import { getAllBlogPosts, getAllPrograms, getAllEvents } from "@/lib/db"
import { isAdmin } from "@/lib/auth"

export async function GET() {
  // Check if user is admin
  const admin = await isAdmin()
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Fetch data
  const blogPosts = await getAllBlogPosts()
  const programs = await getAllPrograms()
  const events = await getAllEvents()

  return NextResponse.json({
    blogPosts,
    programs,
    events,
  })
}
