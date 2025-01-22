"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export function ImageRecognition() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedFile) {
      toast({
        title: "Geen bestand geselecteerd",
        description: "Selecteer een afbeelding om te analyseren.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append("image", selectedFile)

    try {
      const response = await fetch("/api/ai/analyze-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to analyze image")
      }

      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (error) {
      toast({
        title: "Fout bij het analyseren van de afbeelding",
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
          <Label htmlFor="image">Selecteer een afbeelding</Label>
          <Input id="image" type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <Button type="submit" disabled={loading || !selectedFile}>
          {loading ? "Bezig met analyseren..." : "Analyseer Afbeelding"}
        </Button>
      </form>
      {analysis && (
        <div>
          <Label>Analyse Resultaat</Label>
          <p className="mt-2 p-4 bg-gray-100 rounded-md">{analysis}</p>
        </div>
      )}
    </div>
  )
}

