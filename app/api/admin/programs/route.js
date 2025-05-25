import { NextResponse } from "next/server"
import { getAllPrograms, createProgram } from "@/lib/db-server"
import { getCurrentUser } from "@/lib/auth-server"
import { ObjectId } from "mongodb"

// GET all programs
export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const programs = await getAllPrograms()
    return NextResponse.json(programs)
  } catch (error) {
    console.error("Error fetching programs:", error)
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 })
  }
}

// POST new program
export async function POST(request) {
  try {
    // Check authentication
    const user = await getCurrentUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.description) {
      return NextResponse.json({ error: "Name and description are required" }, { status: 400 })
    }

    // Prepare program data
    const program = {
      _id: new ObjectId().toString(),
      name: data.name,
      description: data.description,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      details: data.details || "",
      image: data.image || null,
      category: data.category || "General",
      featured: data.featured || false,
    }

    await createProgram(program)

    return NextResponse.json(program, { status: 201 })
  } catch (error) {
    console.error("Error creating program:", error)
    return NextResponse.json({ error: "Failed to create program" }, { status: 500 })
  }
}
