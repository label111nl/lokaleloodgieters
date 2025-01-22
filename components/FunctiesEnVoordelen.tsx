"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, TrendingUp, Award, Shield, HeadphonesIcon } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Meer Klanten",
    description: "Krijg toegang tot een groeiende pool van potentiële klanten in uw regio.",
  },
  {
    icon: Calendar,
    title: "Efficiënt Agendabeheer",
    description: "Beheer uw afspraken en werkschema eenvoudig via ons intuïtieve platform.",
  },
  {
    icon: TrendingUp,
    title: "Bedrijfsgroei",
    description: "Vergroot uw klantenbestand en omzet met onze gerichte leadgeneratie.",
  },
  {
    icon: Award,
    title: "Verbeterde Reputatie",
    description: "Bouw een sterke online aanwezigheid op met klantbeoordelingen en aanbevelingen.",
  },
  {
    icon: Shield,
    title: "Betrouwbare Leads",
    description: "Ontvang geverifieerde en relevante leads om uw tijd efficiënt te besteden.",
  },
  {
    icon: HeadphonesIcon,
    title: "Ondersteuning",
    description: "Profiteer van onze klantenservice en technische ondersteuning.",
  },
]

export function FunctiesEnVoordelen() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Functies en Voordelen</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

