"use client"

import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Klaar om Uw Bedrijf naar het Volgende Niveau te Tillen?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Word lid van ons netwerk en begin vandaag nog met het ontvangen van gekwalificeerde leads.
        </p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-100">
          Meld U Nu Aan
        </Button>
      </div>
    </section>
  )
}

