import { getBlogPostById } from "@/lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function BlogPost({ params }) {
  const { id } = params
  const post = await getBlogPostById(id)

  if (!post) {
    notFound()
  }

  return (
    <main className="flex flex-col min-h-screen">
      <article className="container px-4 md:px-6 py-12 max-w-3xl mx-auto">
        <div className="mb-8">
          <Button variant="outline" size="sm" asChild className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <div className="text-sm text-muted-foreground mb-2">
            {new Date(post.date).toLocaleDateString()} • {post.category}
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{post.title}</h1>

          {post.image && (
            <div className="relative h-[300px] w-full my-6">
              <Image
                src={post.image || "/placeholder.svg?height=600&width=1200"}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  )
}
