import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Our Story */}
      <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Story</h1>
          </div>
          <div className="mx-auto max-w-3xl mt-8 text-lg">
            <p className="mb-6">
              Afiyah was born when three friends—a sports physician, a mental-health counsellor, and an interfaith
              chaplain—noticed the same pattern: people excelled in one health domain but struggled to keep the others
              afloat. Drawing on the African ethic of Ubuntu ("I am because we are"), they designed a space where
              science, spirituality, and community reinforce one another instead of competing for attention.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Vision</h2>
              <p className="text-muted-foreground">
                To be the most trusted and transformative wellness community, empowering millions worldwide to thrive in
                body, mind, and spirit.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Mission</h2>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>
                  <span className="font-medium">Unite.</span> Convene credible experts, seekers, and allies in a single
                  digital sanctuary.
                </li>
                <li>
                  <span className="font-medium">Equip.</span> Translate cutting-edge research into simple, culturally
                  relevant tools.
                </li>
                <li>
                  <span className="font-medium">Engage.</span> Deliver immersive programs that make healthy living
                  social and fun.
                </li>
                <li>
                  <span className="font-medium">Elevate.</span> Drive advocacy and research that lift public-health
                  standards continent-wide.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <h3 className="text-xl font-bold">Integrity</h3>
                <p className="text-sm text-muted-foreground">Evidence first, hype last.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <h3 className="text-xl font-bold">Empathy</h3>
                <p className="text-sm text-muted-foreground">Every policy passed through a "human first" lens.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <h3 className="text-xl font-bold">Community</h3>
                <p className="text-sm text-muted-foreground">The collective rises when the individual is supported.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <h3 className="text-xl font-bold">Innovation</h3>
                <p className="text-sm text-muted-foreground">Mix behavioural science, AI, and ancestral wisdom.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                <h3 className="text-xl font-bold">Stewardship</h3>
                <p className="text-sm text-muted-foreground">
                  10% of net profit funds free care for low-income members.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
