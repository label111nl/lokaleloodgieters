"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { sendTelegramNotification } from "@/lib/telegramBot"

interface Offerte {
  id: number
  created_at: string
  service_type: string
  description: string
  status: string
  customer_id: number
}

export function OffertesList({ loodgieterId }) {
  const [offertes, setOffertes] = useState<Offerte[]>([])
  const [selectedOfferte, setSelectedOfferte] = useState<Offerte | null>(null)
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  // const supabase = createClientComponentClient()
  const client = supabase

  useEffect(() => {
    fetchOffertes()
  }, [loodgieterId])

  const fetchOffertes = async () => {
    const { data, error } = await client
      .from("quotes")
      .select("*")
      .eq("status", "open")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching offertes:", error)
    } else {
      setOffertes(data)
    }
  }

  const handleReageer = (offerte: Offerte) => {
    setSelectedOfferte(offerte)
    setPrice("")
    setDescription("")
  }

  const handleSubmitOfferte = async () => {
    if (!selectedOfferte || !price || !description) {
      toast({
        title: "Fout",
        description: "Vul alle velden in.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/quotes/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteId: selectedOfferte.id,
          plumberId: loodgieterId,
          price: Number.parseFloat(price),
          description,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit offerte")
      }

      const data = await response.json()
      toast({
        title: "Succes",
        description: data.message,
      })

      // Send notification via Telegram
      await sendTelegramNotification(`New quote submitted for ${selectedOfferte.service_type}`)

      setSelectedOfferte(null)
      fetchOffertes()
    } catch (error) {
      console.error("Error submitting offerte:", error)
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het versturen van de offerte.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum</TableHead>
            <TableHead>Dienst</TableHead>
            <TableHead>Beschrijving</TableHead>
            <TableHead>Actie</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offertes.map((offerte) => (
            <TableRow key={offerte.id}>
              <TableCell>{new Date(offerte.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{offerte.service_type}</TableCell>
              <TableCell>{offerte.description}</TableCell>
              <TableCell>
                <Button onClick={() => handleReageer(offerte)}>Reageer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedOfferte && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Reageer op offerte</h3>
          <div className="space-y-2">
            <Label htmlFor="price">Prijs (€)</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Voer de prijs in"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Beschrijving</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Geef een beschrijving van uw offerte"
              rows={4}
            />
          </div>
          <Button onClick={handleSubmitOfferte}>Verstuur Offerte</Button>
        </div>
      )}
    </div>
  )
}

