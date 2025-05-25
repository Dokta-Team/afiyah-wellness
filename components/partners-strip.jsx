import Image from "next/image"

export default function PartnersStrip() {
  const partners = [
    { name: "Local Hospital", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Transcorp Hilton", logo: "/placeholder.svg?height=60&width=120" },
    { name: "UN Global Compact", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Partner 4", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Partner 5", logo: "/placeholder.svg?height=60&width=120" },
  ]

  return (
    <section className="w-full py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h3 className="text-xl font-medium text-muted-foreground">Trusted by Leading Organizations</h3>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 mt-6">
          {partners.map((partner, index) => (
            <div key={index} className="relative h-12 w-24 md:w-32 opacity-70 hover:opacity-100 transition-opacity">
              <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
