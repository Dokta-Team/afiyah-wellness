import { getProgramById } from "@/lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"

export default async function ProgramDetail({ params }) {
  const { id } = params
  const program = await getProgramById(id)

  if (!program) {
    notFound()
  }

  return (
    <main className="flex flex-col min-h-screen">
      <div className="container px-4 md:px-6 py-12 max-w-4xl mx-auto">
        <Button variant="outline" size="sm" asChild className="mb-6">
          <Link href="/programs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Programs
          </Link>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[300px] md:h-full rounded-lg overflow-hidden">
            <Image
              src={program.image || "/placeholder.svg?height=600&width=800"}
              alt={program.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{program.name}</h1>

            {program.startDate && (
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Starts: {new Date(program.startDate).toLocaleDateString()}</span>
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">About this Program</h2>
              <p>{program.description}</p>

              {program.details && (
                <div className="mt-4">
                  {program.details.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <Button className="bg-emerald-600 hover:bg-emerald-700">Register for this Program</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
