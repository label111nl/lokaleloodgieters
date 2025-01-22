"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function LoodgietersBeheer() {
  const [loodgieters, setLoodgieters] = useState([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchLoodgieters()
  }, [])

  const fetchLoodgieters = async () => {
    const { data, error } = await supabase.from("loodgieters").select("*")
    if (error) {
      console.error("Error fetching loodgieters:", error)
    } else {
      setLoodgieters(data)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Loodgieters Beheer</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Naam</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefoon</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loodgieters.map((loodgieter) => (
            <TableRow key={loodgieter.id}>
              <TableCell>{loodgieter.naam}</TableCell>
              <TableCell>{loodgieter.email}</TableCell>
              <TableCell>{loodgieter.telefoon}</TableCell>
              <TableCell>{loodgieter.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  Bewerken
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

