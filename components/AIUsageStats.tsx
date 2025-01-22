"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AIUsageLog {
  id: number
  model_id: number
  user_id: string
  usage_type: string
  tokens_used: number
  created_at: string
}

export function AIUsageStats() {
  const [usageLogs, setUsageLogs] = useState<AIUsageLog[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchUsageLogs()
  }, [])

  const fetchUsageLogs = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("ai_usage_logs")
        .select("*, ai_models(name)")
        .order("created_at", { ascending: false })
        .limit(100)
      if (error) throw error
      setUsageLogs(data)
    } catch (error) {
      console.error("Error fetching AI usage logs:", error)
    } finally {
      setLoading(false)
    }
  }

  const totalTokensUsed = usageLogs.reduce((sum, log) => sum + log.tokens_used, 0)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">AI Gebruiksstatistieken</h2>
      <Card>
        <CardHeader>
          <CardTitle>Totaal Tokengebruik</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalTokensUsed.toLocaleString()}</p>
        </CardContent>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Model</TableHead>
            <TableHead>Gebruikstype</TableHead>
            <TableHead>Tokens Gebruikt</TableHead>
            <TableHead>Datum</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usageLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.ai_models.name}</TableCell>
              <TableCell>{log.usage_type}</TableCell>
              <TableCell>{log.tokens_used}</TableCell>
              <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

