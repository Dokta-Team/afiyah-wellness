import { getCurrentUser } from "@/lib/auth";
import {
  getMemberActivities,
  getUserChallenges,
  getAllChallenges,
} from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Activity, Award, Calendar, MessageSquare, Users } from "lucide-react";

export default async function MemberDashboard() {
  const user = await getCurrentUser();
  if (!user) {
    console.log("User is invalid"); // or show an error message
    return null;
  }
  const activities = await getMemberActivities(user.userId, 5);
  const userChallenges = await getUserChallenges(user.userId);
  const allChallenges = await getAllChallenges();

  // Get active challenges
  const activeChallenges = userChallenges.filter((uc) => !uc.completed);

  // Map user challenges with challenge details
  const challengesWithDetails = activeChallenges.map((uc) => {
    const challengeDetails = allChallenges.find(
      (c) => c._id === uc.challengeId
    );
    return {
      ...uc,
      name: challengeDetails?.name || "Unknown Challenge",
      description: challengeDetails?.description || "",
      category: challengeDetails?.category || "General",
    };
  });

  // Get upcoming events (placeholder)
  const upcomingEvents = [
    {
      id: "1",
      title: 'Quarterly Retreat — "RESET"',
      date: "September 15-17, 2023",
      location: "Nature Lodge, Abuja",
    },
    {
      id: "2",
      title: "Meditation Workshop",
      date: "August 25, 2023",
      location: "Virtual",
    },
  ];

  return (
    <main className="container px-4 py-8 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
          <p className="text-muted-foreground">
            Your wellness journey dashboard
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/community/profile">View Profile</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="h-4 w-4 mr-2 text-emerald-600" />
              Active Challenges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeChallenges.length}</div>
            <p className="text-xs text-muted-foreground">
              Challenges in progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-emerald-600" />
              Community Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Forum contributions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Award className="h-4 w-4 mr-2 text-emerald-600" />
              Membership
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {user.membershipType}
            </div>
            <p className="text-xs text-muted-foreground">Current plan</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="challenges" className="space-y-4">
        <TabsList>
          <TabsTrigger value="challenges">Active Challenges</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="challenges" className="space-y-4">
          {challengesWithDetails.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="mb-4">
                  You haven&apos;t joined any challenges yet.
                </p>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/community/challenges">Browse Challenges</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            challengesWithDetails.map((challenge) => (
              <Card key={challenge._id}>
                <CardHeader className="pb-2">
                  <CardTitle>{challenge.name}</CardTitle>
                  <CardDescription>{challenge.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button asChild variant="outline" size="sm">
                      <Link
                        href={`/community/challenges/${challenge.challengeId}`}
                      >
                        View Challenge
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        <TabsContent value="events" className="space-y-4">
          {upcomingEvents.map((event) => (
            <Card key={event.id}>
              <CardHeader className="pb-2">
                <CardTitle>{event.title}</CardTitle>
                <CardDescription className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {event.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Location: {event.location}
                </p>
                <div className="flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/events/${event.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          {activities.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p>No recent activity found.</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Your Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {activities.map((activity) => (
                    <li
                      key={activity._id}
                      className="border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
