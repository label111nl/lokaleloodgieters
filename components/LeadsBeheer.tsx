"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function LeadsBeheer() {
  const [leads, setLeads] = useState([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    const { data, error } = await supabase.from("quotes").select("*")
    if (error) {
      console.error("Error fetching leads:", error)
    } else {
      setLeads(data)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Leads Beheer</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum</TableHead>
            <TableHead>Klant</TableHead>
            <TableHead>Dienst</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{lead.customer_name}</TableCell>
              <TableCell>{lead.service_type}</TableCell>
              <TableCell>{lead.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  Details
                </Button>
                <Button variant="destructive" size="sm">
                  Verwijderen
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

