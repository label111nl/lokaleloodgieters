"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export function AILeadPrioritization() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("quotes").select("*").order("created_at", { ascending: false })
      if (error) throw error
      setLeads(data)
    } catch (error) {
      toast({
        title: "Fout bij het ophalen van leads",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const prioritizeLeads = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ai/prioritize-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leads }),
      })

      if (!response.ok) {
        throw new Error("Failed to prioritize leads")
      }

      const prioritizedLeads = await response.json()
      setLeads(prioritizedLeads)
    } catch (error) {
      toast({
        title: "Fout bij het prioriteren van leads",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Button onClick={prioritizeLeads} disabled={loading}>
        {loading ? "Bezig met prioriteren..." : "Prioriteer Leads"}
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prioriteit</TableHead>
            <TableHead>Dienst</TableHead>
            <TableHead>Klant</TableHead>
            <TableHead>Datum</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.priority}</TableCell>
              <TableCell>{lead.service_type}</TableCell>
              <TableCell>{lead.customer_name}</TableCell>
              <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

