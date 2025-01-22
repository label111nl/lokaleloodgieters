use
client
import React, { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AIError {
  id: number
  model_id: number
  error_message: string
  error_type: string
  created_at: string
  resolved: boolean
}

export function AIErrorLog() {
  const [errors, setErrors] = useState<AIError[]>([])
  const [filteredErrors, setFilteredErrors] = useState<AIError[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortField, setSortField] = useState("created_at")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchErrors()
  }, [])

  const fetchErrors = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("ai_errors")
        .select("*, ai_models(name)")
        .order(sortField, { ascending: sortDirection === "asc" })

      if (error) throw error
      setErrors(data)
      filterAndSortErrors(data)
    } catch (error) {
      console.error("Error fetching AI errors:", error)
      toast({
        title: "Fout bij ophalen AI-fouten",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortErrors = (data: AIError[]) => {
    let filtered = data
    if (filterType !== "all") {
      filtered = filtered.filter((error) => (filterType === "resolved" ? error.resolved : !error.resolved))
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (error) =>
          error.error_message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          error.error_type.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    setFilteredErrors(filtered)
  }

  useEffect(() => {
    filterAndSortErrors(errors)
  }, [searchTerm, filterType, sortField, sortDirection])

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const markAsResolved = async (errorId: number) => {
    try {
      const { error } = await supabase.from("ai_errors").update({ resolved: true }).eq("id", errorId)

      if (error) throw error
      toast({
        title: "Fout gemarkeerd als opgelost",
        description: "De AI-fout is succesvol gemarkeerd als opgelost.",
      })
      fetchErrors()
    } catch (error) {
      console.error("Error marking AI error as resolved:", error)
      toast({
        title: "Fout bij markeren als opgelost",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Foutmeldingen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Input
            placeholder="Zoek op foutmelding of type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter op status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle fouten</SelectItem>
              <SelectItem value="unresolved">Onopgelost</SelectItem>
              <SelectItem value="resolved">Opgelost</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {loading ? (
          <p>Laden...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort("ai_models.name")} className="cursor-pointer">
                  Model {sortField === "ai_models.name" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => handleSort("error_type")} className="cursor-pointer">
                  Fouttype {sortField === "error_type" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead>Bericht</TableHead>
                <TableHead onClick={() => handleSort("created_at")} className="cursor-pointer">
                  Datum {sortField === "created_at" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => handleSort("resolved")} className="cursor-pointer">
                  Status {sortField === "resolved" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead>Actie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredErrors.map((error) => (
                <TableRow key={error.id}>
                  <TableCell>{error.ai_models.name}</TableCell>
                  <TableCell>{error.error_type}</TableCell>
                  <TableCell>{error.error_message}</TableCell>
                  <TableCell>{new Date(error.created_at).toLocaleString()}</TableCell>
                  <TableCell>{error.resolved ? "Opgelost" : "Open"}</TableCell>
                  <TableCell>
                    {!error.resolved && <Button onClick={() => markAsResolved(error.id)}>Markeer als opgelost</Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

