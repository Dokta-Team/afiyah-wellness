import { NextResponse } from "next/server"
import { getAllPrograms } from "@/lib/db-server"

// GET all programs
export async function GET() {
  try {
    const programs = await getAllPrograms()
    return NextResponse.json(programs)
  } catch (error) {
    console.error("Error fetching programs:", error)
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 })
  }
}
