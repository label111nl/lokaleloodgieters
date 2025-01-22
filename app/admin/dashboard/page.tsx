import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/AdminDashboard"
import { AdminLayout } from "@/components/AdminLayout"

export default async function AdminDashboardPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  // Check if the user has the admin role
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("id", session.user.id)
    .single()

  if (userError) {
    console.error("Error fetching user data:", userError)
    redirect("/admin/login")
  }

  if (userData?.role !== "admin") {
    redirect("/admin/login")
  }

  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  )
}

