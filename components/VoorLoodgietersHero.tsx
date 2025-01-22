"use client"

import { Button } from "@/components/ui/button"

export function VoorLoodgietersHero() {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Boost Uw Loodgietersbedrijf met Ons Platform</h1>
        <p className="text-xl mb-8 max-w-2xl">
          Sluit u aan bij het toonaangevende netwerk van loodgieters in Nederland. Ontvang meer klanten, beheer uw
          agenda efficiënt en laat uw bedrijf groeien.
        </p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-100">
          Start Nu
        </Button>
      </div>
    </section>
  )
}

