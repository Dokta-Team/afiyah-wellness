"use client"

import AdminSidebar from "@/components/admin/sidebar"

export default function AdminLayoutClient({ children, user }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar user={user} />
      <div className="flex-1 p-6 md:p-10 overflow-auto">{children}</div>
    </div>
  )
}
