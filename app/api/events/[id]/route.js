import { NextResponse } from "next/server"
import { getEventById } from "@/lib/db-server"

// GET event by ID
export async function GET(request, { params }) {
  try {
    const { id } = params
    const event = await getEventById(id)

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error("Error fetching event:", error)
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
  }
}
