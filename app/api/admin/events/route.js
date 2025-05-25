import { NextResponse } from "next/server"
import { getAllEvents, createEvent } from "@/lib/db-server"
import { getCurrentUser } from "@/lib/auth-server"
import { ObjectId } from "mongodb"

// GET all events
export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const events = await getAllEvents()
    return NextResponse.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

// POST new event
export async function POST(request) {
  try {
    // Check authentication
    const user = await getCurrentUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.date || !data.location) {
      return NextResponse.json({ error: "Title, date, and location are required" }, { status: 400 })
    }

    // Prepare event data
    const event = {
      _id: new ObjectId().toString(),
      title: data.title,
      date: data.date,
      endDate: data.endDate || null,
      location: data.location,
      description: data.description || "",
      image: data.image || null,
      capacity: data.capacity || null,
      registrationUrl: data.registrationUrl || null,
      featured: data.featured || false,
    }

    await createEvent(event)

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
