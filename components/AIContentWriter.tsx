"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export function AIContentWriter() {
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, keywords }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate content")
      }

      const data = await response.json()
      setGeneratedContent(data.content)
    } catch (error) {
      toast({
        title: "Fout bij het genereren van content",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="topic">Onderwerp</Label>
          <Input id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="keywords">Sleutelwoorden (gescheiden door komma's)</Label>
          <Input id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Bezig met genereren..." : "Genereer Inhoud"}
        </Button>
      </form>
      {generatedContent && (
        <div>
          <Label htmlFor="generated-content">Gegenereerde Content</Label>
          <Textarea id="generated-content" value={generatedContent} readOnly className="h-64" />
        </div>
      )}
    </div>
  )
}

