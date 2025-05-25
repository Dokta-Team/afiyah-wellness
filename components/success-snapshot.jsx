import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SuccessSnapshot() {
  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Member Success Snapshot</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">Real results from our community members</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Lami K." />
                <AvatarFallback>LK</AvatarFallback>
              </Avatar>
              <blockquote className="text-lg italic">
                "I joined to lose weight; I stayed because my anxiety finally has a safe home."
              </blockquote>
              <p className="font-medium">— Lami K., Lagos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="text-5xl font-bold text-emerald-600">16%</div>
              <p className="text-muted-foreground">
                Average increase in weekly activity minutes within the first 60 days of membership.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="text-5xl font-bold text-emerald-600">4,000+</div>
              <p className="text-muted-foreground">Prayer & meditation sessions logged last month.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
