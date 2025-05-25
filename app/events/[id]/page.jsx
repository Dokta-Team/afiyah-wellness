import { getEventById } from "@/lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin } from "lucide-react"

export default async function EventDetail({ params }) {
  const { id } = params
  const event = await getEventById(id)

  if (!event) {
    notFound()
  }

  return (
    <main className="flex flex-col min-h-screen">
      <div className="container px-4 md:px-6 py-12 max-w-4xl mx-auto">
        <Button variant="outline" size="sm" asChild className="mb-6">
          <Link href="/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[300px] md:h-full rounded-lg overflow-hidden">
            <Image
              src={event.image || "/placeholder.svg?height=600&width=800"}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{event.title}</h1>

            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
                {event.endDate && <span> - {new Date(event.endDate).toLocaleDateString()}</span>}
              </div>

              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">About this Event</h2>
              <p>{event.description}</p>
            </div>

            {event.registrationUrl && (
              <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                  Register for this Event
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
