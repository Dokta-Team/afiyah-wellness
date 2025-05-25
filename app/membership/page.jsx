import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function MembershipPage() {
  const plans = [
    {
      name: "Explorer",
      price: "Free",
      description: "Curious newcomers",
      features: ["100 articles", "Community forums", "1 monthly challenge", "Event previews"],
      cta: "Join Free",
      popular: false,
    },
    {
      name: "Premium",
      price: "$9",
      description: "Personal growth seekers",
      features: [
        "Explorer + full content vault",
        "AI coach",
        "Unlimited challenges",
        "Discount club",
        "Monthly group webinars",
      ],
      cta: "Go Premium",
      popular: true,
    },
    {
      name: "Founder+",
      price: "$25",
      description: "Deep divers & early adopters",
      features: [
        "Premium + unlimited live classes",
        "Retreat priority",
        "One tele-consult per quarter",
        "VIP marketplace deals",
      ],
      cta: "Become a Founder",
      popular: false,
    },
    {
      name: "Corporate",
      price: "Custom",
      description: "Teams of 10+",
      features: [
        "Co-branded portal",
        "Anonymised analytics",
        "Quarterly workshops",
        "Policy templates",
        "Mental-health hotline",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Membership Plans</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              We benchmarked leading wellness apps like Headspace, which differentiate plans by content depth and live
              support. Building on those insights, Afiyah offers four friction-free tiers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {plans.map((plan) => (
              <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-emerald-600 shadow-lg" : ""}`}>
                {plan.popular && (
                  <div className="bg-emerald-600 text-white text-center py-1 text-sm font-medium">Most Popular</div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex items-baseline mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && plan.price !== "Custom" && (
                      <span className="ml-1 text-muted-foreground">/month</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <ul className="space-y-2 mb-6 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-emerald-600 mr-2 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Sliding-scale subsidies and donor-funded seats ensure no one is left behind.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
