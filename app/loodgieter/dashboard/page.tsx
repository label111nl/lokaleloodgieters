import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { LoodgieterDashboard } from "@/components/LoodgieterDashboard"

export default async function LoodgieterDashboardPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/loodgieter/login")
  }

  // Check if the user has the plumber role
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("id", session.user.id)
    .single()

  if (userError || userData?.role !== "plumber") {
    redirect("/loodgieter/login")
  }

  // Fetch plumber data
  const { data: loodgieterData } = await supabase
    .from("loodgieters")
    .select("*")
    .eq("user_id", session.user.id)
    .single()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Loodgieter Dashboard</h1>
      <LoodgieterDashboard loodgieterData={loodgieterData} />
    </main>
  )
}

