"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Offerte {
  id: number
  created_at: string
  customer_name: string
  service_type: string
  status: "nieuw" | "verzonden" | "geaccepteerd" | "afgewezen"
}

export function OffertesOverzicht() {
  const [offertes, setOffertes] = useState<Offerte[]>([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchOffertes()
  }, [])

  const fetchOffertes = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("plumber_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      console.error("Error fetching offertes:", error)
    } else {
      setOffertes(data)
    }
  }

  const getStatusBadge = (status: Offerte["status"]) => {
    switch (status) {
      case "nieuw":
        return <Badge variant="secondary">Nieuw</Badge>
      case "verzonden":
        return <Badge variant="primary">Verzonden</Badge>
      case "geaccepteerd":
        return <Badge variant="success">Geaccepteerd</Badge>
      case "afgewezen":
        return <Badge variant="destructive">Afgewezen</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recente Offertes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Datum</TableHead>
              <TableHead>Klant</TableHead>
              <TableHead>Dienst</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offertes.map((offerte) => (
              <TableRow key={offerte.id}>
                <TableCell>{new Date(offerte.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{offerte.customer_name}</TableCell>
                <TableCell>{offerte.service_type}</TableCell>
                <TableCell>{getStatusBadge(offerte.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

