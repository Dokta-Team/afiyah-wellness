"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, FileText, Calendar, BookOpen, LogOut, Menu } from "lucide-react"

export default function AdminSidebar({ user }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Blog Posts",
      href: "/admin/blog",
      icon: FileText,
    },
    {
      name: "Programs",
      href: "/admin/programs",
      icon: BookOpen,
    },
    {
      name: "Events",
      href: "/admin/events",
      icon: Calendar,
    },
  ]

  const renderNavItems = () =>
    navItems.map((item) => {
      const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
      return (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
            isActive
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
          onClick={() => setOpen(false)}
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.name}
        </Link>
      )
    })

  return (
    <>
      {/* Mobile sidebar trigger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-6">
              <Link href="/admin" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
                <span className="text-2xl font-bold text-emerald-600">Afiyah</span>
                <span className="text-sm font-medium">Admin</span>
              </Link>
            </div>
            <nav className="space-y-1 px-3">{renderNavItems()}</nav>
            <div className="absolute bottom-0 w-full p-4 border-t">
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r h-screen sticky top-0 overflow-y-auto hidden md:block">
        <div className="p-6">
          <Link href="/admin" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-emerald-600">Afiyah</span>
            <span className="text-sm font-medium">Admin</span>
          </Link>
        </div>
        <nav className="space-y-1 px-3">{renderNavItems()}</nav>
        <div className="absolute bottom-0 w-full p-4 border-t">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </>
  )
}
