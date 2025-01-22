use
client
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { supabase } from "@/lib/supabase-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface QuoteResponse {
  id: number
  plumber_id: number
  price: number
  description: string
  status: string
}

interface Lead {
  id: number
  service_type: string
  description: string
  customer_name: string
  status: string
  quote_responses: QuoteResponse[]
}

export function LeadPage() {
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { id } = router.query
  const client = supabase

  useEffect(() => {
    if (id) {
      fetchLead()
    }
  }, [id])

  const fetchLead = async () => {
    setLoading(true)
    try {
      const { data, error } = await client
        .from("quotes")
        .select(`
          id,
          service_type,
          description,
          customer_name,
          status,
          quote_responses (
            id,
            plumber_id,
            price,
            description,
            status
          )
        `)
        .eq("id", id)
        .single()

      if (error) throw error
      setLead(data)
    } catch (error) {
      console.error("Error fetching lead:", error)
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het ophalen van de leadgegevens.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptQuote = async (quoteResponseId: number) => {
    try {
      const { error } = await client
        .from("quotes")
        .update({
          status: "accepted",
          accepted_quote_id: quoteResponseId,
        })
        .eq("id", lead?.id)

      if (error) throw error

      await client.from("quote_responses").update({ status: "accepted" }).eq("id", quoteResponseId)

      toast({
        title: "Offerte geaccepteerd",
        description: "De offerte is succesvol geaccepteerd.",
      })

      fetchLead()
    } catch (error) {
      console.error("Error accepting quote:", error)
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het accepteren van de offerte.",
        variant: "destructive",
      })
    }
  }

  const handleRejectQuote = async (quoteResponseId: number) => {
    try {
      const { error } = await client.from("quote_responses").update({ status: "rejected" }).eq("id", quoteResponseId)

      if (error) throw error

      toast({
        title: "Offerte afgewezen",
        description: "De offerte is succesvol afgewezen.",
      })

      fetchLead()
    } catch (error) {
      console.error("Error rejecting quote:", error)
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het afwijzen van de offerte.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Laden...</div>
  }

  if (!lead) {
    return <div>Lead niet gevonden.</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lead Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Service:</strong> {lead.service_type}
          </p>
          <p>
            <strong>Beschrijving:</strong> {lead.description}
          </p>
          <p>
            <strong>Klant:</strong> {lead.customer_name}
          </p>
          <p>
            <strong>Status:</strong> {lead.status}
          </p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold">Ontvangen Offertes</h2>
      {lead.quote_responses.map((response) => (
        <Card key={response.id}>
          <CardHeader>
            <CardTitle>Offerte van Loodgieter #{response.plumber_id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Prijs:</strong> €{response.price.toFixed(2)}
            </p>
            <p>
              <strong>Beschrijving:</strong> {response.description}
            </p>
            <p>
              <strong>Status:</strong> {response.status}
            </p>
            {lead.status === "open" && response.status === "pending" && (
              <div className="mt-4 space-x-2">
                <Button onClick={() => handleAcceptQuote(response.id)}>Accepteren</Button>
                <Button variant="outline" onClick={() => handleRejectQuote(response.id)}>
                  Afwijzen
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

