"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const abonnementen = [
  {
    naam: "Gratis",
    prijs: "€0",
    periode: "per maand",
    features: ["€35 per lead", "Basis profielpagina", "Toegang tot platform"],
    popular: false,
  },
  {
    naam: "Standaard",
    prijs: "€50",
    periode: "per maand",
    features: [
      "4 leads per maand inbegrepen",
      "€30 per extra lead",
      "Uitgebreide profielpagina",
      "Klantenbeoordelingen",
      "Basis analytics",
    ],
    popular: true,
  },
  {
    naam: "Premium",
    prijs: "€150",
    periode: "per maand",
    features: [
      "10 leads per maand inbegrepen",
      "€25 per extra lead",
      "Prioritaire plaatsing in zoekresultaten",
      "Geavanceerde analytics",
      "24/7 ondersteuning",
    ],
    popular: false,
  },
]

export function AbonnementsPrijzen() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Kies Uw Abonnement</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {abonnementen.map((abonnement, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-lg shadow-lg ${abonnement.popular ? "border-2 border-blue-500" : ""}`}
            >
              {abonnement.popular && (
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                  Populair
                </span>
              )}
              <h3 className="text-2xl font-bold mb-4">{abonnement.naam}</h3>
              <p className="text-4xl font-bold mb-2">{abonnement.prijs}</p>
              <p className="text-gray-500 mb-6">{abonnement.periode}</p>
              <ul className="mb-8">
                {abonnement.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="text-green-500 mr-2" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={abonnement.popular ? "default" : "outline"}
                onClick={() => (window.location.href = "/loodgieter-registratie")}
              >
                Aanmelden
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

