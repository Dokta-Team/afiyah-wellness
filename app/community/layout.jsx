import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import CommunityNavbar from "@/components/community/navbar"

export const metadata = {
  title: "Afiyah Community",
  description: "Connect with the Afiyah wellness community",
}

export default async function CommunityLayout({ children }) {
  const user = await getCurrentUser()

  // Redirect if not authenticated
  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <CommunityNavbar user={user} />
      <div className="flex-1 bg-gray-50 dark:bg-gray-900">{children}</div>
    </div>
  )
}
