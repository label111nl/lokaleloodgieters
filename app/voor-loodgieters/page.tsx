"use client"

import { VoorLoodgietersHero } from "@/components/VoorLoodgietersHero"
import { AbonnementsPrijzen } from "@/components/AbonnementsPrijzen"
import { FunctiesEnVoordelen } from "@/components/FunctiesEnVoordelen"
import { FAQ } from "@/components/FAQ"
import { CTASection } from "@/components/CTASection"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function VoorLoodgietersPage() {
  return (
    <>
      <Header />
      <main>
        <VoorLoodgietersHero />
        <AbonnementsPrijzen />
        <FunctiesEnVoordelen />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

