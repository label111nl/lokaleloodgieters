"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function EmailVerificatiePage() {
  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading")
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { error } = await supabase.auth.refreshSession()
        if (error) throw error
        setVerificationStatus("success")
      } catch (error) {
        console.error("Verificatie mislukt:", error)
        setVerificationStatus("error")
      }
    }

    verifyEmail()
  }, [supabase.auth])

  const handleContinue = () => {
    if (verificationStatus === "success") {
      router.push("/loodgieter/dashboard")
    } else {
      router.push("/")
    }
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Email Verificatie</CardTitle>
            <CardDescription>We controleren de status van uw email verificatie</CardDescription>
          </CardHeader>
          <CardContent>
            {verificationStatus === "loading" && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="mt-4 text-sm text-gray-500">Verificatie wordt uitgevoerd...</p>
              </div>
            )}
            {verificationStatus === "success" && (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Verificatie Geslaagd!</h2>
                <p className="mb-6">Uw email is succesvol geverifieerd. U kunt nu gebruik maken van ons platform.</p>
                <Button onClick={handleContinue}>Ga naar Dashboard</Button>
              </div>
            )}
            {verificationStatus === "error" && (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Verificatie Mislukt</h2>
                <p className="mb-6">
                  Er is een probleem opgetreden bij het verifiëren van uw email. Probeer het later opnieuw of neem
                  contact op met onze klantenservice.
                </p>
                <Button onClick={handleContinue} variant="outline">
                  Terug naar Home
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  )
}

