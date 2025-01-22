"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { supabase } from "@/lib/supabase"

const PROVINCES = [
  "Drenthe",
  "Flevoland",
  "Friesland",
  "Gelderland",
  "Groningen",
  "Limburg",
  "Noord-Brabant",
  "Noord-Holland",
  "Overijssel",
  "Utrecht",
  "Zeeland",
  "Zuid-Holland",
]

const STEPS = [
  {
    id: "welcome",
    title: "Welkom bij Lokale Loodgieters",
    description: "Laten we samen uw profiel opzetten om meer klanten te bereiken.",
  },
  {
    id: "business",
    title: "Uw Bedrijf",
    description: "Vertel ons meer over uw loodgietersbedrijf.",
  },
  {
    id: "province",
    title: "Werkgebied",
    description: "In welke provincie bent u voornamelijk actief?",
  },
  {
    id: "services",
    title: "Uw Diensten",
    description: "Welke diensten biedt u aan?",
  },
  {
    id: "subscription",
    title: "Kies uw Abonnement",
    description: "Selecteer het plan dat het beste bij u past.",
  },
]

const SERVICES = [
  "Algemeen loodgieterswerk",
  "Ontstopping",
  "CV-installatie",
  "Badkamer renovatie",
  "Dakwerk",
  "Riolering",
  "Warmtepomp installatie",
]

export function LoodgieterRegistratieQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    // Bedrijfsgegevens
    bedrijfsnaam: "",
    kvkNummer: "",
    btwNummer: "",
    // Contactpersoon
    voornaam: "",
    achternaam: "",
    email: "",
    telefoon: "",
    // Adres
    adres: "",
    postcode: "",
    stad: "",
    // Diensten
    diensten: [] as string[],
    // Werkgebied
    werkgebied: [] as string[],
    // Ervaring
    jarenErvaring: "",
    certificeringen: [] as string[],
    // Abonnement
    abonnement: "",
    province: "",
  })

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("plumbers").insert([
        {
          bedrijfsnaam: formData.bedrijfsnaam,
          kvk_nummer: formData.kvkNummer,
          btw_nummer: formData.btwNummer,
          voornaam: formData.voornaam,
          achternaam: formData.achternaam,
          email: formData.email,
          telefoon: formData.telefoon,
          adres: formData.adres,
          postcode: formData.postcode,
          stad: formData.stad,
          // Add other fields as necessary
        },
      ])

      if (error) throw error

      toast({
        title: "Registratie succesvol",
        description: "Uw account is aangemaakt. We nemen binnenkort contact met u op.",
      })
      router.push("/registratie-bevestiging")
    } catch (error) {
      console.error("Error during registration:", error)
      toast({
        title: "Fout bij registratie",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Welkom bij Lokale Loodgieters</h2>
            <p className="text-gray-600">
              We zijn blij dat u zich wilt aansluiten bij ons netwerk van professionele loodgieters. Deze registratie
              duurt ongeveer 5-10 minuten.
            </p>
            <Button onClick={handleNext} className="w-full md:w-auto">
              Start Registratie <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="bedrijfsnaam">Bedrijfsnaam</Label>
                <Input
                  id="bedrijfsnaam"
                  value={formData.bedrijfsnaam}
                  onChange={(e) => setFormData({ ...formData, bedrijfsnaam: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="kvkNummer">KvK-nummer</Label>
                  <Input
                    id="kvkNummer"
                    value={formData.kvkNummer}
                    onChange={(e) => setFormData({ ...formData, kvkNummer: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="btwNummer">BTW-nummer</Label>
                  <Input
                    id="btwNummer"
                    value={formData.btwNummer}
                    onChange={(e) => setFormData({ ...formData, btwNummer: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="voornaam">Voornaam</Label>
                  <Input
                    id="voornaam"
                    value={formData.voornaam}
                    onChange={(e) => setFormData({ ...formData, voornaam: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="achternaam">Achternaam</Label>
                  <Input
                    id="achternaam"
                    value={formData.achternaam}
                    onChange={(e) => setFormData({ ...formData, achternaam: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">E-mailadres</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefoon">Telefoonnummer</Label>
                <Input
                  id="telefoon"
                  value={formData.telefoon}
                  onChange={(e) => setFormData({ ...formData, telefoon: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="adres">Adres</Label>
                <Input
                  id="adres"
                  value={formData.adres}
                  onChange={(e) => setFormData({ ...formData, adres: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input
                    id="postcode"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stad">Stad</Label>
                  <Input
                    id="stad"
                    value={formData.stad}
                    onChange={(e) => setFormData({ ...formData, stad: e.target.value })}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Selecteer uw provincie</Label>
              <RadioGroup
                value={formData.province}
                onValueChange={(value) => setFormData({ ...formData, province: value })}
              >
                {PROVINCES.map((province) => (
                  <div key={province} className="flex items-center space-x-2">
                    <RadioGroupItem value={province} id={province} />
                    <Label htmlFor={province}>{province}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Terug
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!formData.province}
              >
                Volgende <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Selecteer uw diensten</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={service}
                      checked={formData.diensten.includes(service)}
                      onChange={(e) => {
                        const updatedDiensten = e.target.checked
                          ? [...formData.diensten, service]
                          : formData.diensten.filter((d) => d !== service)
                        setFormData({ ...formData, diensten: updatedDiensten })
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor={service}>{service}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent className="p-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="relative pt-8">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{
                  width: `${((currentStep + 1) / STEPS.length) * 100}%`,
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>{STEPS[currentStep].title}</span>
              <span>
                Stap {currentStep + 1} van {STEPS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">{renderStep()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug
            </Button>
          )}
          {currentStep < STEPS.length - 1 ? (
            <Button className="ml-auto" onClick={handleNext}>
              Volgende
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="ml-auto bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Bezig met versturen..." : "Registratie Voltooien"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

