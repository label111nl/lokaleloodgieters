import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { OfferteForm } from "@/components/OfferteForm"

export default function OfferteAanvragenPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Offerte Aanvragen</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Vul het formulier in en ontvang binnen 24 uur offertes van gekwalificeerde loodgieters in uw regio.
          </p>
          <OfferteForm />
        </div>
      </main>
      <Footer />
    </>
  )
}

