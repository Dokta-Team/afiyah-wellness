import { getCurrentUser } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AdminLayoutClient from "@/components/admin/layout-client";
import AdminLoading from "@/components/admin/loading";

export const metadata = {
  title: "Afiyah Admin Dashboard",
  description: "Manage your Afiyah website content",
};

export default async function AdminLayout({ children }) {
  const user = await getCurrentUser();

  // Redirect if not authenticated or not admin
  if (!user || user.role !== "admin") {
    redirect("/auth/login");
  }

  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminLayoutClient user={user}>{children}</AdminLayoutClient>
    </Suspense>
  );
}
