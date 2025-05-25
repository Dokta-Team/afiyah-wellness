import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Calendar, BookOpen } from "lucide-react"
import { getAllBlogPosts, getAllPrograms, getAllEvents } from "@/lib/server-db"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminDashboard() {
  // Server-side data fetching
  const blogPosts = await getAllBlogPosts()
  const programs = await getAllPrograms()
  const events = await getAllEvents()

  const stats = [
    {
      title: "Blog Posts",
      value: blogPosts.length,
      icon: FileText,
      description: "Total published blog posts",
      href: "/admin/blog",
    },
    {
      title: "Programs",
      value: programs.length,
      icon: BookOpen,
      description: "Active wellness programs",
      href: "/admin/programs",
    },
    {
      title: "Events",
      value: events.length,
      icon: Calendar,
      description: "Upcoming and past events",
      href: "/admin/events",
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <Button asChild variant="link" className="p-0 mt-2 h-auto text-emerald-600">
                <Link href={stat.href}>Manage {stat.title}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
            <CardDescription>Latest published articles</CardDescription>
          </CardHeader>
          <CardContent>
            {blogPosts.length === 0 ? (
              <p className="text-muted-foreground">No blog posts yet</p>
            ) : (
              <ul className="space-y-2">
                {blogPosts.slice(0, 5).map((post) => (
                  <li key={post._id} className="border-b pb-2">
                    <Link href={`/admin/blog/edit/${post._id}`} className="font-medium hover:text-emerald-600">
                      {post.title}
                    </Link>
                    <div className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</div>
                  </li>
                ))}
              </ul>
            )}
            <Button asChild variant="link" className="p-0 mt-4 h-auto text-emerald-600">
              <Link href="/admin/blog">View All Posts</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events scheduled in the near future</CardDescription>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <p className="text-muted-foreground">No events scheduled</p>
            ) : (
              <ul className="space-y-2">
                {events.slice(0, 5).map((event) => (
                  <li key={event._id} className="border-b pb-2">
                    <Link href={`/admin/events/edit/${event._id}`} className="font-medium hover:text-emerald-600">
                      {event.title}
                    </Link>
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()} - {event.location}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <Button asChild variant="link" className="p-0 mt-4 h-auto text-emerald-600">
              <Link href="/admin/events">View All Events</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
