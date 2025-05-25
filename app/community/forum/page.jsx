"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Plus } from "lucide-react"

export default function CommunityForum() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/community/forum/categories")

      if (!response.ok) {
        throw new Error("Failed to fetch categories")
      }

      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
      toast({
        title: "Error",
        description: "Failed to load forum categories",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container px-4 py-8 mx-auto max-w-6xl">
        <div className="text-center py-12">Loading forum...</div>
      </div>
    )
  }

  // If no categories are found, show placeholder data
  const displayCategories =
    categories.length > 0
      ? categories
      : [
          {
            _id: "1",
            name: "General Discussion",
            description: "Talk about anything related to wellness and health",
            threadCount: 24,
            postCount: 142,
          },
          {
            _id: "2",
            name: "Fitness & Movement",
            description: "Share your fitness journey, tips, and questions",
            threadCount: 18,
            postCount: 97,
          },
          {
            _id: "3",
            name: "Nutrition & Diet",
            description: "Discuss healthy eating habits and dietary plans",
            threadCount: 15,
            postCount: 83,
          },
          {
            _id: "4",
            name: "Mental Wellbeing",
            description: "Support and resources for mental health",
            threadCount: 12,
            postCount: 76,
          },
          {
            _id: "5",
            name: "Spiritual Growth",
            description: "Explore spiritual practices and discussions",
            threadCount: 9,
            postCount: 54,
          },
        ]

  return (
    <main className="container px-4 py-8 mx-auto max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Community Forum</h1>
          <p className="text-muted-foreground">Connect with other members of the Afiyah community</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/community/forum/new-thread">
            <Plus className="mr-2 h-4 w-4" />
            New Thread
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        {displayCategories.map((category) => (
          <Card key={category._id}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-emerald-600" />
                <Link href={`/community/forum/category/${category._id}`} className="hover:text-emerald-600">
                  {category.name}
                </Link>
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">{category.threadCount}</span> threads &bull;{" "}
                  <span className="font-medium">{category.postCount}</span> posts
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/community/forum/category/${category._id}`}>View Threads</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
