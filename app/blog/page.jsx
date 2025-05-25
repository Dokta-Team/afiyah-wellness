import { getAllBlogPosts } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  // Get unique categories
  const categories = ["All", ...new Set(posts.map((post) => post.category))]

  return (
    <main className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Blog</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Insights, tips, and stories to support your wellness journey
            </p>
          </div>

          <Tabs defaultValue="All" className="mt-12">
            <TabsList className="flex flex-wrap justify-center mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts
                    .filter((post) => category === "All" || post.category === category)
                    .map((post) => (
                      <Card key={post._id} className="overflow-hidden flex flex-col">
                        {post.image && (
                          <div className="relative h-48 w-full">
                            <Image
                              src={post.image || "/placeholder.svg?height=300&width=500"}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <div className="text-sm text-muted-foreground">
                            {new Date(post.date).toLocaleDateString()} • {post.category}
                          </div>
                          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                          <CardDescription className="line-clamp-3">
                            {post.excerpt || post.content.substring(0, 150) + "..."}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="mt-auto">
                          <Button asChild variant="outline">
                            <Link href={`/blog/${post._id}`}>Read More</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </main>
  )
}
