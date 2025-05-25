import { NextResponse } from "next/server"
import { getProgramById, updateProgram, deleteProgram } from "@/lib/db-server"
import { getCurrentUser } from "@/lib/auth-server"

// GET program by ID
export async function GET(request, { params }) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { id } = params
    const program = await getProgramById(id)

    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 })
    }

    return NextResponse.json(program)
  } catch (error) {
    console.error("Error fetching program:", error)
    return NextResponse.json({ error: "Failed to fetch program" }, { status: 500 })
  }
}

// PUT update program
export async function PUT(request, { params }) {
  try {
    // Check authentication
    const user = await getCurrentUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { id } = params
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.description) {
      return NextResponse.json({ error: "Name and description are required" }, { status: 400 })
    }

    // Check if program exists
    const existingProgram = await getProgramById(id)
    if (!existingProgram) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 })
    }

    // Update program
    await updateProgram(id, data)

    // Get updated program
    const updatedProgram = await getProgramById(id)

    return NextResponse.json(updatedProgram)
  } catch (error) {
    console.error("Error updating program:", error)
    return NextResponse.json({ error: "Failed to update program" }, { status: 500 })
  }
}

// DELETE program
export async function DELETE(request, { params }) {
  try {
    // Check authentication
    const user = await getCurrentUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { id } = params

    // Check if program exists
    const existingProgram = await getProgramById(id)
    if (!existingProgram) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 })
    }

    // Delete program
    await deleteProgram(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting program:", error)
    return NextResponse.json({ error: "Failed to delete program" }, { status: 500 })
  }
}
