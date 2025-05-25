"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Award, Calendar, Users } from "lucide-react"

export default function CommunityChallenges() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [challenges, setChallenges] = useState([])
  const [userChallenges, setUserChallenges] = useState([])

  useEffect(() => {
    fetchChallenges()
    fetchUserChallenges()
  }, [])

  const fetchChallenges = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/community/challenges")

      if (!response.ok) {
        throw new Error("Failed to fetch challenges")
      }

      const data = await response.json()
      setChallenges(data)
    } catch (error) {
      console.error("Error fetching challenges:", error)
      toast({
        title: "Error",
        description: "Failed to load challenges",
        variant: "destructive",
      })
      // Set placeholder data
      setChallenges([
        {
          _id: "1",
          name: "30-Day Movement Challenge",
          description: "Build a consistent exercise habit with daily movement goals",
          category: "Fitness",
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          participantCount: 156,
        },
        {
          _id: "2",
          name: "Mindful Meditation",
          description: "Practice daily meditation for improved mental clarity",
          category: "Mental Health",
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
          participantCount: 89,
        },
        {
          _id: "3",
          name: "Gratitude Journal Challenge",
          description: "Cultivate daily thankfulness by journaling",
          category: "Spiritual",
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          participantCount: 112,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserChallenges = async () => {
    try {
      const response = await fetch("/api/user/challenges")

      if (!response.ok) {
        throw new Error("Failed to fetch user challenges")
      }

      const data = await response.json()
      setUserChallenges(data)
    } catch (error) {
      console.error("Error fetching user challenges:", error)
      // Set placeholder data
      setUserChallenges([
        {
          _id: "uc1",
          challengeId: "1",
          progress: 40,
          joinedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          completed: false,
        },
      ])
    }
  }

  const joinChallenge = async (challengeId) => {
    try {
      const response = await fetch(`/api/community/challenges/${challengeId}/join`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to join challenge")
      }

      toast({
        title: "Success",
        description: "You've joined the challenge!",
      })

      // Refresh user challenges
      fetchUserChallenges()
    } catch (error) {
      console.error("Error joining challenge:", error)
      toast({
        title: "Error",
        description: "Failed to join challenge",
        variant: "destructive",
      })
    }
  }

  // Get active and completed challenges
  const activeChallenges = userChallenges.filter((uc) => !uc.completed)
  const completedChallenges = userChallenges.filter((uc) => uc.completed)

  // Map user challenges with challenge details
  const userChallengesWithDetails = userChallenges.map((uc) => {
    const challengeDetails = challenges.find((c) => c._id === uc.challengeId)
    return {
      ...uc,
      name: challengeDetails?.name || "Unknown Challenge",
      description: challengeDetails?.description || "",
      category: challengeDetails?.category || "General",
    }
  })

  if (isLoading) {
    return (
      <div className="container px-4 py-8 mx-auto max-w-6xl">
        <div className="text-center py-12">Loading challenges...</div>
      </div>
    )
  }

  return (
    <main className="container px-4 py-8 mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Wellness Challenges</h1>
          <p className="text-muted-foreground">Join challenges to improve your wellbeing</p>
        </div>
      </div>

      <Tabs defaultValue="available" className="space-y-6">
        <TabsList>
          <TabsTrigger value="available">Available Challenges</TabsTrigger>
          <TabsTrigger value="active">Your Active Challenges</TabsTrigger>
          <TabsTrigger value="completed">Completed Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => {
              const isJoined = userChallenges.some((uc) => uc.challengeId === challenge._id)

              return (
                <Card key={challenge._id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{challenge.name}</CardTitle>
                      <span className="px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">
                        {challenge.category}
                      </span>
                    </div>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        {new Date(challenge.startDate).toLocaleDateString()} -{" "}
                        {new Date(challenge.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{challenge.participantCount} participants</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isJoined ? (
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/community/challenges/${challenge._id}`}>View Progress</Link>
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => joinChallenge(challenge._id)}
                      >
                        Join Challenge
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          {activeChallenges.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="mb-4">You haven&apos;t joined any challenges yet.</p>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href="#available" onClick={() => document.querySelector('[value="available"]').click()}>
                    Browse Challenges
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userChallengesWithDetails
                .filter((uc) => !uc.completed)
                .map((challenge) => (
                  <Card key={challenge._id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{challenge.name}</CardTitle>
                        <span className="px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">
                          {challenge.category}
                        </span>
                      </div>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{challenge.progress}%</span>
                        </div>
                        <Progress value={challenge.progress} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Joined on {new Date(challenge.joinedAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/community/challenges/${challenge.challengeId}`}>Update Progress</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {completedChallenges.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p>You haven&apos;t completed any challenges yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userChallengesWithDetails
                .filter((uc) => uc.completed)
                .map((challenge) => (
                  <Card key={challenge._id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{challenge.name}</CardTitle>
                        <Award className="h-5 w-5 text-emerald-600" />
                      </div>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        Completed on {new Date(challenge.lastUpdated).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}
