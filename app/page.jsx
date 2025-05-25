import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Calendar } from "lucide-react"
import SuccessSnapshot from "@/components/success-snapshot"
import FeaturedPrograms from "@/components/featured-programs"
import PartnersStrip from "@/components/partners-strip"
import LeadMagnet from "@/components/lead-magnet"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full py-20 bg-gradient-to-r from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Thrive in Body, Mind & Spirit—Together.
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Modern life can fragment your wellbeing. At Afiyah, we braid physical fitness, psychological resilience,
                and spiritual growth into one seamless journey—rooted in African communal values, open to the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  Join Afiyah Free
                </Button>
                <Button size="lg" variant="outline">
                  Watch a 90-Second Tour
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="Afiyah wellness community"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Afiyah? */}
      <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Afiyah?</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              A holistic approach to wellness that integrates all aspects of your health journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900">
                  <Heart className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">360° Wellbeing</h3>
                <p className="text-muted-foreground">
                  From heart-pumping workouts to guided forgiveness meditations, we cover every dimension of health so
                  you never have to juggle multiple apps or gurus again.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900">
                  <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">Peer + Pro Support</h3>
                <p className="text-muted-foreground">
                  Ask questions in moderated forums, book certified clinicians, or chat with multi-faith
                  chaplains—whenever life throws you a curveball.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900">
                  <Calendar className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">Hybrid Community</h3>
                <p className="text-muted-foreground">
                  Daily digital touchpoints keep you consistent; quarterly retreats and pop-up events turn online
                  friendships into lifelong bonds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Member Success Snapshot */}
      <SuccessSnapshot />

      {/* Featured Programs */}
      <FeaturedPrograms />

      {/* Partners & Press Strip */}
      <PartnersStrip />

      {/* Lead Magnet */}
      <LeadMagnet />
    </main>
  )
}
