import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function FeaturedPrograms() {
  const programs = [
    {
      name: "Move",
      start: "May 20",
      description: "Daily 30-min live workouts, weekend city runs, wearable-synced streaks.",
    },
    {
      name: "Nourish",
      start: "June 3",
      description: "Dietitian-led meal plans, Afro-centric recipes, live cook-alongs.",
    },
    {
      name: "Unwind",
      start: "Ongoing",
      description: "Four-week stress-reset with CBT micro-lessons and bedtime wind-downs.",
    },
    {
      name: "Connect",
      start: "July 1",
      description: "Multi-faith reflection circles, values-clarity journaling, gratitude cohorts.",
    },
    {
      name: "Serve",
      start: "Quarterly",
      description: "Community service days & blood drives, tracked for CSR credits.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Programs</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Join our transformative programs designed to enhance every aspect of your wellbeing
          </p>
        </div>
        <div className="mt-12 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program</TableHead>
                <TableHead>Next Start</TableHead>
                <TableHead>What You'll Experience</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program) => (
                <TableRow key={program.name}>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>{program.start}</TableCell>
                  <TableCell>{program.description}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
