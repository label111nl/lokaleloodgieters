"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-client"

export function CoverageSection() {
  const [commonIssues, setCommonIssues] = useState([])

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const { data, error } = await supabase.from("blog_posts").select("*")
        if (error) throw error

        setCommonIssues(data)
      } catch (error) {
        console.error("Error fetching common issues:", error)
        // Handle error, e.g., display an error message or fallback to mock data
      }
    }

    fetchIssues()
  }, [])

  return (
    <div className="bg-blue-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Heeft u een van deze problemen? Onze loodgieters kunnen helpen.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {commonIssues.map((issue, index) => (
            <Card key={issue.id}>
              <CardHeader>
                <CardTitle>{issue.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{issue.content}</p>
                <Link href={issue.link} className="text-blue-600 hover:underline">
                  Ontdek meer
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

