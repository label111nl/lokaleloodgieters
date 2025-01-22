"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

const SUBSCRIPTION_TYPES = {
  FREE: "Gratis",
  STANDARD: "Standaard",
  PREMIUM: "Premium",
}

export function AbonnementBeheer({ loodgieterId }) {
  const [currentSubscription, setCurrentSubscription] = useState(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchSubscription = async () => {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("loodgieter_id", loodgieterId)
        .single()

      if (error) {
        console.error("Error fetching subscription:", error)
      } else {
        setCurrentSubscription(data)
      }
    }

    if (loodgieterId) {
      fetchSubscription()
    }
  }, [loodgieterId, supabase])

  const handleUpgrade = async (newType) => {
    // In een echte applicatie zou je hier een betalingsproces starten
    const { error } = await supabase.from("subscriptions").upsert({ loodgieter_id: loodgieterId, type: newType })

    if (error) {
      toast({
        title: "Fout bij upgraden",
        description: "Er is een fout opgetreden bij het upgraden van uw abonnement.",
        variant: "destructive",
      })
    } else {
      setCurrentSubscription({ ...currentSubscription, type: newType })
      toast({
        title: "Abonnement geüpgraded",
        description: `Uw abonnement is succesvol geüpgraded naar ${newType}.`,
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Huidig Abonnement</CardTitle>
          <CardDescription>
            {currentSubscription ? SUBSCRIPTION_TYPES[currentSubscription.type] : "Laden..."}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(SUBSCRIPTION_TYPES).map(([key, value]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{value}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleUpgrade(key)}
                disabled={currentSubscription && currentSubscription.type === key}
              >
                {currentSubscription && currentSubscription.type === key ? "Huidig Plan" : "Upgrade"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

