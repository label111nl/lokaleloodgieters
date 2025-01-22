import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { BentoGrid } from "@/components/BentoGrid"

export default function DienstenPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Onze Diensten</h1>
        <p className="text-lg text-gray-600 mb-8">
          Ontdek ons uitgebreide aanbod van loodgietersdiensten. Of het nu gaat om een kleine reparatie of een groot
          project, wij staan voor u klaar.
        </p>
        <BentoGrid />
      </main>
      <Footer />
    </>
  )
}

