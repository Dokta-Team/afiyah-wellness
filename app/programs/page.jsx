import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, Trophy, Users } from "lucide-react"

export default function ProgramsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Programs & Resources</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Comprehensive wellness resources designed to support your journey
            </p>
          </div>

          <Tabs defaultValue="knowledge" className="mt-12">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="knowledge">Knowledge Hub</TabsTrigger>
              <TabsTrigger value="live">Live & On-Demand</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="practitioners">Practitioner Network</TabsTrigger>
            </TabsList>

            <TabsContent value="knowledge" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Knowledge Hub
                  </CardTitle>
                  <CardDescription>Curated content to support your wellness journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Expert Articles & Blogs</h3>
                    <p className="text-muted-foreground">
                      Every piece passes a double review (medical + cultural). Footnotes link to PubMed so members can
                      dig deeper.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Multimedia Library</h3>
                    <p className="text-muted-foreground">
                      Bite-size videos, audio meditations, and printable cheat-sheets support varied learning styles.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Weekly Research Round-Up</h3>
                    <p className="text-muted-foreground">
                      A Sunday digest filters 50+ journals into three actionable takeaways so members stay ahead without
                      drowning.
                    </p>
                  </div>

                  <Button className="bg-emerald-600 hover:bg-emerald-700">Browse Knowledge Hub</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="live" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Video className="mr-2 h-5 w-5" />
                    Live & On-Demand
                  </CardTitle>
                  <CardDescription>Interactive sessions and recorded content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Our studio streams up to 12 live classes daily, covering HIIT, yoga, Tai Chi, breath-work, and
                    interfaith prayer. All sessions land in a searchable replay vault minutes after airing.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">HIIT Workouts</h4>
                        <p className="text-sm text-muted-foreground">
                          High-intensity interval training for maximum results
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">Yoga & Meditation</h4>
                        <p className="text-sm text-muted-foreground">Find balance and inner peace</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">Interfaith Prayer</h4>
                        <p className="text-sm text-muted-foreground">Spiritual growth across traditions</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Button className="bg-emerald-600 hover:bg-emerald-700">View Schedule</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="challenges" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="mr-2 h-5 w-5" />
                    Challenges & Gamification
                  </CardTitle>
                  <CardDescription>Make wellness fun and engaging</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Borrowing best practices from gamified wellness platforms, Afiyah's app awards points, streak
                    badges, and coupon codes for tasks like logging 10,000 steps, sharing gratitude posts, or completing
                    devotional readings.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">30-Day Movement Challenge</h4>
                        <p className="text-sm text-muted-foreground">Build a consistent exercise habit</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">Gratitude Journal Challenge</h4>
                        <p className="text-sm text-muted-foreground">Cultivate daily thankfulness</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Button className="bg-emerald-600 hover:bg-emerald-700">Join a Challenge</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practitioners" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Practitioner Network
                  </CardTitle>
                  <CardDescription>Connect with certified professionals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Members browse verified profiles—complete with credentials, price ranges, and star ratings—then book
                    video consults in a HIPAA/GDPR-secure portal. Follow-up notes sync to their personal dashboard,
                    creating one longitudinal health record.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">Nutritionists</h4>
                        <p className="text-sm text-muted-foreground">Personalized dietary guidance</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">Mental Health Counselors</h4>
                        <p className="text-sm text-muted-foreground">Professional psychological support</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium">Spiritual Guides</h4>
                        <p className="text-sm text-muted-foreground">Multi-faith chaplains and mentors</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Button className="bg-emerald-600 hover:bg-emerald-700">Find a Practitioner</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}
