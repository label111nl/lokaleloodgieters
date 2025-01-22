"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface UsageData {
  date: string
  tokensUsed: number
  cost: number
}

export function AIUsageReport() {
  const [usageData, setUsageData] = useState<UsageData[]>([])
  const [timeRange, setTimeRange] = useState("week")
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchUsageData()
  }, [timeRange])

  const fetchUsageData = async () => {
    setLoading(true)
    try {
      let range
      switch (timeRange) {
        case "week":
          range = "7 days"
          break
        case "month":
          range = "30 days"
          break
        case "year":
          range = "365 days"
          break
        default:
          range = "7 days"
      }

      const { data, error } = await supabase
        .from("ai_usage_logs")
        .select("created_at, tokens_used")
        .gte("created_at", new Date(Date.now() - 86400000 * Number.parseInt(range)).toISOString())
        .order("created_at", { ascending: true })

      if (error) throw error

      const aggregatedData = data.reduce((acc, curr) => {
        const date = new Date(curr.created_at).toISOString().split("T")[0]
        if (!acc[date]) {
          acc[date] = { tokensUsed: 0, cost: 0 }
        }
        acc[date].tokensUsed += curr.tokens_used
        // Assuming a cost of $0.002 per 1000 tokens (adjust as needed)
        acc[date].cost += (curr.tokens_used / 1000) * 0.002
        return acc
      }, {})

      const formattedData = Object.entries(aggregatedData).map(([date, data]) => ({
        date,
        tokensUsed: data.tokensUsed,
        cost: Number.parseFloat(data.cost.toFixed(2)),
      }))

      setUsageData(formattedData)
    } catch (error) {
      console.error("Error fetching AI usage data:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Date,Tokens Used,Cost\n" +
      usageData.map((row) => `${row.date},${row.tokensUsed},${row.cost}`).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "ai_usage_report.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Gebruiksrapport</CardTitle>
        <div className="flex justify-between items-center">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecteer periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Afgelopen week</SelectItem>
              <SelectItem value="month">Afgelopen maand</SelectItem>
              <SelectItem value="year">Afgelopen jaar</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportToCSV}>Exporteer naar CSV</Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Laden...</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="tokensUsed" fill="#8884d8" name="Tokens gebruikt" />
              <Bar yAxisId="right" dataKey="cost" fill="#82ca9d" name="Kosten ($)" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

