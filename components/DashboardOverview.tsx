"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardOverview() {
  const [stats, setStats] = useState({
    totalOffertes: 0,
    openOffertes: 0,
    acceptedOffertes: 0,
    averageResponseTime: 0,
  })
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data: offertesData, error: offertesError } = await supabase
      .from("quotes")
      .select("*", { count: "exact" })
      .eq("plumber_id", user.id)

    const { data: openOffertesData, error: openOffertesError } = await supabase
      .from("quotes")
      .select("*", { count: "exact" })
      .eq("plumber_id", user.id)
      .eq("status", "nieuw")

    const { data: acceptedOffertesData, error: acceptedOffertesError } = await supabase
      .from("quotes")
      .select("*", { count: "exact" })
      .eq("plumber_id", user.id)
      .eq("status", "geaccepteerd")

    const { data: responseTimesData, error: responseTimesError } = await supabase
      .from("quotes")
      .select("created_at, responded_at")
      .eq("plumber_id", user.id)
      .not("responded_at", "is", null)

    if (offertesError || openOffertesError || acceptedOffertesError || responseTimesError) {
      console.error("Error fetching stats")
      return
    }

    const averageResponseTime =
      responseTimesData && responseTimesData.length > 0
        ? responseTimesData.reduce((sum, quote) => {
            const responseTime = new Date(quote.responded_at).getTime() - new Date(quote.created_at).getTime()
            return sum + responseTime
          }, 0) /
          responseTimesData.length /
          (1000 * 60 * 60) // Convert to hours
        : 0

    setStats({
      totalOffertes: offertesData?.length || 0,
      openOffertes: openOffertesData?.length || 0,
      acceptedOffertes: acceptedOffertesData?.length || 0,
      averageResponseTime: Number(averageResponseTime.toFixed(1)),
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Totaal Offertes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.totalOffertes}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Open Offertes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.openOffertes}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Geaccepteerde Offertes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.acceptedOffertes}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Gem. Reactietijd (uren)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.averageResponseTime}</p>
        </CardContent>
      </Card>
    </div>
  )
}

