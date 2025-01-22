"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface APIKey {
  id: number
  model_id: number
  key: string
  is_active: boolean
  expires_at: string
  usage_limit: number
  current_usage: number
}

export function APIKeyManagement() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchAPIKeys()
  }, [])

  const fetchAPIKeys = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("api_keys")
        .select("*, ai_models(name)")
        .order("expires_at", { ascending: true })

      if (error) throw error
      setApiKeys(data)
    } catch (error) {
      console.error("Error fetching API keys:", error)
      toast({
        title: "Fout bij ophalen API-sleutels",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const rotateAPIKey = async (keyId: number) => {
    try {
      const { data, error } = await supabase.rpc("rotate_api_key", { key_id: keyId })

      if (error) throw error
      toast({
        title: "API-sleutel geroteerd",
        description: "De nieuwe API-sleutel is succesvol gegenereerd.",
      })
      fetchAPIKeys()
    } catch (error) {
      console.error("Error rotating API key:", error)
      toast({
        title: "Fout bij roteren API-sleutel",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      })
    }
  }

  const updateUsageLimit = async (keyId: number, newLimit: number) => {
    try {
      const { error } = await supabase.from("api_keys").update({ usage_limit: newLimit }).eq("id", keyId)

      if (error) throw error
      toast({
        title: "Gebruikslimiet bijgewerkt",
        description: "De nieuwe gebruikslimiet is succesvol ingesteld.",
      })
      fetchAPIKeys()
    } catch (error) {
      console.error("Error updating usage limit:", error)
      toast({
        title: "Fout bij bijwerken gebruikslimiet",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">API-sleutel Beheer</h2>
      {loading ? (
        <p>Laden...</p>
      ) : (
        apiKeys.map((key) => (
          <Card key={key.id}>
            <CardHeader>
              <CardTitle>{key.ai_models.name} API-sleutel</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Verloopt op: {new Date(key.expires_at).toLocaleString()}</p>
              <p>
                Huidig gebruik: {key.current_usage} / {key.usage_limit} tokens
              </p>
              <div className="mt-4 space-y-2">
                <Label htmlFor={`usage-limit-${key.id}`}>Gebruikslimiet</Label>
                <Input
                  id={`usage-limit-${key.id}`}
                  type="number"
                  defaultValue={key.usage_limit}
                  onChange={(e) => updateUsageLimit(key.id, Number.parseInt(e.target.value))}
                />
              </div>
              <Button onClick={() => rotateAPIKey(key.id)} className="mt-4">
                Roteer API-sleutel
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

