import { NextResponse } from "next/server"
import { getProgramById } from "@/lib/db-server"

// GET program by ID
export async function GET(request, { params }) {
  try {
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
