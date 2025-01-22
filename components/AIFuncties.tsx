"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export function AIFuncties() {
  const [image, setImage] = useState<File | null>(null)
  const [imageAnalysis, setImageAnalysis] = useState("")
  const [leadDescription, setLeadDescription] = useState("")
  const [leadPriority, setLeadPriority] = useState("")

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const formData = new FormData()
      formData.append("image", file)

      try {
        const response = await fetch("/api/ai/analyze-image", {
          method: "POST",
          body: formData,
        })
        const data = await response.json()
        setImageAnalysis(data.analysis)
      } catch (error) {
        console.error("Error analyzing image:", error)
        toast({
          title: "Fout bij beeldanalyse",
          description: "Er is een fout opgetreden bij het analyseren van de afbeelding.",
          variant: "destructive",
        })
      }
    }
  }

  const handleLeadPrioritization = async () => {
    try {
      const response = await fetch("/api/ai/prioritize-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: leadDescription }),
      })
      const data = await response.json()
      setLeadPriority(data.priority)
    } catch (error) {
      console.error("Error prioritizing lead:", error)
      toast({
        title: "Fout bij leadprioritering",
        description: "Er is een fout opgetreden bij het prioriteren van de lead.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Beeldherkenning</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="image-upload">Upload een afbeelding</Label>
          <Input id="image-upload" type="file" onChange={handleImageUpload} accept="image/*" />
          {imageAnalysis && (
            <div className="mt-4">
              <h4 className="font-semibold">Analyse:</h4>
              <p>{imageAnalysis}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead Prioritering</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="lead-description">Beschrijf de lead</Label>
          <Textarea
            id="lead-description"
            value={leadDescription}
            onChange={(e) => setLeadDescription(e.target.value)}
            rows={4}
          />
          <Button onClick={handleLeadPrioritization} className="mt-2">
            Prioriteit Bepalen
          </Button>
          {leadPriority && (
            <div className="mt-4">
              <h4 className="font-semibold">Prioriteit:</h4>
              <p>{leadPriority}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

