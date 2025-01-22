"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface PortfolioItem {
  id: string
  title: string
  description: string
  imageUrl: string
}

interface LoodgieterData {
  id: string
  bedrijfsnaam: string
  voornaam: string
  achternaam: string
  email: string
  telefoon: string
  adres: string
  postcode: string
  stad: string
  over_ons: string
  diensten: string[]
  certificeringen: string[]
  werkgebied: string[]
  portfolio: PortfolioItem[]
}

const DIENSTEN = [
  "Loodgieterswerk",
  "Sanitair",
  "Verwarming",
  "Dakwerk",
  "Riolering",
  "Badkamerrenovatie",
  "Keukeninstallatie",
]

const CERTIFICERINGEN = ["VCA", "UNETO-VNI", "Sterkin", "NVKL"]

const PROVINCIES = [
  "Noord-Holland",
  "Zuid-Holland",
  "Utrecht",
  "Flevoland",
  "Gelderland",
  "Overijssel",
  "Drenthe",
  "Groningen",
  "Friesland",
  "Zeeland",
  "Noord-Brabant",
  "Limburg",
]

export function ProfielBeheer({ loodgieterId }) {
  const [formData, setFormData] = useState<LoodgieterData | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchLoodgieterData()
  }, [loodgieterId])

  const fetchLoodgieterData = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("loodgieters").select("*").eq("id", loodgieterId).single()

      if (error) throw error
      setFormData(data)
    } catch (error) {
      console.error("Error fetching loodgieter data:", error)
      toast({
        title: "Fout bij ophalen gegevens",
        description: "Er is een fout opgetreden bij het ophalen van uw gegevens.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDienstenChange = (dienst: string) => {
    setFormData((prev) => ({
      ...prev,
      diensten: prev.diensten.includes(dienst) ? prev.diensten.filter((d) => d !== dienst) : [...prev.diensten, dienst],
    }))
  }

  const handleCertificeringenChange = (certificering: string) => {
    setFormData((prev) => ({
      ...prev,
      certificeringen: prev.certificeringen.includes(certificering)
        ? prev.certificeringen.filter((c) => c !== certificering)
        : [...prev.certificeringen, certificering],
    }))
  }

  const handleWerkgebiedChange = (provincie: string) => {
    setFormData((prev) => ({
      ...prev,
      werkgebied: prev.werkgebied.includes(provincie)
        ? prev.werkgebied.filter((p) => p !== provincie)
        : [...prev.werkgebied, provincie],
    }))
  }

  const handlePortfolioAdd = () => {
    setFormData((prev) => ({
      ...prev,
      portfolio: [...prev.portfolio, { id: Date.now().toString(), title: "", description: "", imageUrl: "" }],
    }))
  }

  const handlePortfolioChange = (id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }))
  }

  const handlePortfolioDelete = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.filter((item) => item.id !== id),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.from("loodgieters").update(formData).eq("id", loodgieterId)

      if (error) throw error

      toast({
        title: "Profiel bijgewerkt",
        description: "Uw profiel is succesvol bijgewerkt.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Fout bij bijwerken",
        description: "Er is een fout opgetreden bij het bijwerken van uw profiel.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Laden...</div>
  }

  if (!formData) {
    return <div>Geen gegevens gevonden</div>
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="algemeen">
        <TabsList>
          <TabsTrigger value="algemeen">Algemene Informatie</TabsTrigger>
          <TabsTrigger value="over-ons">Over Ons</TabsTrigger>
          <TabsTrigger value="diensten">Diensten</TabsTrigger>
          <TabsTrigger value="certificeringen">Certificeringen</TabsTrigger>
          <TabsTrigger value="werkgebied">Werkgebied</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>

        <TabsContent value="algemeen">
          <Card>
            <CardHeader>
              <CardTitle>Algemene Informatie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrijfsnaam">Bedrijfsnaam</Label>
                  <Input id="bedrijfsnaam" name="bedrijfsnaam" value={formData.bedrijfsnaam} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="voornaam">Voornaam</Label>
                  <Input id="voornaam" name="voornaam" value={formData.voornaam} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="achternaam">Achternaam</Label>
                  <Input id="achternaam" name="achternaam" value={formData.achternaam} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="telefoon">Telefoon</Label>
                  <Input id="telefoon" name="telefoon" value={formData.telefoon} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="adres">Adres</Label>
                  <Input id="adres" name="adres" value={formData.adres} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input id="postcode" name="postcode" value={formData.postcode} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="stad">Stad</Label>
                  <Input id="stad" name="stad" value={formData.stad} onChange={handleChange} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="over-ons">
          <Card>
            <CardHeader>
              <CardTitle>Over Ons</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="over_ons">Beschrijf uw bedrijf</Label>
              <Textarea id="over_ons" name="over_ons" value={formData.over_ons} onChange={handleChange} rows={10} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diensten">
          <Card>
            <CardHeader>
              <CardTitle>Diensten</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {DIENSTEN.map((dienst) => (
                  <div key={dienst} className="flex items-center space-x-2">
                    <Checkbox
                      id={dienst}
                      checked={formData.diensten.includes(dienst)}
                      onCheckedChange={() => handleDienstenChange(dienst)}
                    />
                    <Label htmlFor={dienst}>{dienst}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificeringen">
          <Card>
            <CardHeader>
              <CardTitle>Certificeringen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {CERTIFICERINGEN.map((certificering) => (
                  <div key={certificering} className="flex items-center space-x-2">
                    <Checkbox
                      id={certificering}
                      checked={formData.certificeringen.includes(certificering)}
                      onCheckedChange={() => handleCertificeringenChange(certificering)}
                    />
                    <Label htmlFor={certificering}>{certificering}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="werkgebied">
          <Card>
            <CardHeader>
              <CardTitle>Werkgebied</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {PROVINCIES.map((provincie) => (
                  <div key={provincie} className="flex items-center space-x-2">
                    <Checkbox
                      id={provincie}
                      checked={formData.werkgebied.includes(provincie)}
                      onCheckedChange={() => handleWerkgebiedChange(provincie)}
                    />
                    <Label htmlFor={provincie}>{provincie}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              {formData.portfolio.map((item) => (
                <div key={item.id} className="mb-4 p-4 border rounded">
                  <Input
                    placeholder="Titel"
                    value={item.title}
                    onChange={(e) => handlePortfolioChange(item.id, "title", e.target.value)}
                    className="mb-2"
                  />
                  <Textarea
                    placeholder="Beschrijving"
                    value={item.description}
                    onChange={(e) => handlePortfolioChange(item.id, "description", e.target.value)}
                    className="mb-2"
                  />
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        // Hier zou je normaal gesproken de afbeelding uploaden naar je server of cloud storage
                        // Voor nu simuleren we dit met een lokale URL
                        const imageUrl = URL.createObjectURL(file)
                        handlePortfolioChange(item.id, "imageUrl", imageUrl)
                      }
                    }}
                    className="mb-2"
                  />
                  {item.imageUrl && (
                    <img src={item.imageUrl || "/placeholder.svg"} alt={item.title} className="w-full max-w-xs mb-2" />
                  )}
                  <Button type="button" variant="destructive" onClick={() => handlePortfolioDelete(item.id)}>
                    Verwijderen
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handlePortfolioAdd}>
                Project Toevoegen
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button type="submit" className="mt-4" disabled={loading}>
        {loading ? "Bezig met opslaan..." : "Profiel Bijwerken"}
      </Button>
    </form>
  )
}

