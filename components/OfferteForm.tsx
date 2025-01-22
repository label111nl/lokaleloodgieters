"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Upload, ArrowRight, ArrowLeft, Check } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PROVINCES, type Province } from "@/lib/provinces"
import { sendNewLeadNotification } from "@/lib/telegramBot"

interface City {
  id: number
  name: string
}

const STEPS = {
  SERVICE: 0,
  DETAILS: 1,
  CONTACT: 2,
  CONFIRMATION: 3,
}

const SERVICES = [
  { id: 1, name: "Reparaties" },
  { id: 2, name: "Installaties" },
  { id: 3, name: "Verwarming en CV" },
  { id: 4, name: "Waterleidingen" },
  { id: 5, name: "Riolering" },
  { id: 6, name: "Dakwerkzaamheden" },
  { id: 7, name: "Waterontharders en Filters" },
  { id: 8, name: "Spoedhulp" },
  { id: 9, name: "Advies" },
]

const STEP_LABELS = ["Type Dienst", "Details", "Contact", "Bevestiging"]

export function OfferteForm() {
  const [step, setStep] = useState(STEPS.SERVICE)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const [formData, setFormData] = useState({
    service_id: "",
    description: "",
    urgency: "normal",
    images: [] as string[],
    name: "",
    email: "",
    phone: "",
    address: "",
    province: "" as Province | "",
    postal_code: "",
    number_of_quotes: "3",
    city: "",
  })

  const [cities, setCities] = useState<City[]>([])
  const [loadingCities, setLoadingCities] = useState(false)
  const [maxResponses, setMaxResponses] = useState<number>(3)

  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.province) {
        setCities([])
        return
      }

      setLoadingCities(true)
      try {
        const { data: provinceData } = await supabase
          .from("provinces")
          .select("id")
          .eq("name", formData.province)
          .single()

        if (provinceData) {
          const response = await fetch(`/api/cities?provinceId=${provinceData.id}`)
          if (!response.ok) throw new Error("Failed to fetch cities")
          const cities = await response.json()
          setCities(cities)
        }
      } catch (error) {
        toast({
          title: "Fout",
          description: "Er is een fout opgetreden bij het ophalen van de steden.",
          variant: "destructive",
        })
        setCities([])
      } finally {
        setLoadingCities(false)
      }
    }

    fetchCities()
  }, [formData.province, supabase])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setLoading(true)
    const file = e.target.files[0]
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    try {
      const { error: uploadError } = await supabase.storage.from("quote-images").upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, filePath],
      }))

      toast({
        title: "Afbeelding geüpload",
        description: "Uw afbeelding is succesvol toegevoegd aan de offerte aanvraag.",
      })
    } catch (error) {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het uploaden van de afbeelding.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const { data, error } = await supabase.from("quotes").insert([
        {
          service_id: Number.parseInt(formData.service_id),
          description: formData.description,
          urgency: formData.urgency,
          images: formData.images,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          address: formData.address,
          province: formData.province,
          postal_code: formData.postal_code,
          city: formData.city,
          status: "open",
          max_responses: maxResponses,
        },
      ])

      if (error) throw error

      // Send notification via Telegram
      await sendNewLeadNotification(formData.province, formData.city)

      setStep(STEPS.CONFIRMATION)
    } catch (error) {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het versturen van uw aanvraag.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case STEPS.SERVICE:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="service">Type Dienst</Label>
              <Select
                value={formData.service_id}
                onValueChange={(value) => setFormData({ ...formData, service_id: value })}
              >
                <SelectTrigger className="w-full bg-white border-gray-300 hover:bg-gray-50">
                  <SelectValue placeholder="Selecteer een dienst" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {SERVICES.map((service) => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label htmlFor="urgency">Urgentie</Label>
              <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
                <SelectTrigger className="w-full bg-white border-gray-300 hover:bg-gray-50">
                  <SelectValue placeholder="Selecteer urgentie" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="low">Niet Urgent</SelectItem>
                  <SelectItem value="normal">Normaal</SelectItem>
                  <SelectItem value="high">Spoed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Aantal Gewenste Offertes</Label>
              <RadioGroup
                defaultValue={maxResponses.toString()}
                onValueChange={(value) => setMaxResponses(Number.parseInt(value))}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="quotes-3" />
                  <Label htmlFor="quotes-3">3 Offertes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5" id="quotes-5" />
                  <Label htmlFor="quotes-5">5 Offertes</Label>
                </div>
              </RadioGroup>
              <p className="text-sm text-gray-500">
                Kies hoeveel verschillende offertes u wilt ontvangen van lokale loodgieters.
              </p>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setStep(STEPS.DETAILS)}
              disabled={!formData.service_id}
            >
              Volgende <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )

      case STEPS.DETAILS:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="description">Beschrijf het probleem</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Geef een gedetailleerde beschrijving van het probleem..."
                className="min-h-[150px]"
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="images">Foto's uploaden (optioneel)</Label>
              <div className="flex items-center gap-4">
                <Input id="images" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Button variant="outline" onClick={() => document.getElementById("images")?.click()} disabled={loading}>
                  <Upload className="mr-2 h-4 w-4" />
                  Foto's Toevoegen
                </Button>
                {formData.images.length > 0 && (
                  <span className="text-sm text-gray-500">{formData.images.length} foto's geüpload</span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(STEPS.SERVICE)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Terug
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setStep(STEPS.CONTACT)}
                disabled={!formData.description}
              >
                Volgende <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case STEPS.CONTACT:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Naam</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mailadres</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefoonnummer</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adres</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="province">Provincie</Label>
                <Select
                  value={formData.province}
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      province: value as Province,
                      city: "", // Reset city when province changes
                    })
                  }}
                >
                  <SelectTrigger className="w-full bg-white border-gray-300 hover:bg-gray-50">
                    <SelectValue placeholder="Selecteer provincie" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {PROVINCES.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Stad</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => setFormData({ ...formData, city: value })}
                  disabled={!formData.province || loadingCities}
                >
                  <SelectTrigger className="w-full bg-white border-gray-300 hover:bg-gray-50">
                    <SelectValue placeholder={loadingCities ? "Laden..." : "Selecteer stad"} />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="postal_code">Postcode</Label>
              <Input
                id="postal_code"
                value={formData.postal_code}
                onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(STEPS.DETAILS)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Terug
              </Button>
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium"
                onClick={handleSubmit}
                disabled={
                  loading ||
                  !formData.name ||
                  !formData.email ||
                  !formData.phone ||
                  !formData.address ||
                  !formData.province ||
                  !formData.postal_code ||
                  !formData.city
                }
              >
                {loading ? "Bezig met versturen..." : "Verstuur Aanvraag"}
              </Button>
            </div>
          </div>
        )

      case STEPS.CONFIRMATION:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Bedankt voor uw aanvraag!</h3>
            <p className="text-gray-600">
              We hebben uw offerte aanvraag ontvangen en sturen deze door naar {maxResponses} gekwalificeerde
              loodgieters in uw regio. U ontvangt binnen 24 uur een reactie via e-mail.
            </p>
            <Button onClick={() => router.push("/")}>Terug naar Home</Button>
          </div>
        )
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        {step !== STEPS.CONFIRMATION && (
          <div className="mb-8">
            {/* Progress Bar */}
            <div className="relative pt-12">
              <div className="absolute top-0 left-0 w-full flex justify-between px-2 mb-2">
                {STEP_LABELS.map((label, index) => (
                  <span
                    key={index}
                    className={`text-sm transform -translate-x-1/2 ${
                      index === step ? "text-blue-600 font-medium" : "text-gray-400"
                    }`}
                    style={{ left: `${(index / (STEP_LABELS.length - 1)) * 100}%` }}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(step / (Object.keys(STEPS).length - 1)) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
                />
              </div>
              <div className="absolute top-8 left-0 w-full flex justify-between px-2">
                {Object.keys(STEPS)
                  .filter((key) => isNaN(Number(key)))
                  .map((key, index) => (
                    <div
                      key={key}
                      className={`w-8 h-8 rounded-full flex items-center justify-center -ml-4 ${
                        index === 0 ? "ml-0" : ""
                      } ${
                        index === step
                          ? "bg-blue-600 text-white"
                          : index < step
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-600"
                      }`}
                      style={{ left: `${(index / (Object.keys(STEPS).length - 1)) * 100}%` }}
                    >
                      {index < step ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        <div className="mt-8">{renderStep()}</div>
      </CardContent>
    </Card>
  )
}

