import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"

export default function EventsPage() {
  const events = [
    {
      title: 'Quarterly Retreat — "RESET"',
      date: "September 15-17, 2023",
      location: "Nature Lodge, Abuja",
      description:
        "Three days in a nature lodge: sunrise hikes, silent breakfasts, spa hydrotherapy, and an evening bonfire where members share breakthrough moments.",
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      title: "Pop-Up Fitness Series",
      date: "Monthly",
      location: "Various Cities",
      description:
        "Park yoga, 5k charity runs, and Afro-dance flash mobs rotate through major cities, attracting passers-by and converting them into Explorers.",
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      title: "Afiyah LIVE Conference",
      date: "November 6-8, 2023",
      location: "Lagos Convention Center",
      description:
        "Our signature hybrid summit hosts 2,000 attendees on-site and unlimited virtual participants. Tracks cover women's health, mental resilience, spiritual leadership, and wellness entrepreneurship.",
      image: "/placeholder.svg?height=300&width=600",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Upcoming Events</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Join us for transformative in-person and virtual experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {events.map((event, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center mt-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Learn More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Want to Host an Afiyah Event?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              We partner with organizations to bring wellness experiences to communities around the world. Contact us to
              discuss hosting opportunities.
            </p>
            <Button variant="outline" className="gap-2">
              <Users className="h-4 w-4" />
              Contact Our Events Team
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
