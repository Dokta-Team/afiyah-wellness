"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download } from "lucide-react"

export default function LeadMagnet() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log("Email submitted:", email)
    setIsSubmitted(true)
  }

  return (
    <section className="w-full py-12 md:py-24 bg-emerald-50 dark:bg-emerald-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Download our 7-Day Stress-Reset Kit</CardTitle>
              <CardDescription>
                A concise e-book + audio pack that has helped 10,000 users cut stress scores by 20% in one week. Type
                your email and get it in seconds.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Download className="mr-2 h-4 w-4" />
                    Get Free Download
                  </Button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-100 dark:bg-emerald-900 rounded-md text-center">
                  <p className="font-medium text-emerald-800 dark:text-emerald-200">
                    Thank you! Check your email for your Stress-Reset Kit.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
