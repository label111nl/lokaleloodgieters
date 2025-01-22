"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export function LoodgieterRegistratieForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    bedrijfsnaam: "",
    contactpersoon: "",
    email: "",
    telefoon: "",
    adres: "",
    postcode: "",
    stad: "",
    kvkNummer: "",
    btwNummer: "",
    serviceregio: "",
    beschrijving: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Hier zou je normaal gesproken een API call maken om de data te versturen
      // Voor nu simuleren we dit met een timeout
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Registratie succesvol",
        description: "Uw aanvraag is ontvangen en wordt verwerkt.",
      })

      router.push("/registratie-bevestiging")
    } catch (error) {
      toast({
        title: "Fout bij registratie",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="bedrijfsnaam">Bedrijfsnaam</Label>
              <Input
                id="bedrijfsnaam"
                name="bedrijfsnaam"
                value={formData.bedrijfsnaam}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="contactpersoon">Contactpersoon</Label>
              <Input
                id="contactpersoon"
                name="contactpersoon"
                value={formData.contactpersoon}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">E-mailadres</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="telefoon">Telefoonnummer</Label>
              <Input id="telefoon" name="telefoon" value={formData.telefoon} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="adres">Adres</Label>
              <Input id="adres" name="adres" value={formData.adres} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postcode">Postcode</Label>
                <Input id="postcode" name="postcode" value={formData.postcode} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="stad">Stad</Label>
                <Input id="stad" name="stad" value={formData.stad} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <Label htmlFor="kvkNummer">KvK-nummer</Label>
              <Input id="kvkNummer" name="kvkNummer" value={formData.kvkNummer} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="btwNummer">BTW-nummer</Label>
              <Input id="btwNummer" name="btwNummer" value={formData.btwNummer} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="serviceregio">Serviceregio</Label>
              <Select onValueChange={handleSelectChange("serviceregio")}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer uw serviceregio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="noord">Noord-Nederland</SelectItem>
                  <SelectItem value="oost">Oost-Nederland</SelectItem>
                  <SelectItem value="zuid">Zuid-Nederland</SelectItem>
                  <SelectItem value="west">West-Nederland</SelectItem>
                  <SelectItem value="midden">Midden-Nederland</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="beschrijving">Beschrijving van uw diensten</Label>
              <Textarea
                id="beschrijving"
                name="beschrijving"
                value={formData.beschrijving}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Bezig met registreren..." : "Registreren"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

