import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function OverOnsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Over Ons</h1>
        <p className="mb-4">
          Welkom bij het Lokale Loodgieters Platform. Wij verbinden gekwalificeerde loodgieters met klanten die op zoek
          zijn naar betrouwbare loodgietersdiensten.
        </p>
        <p className="mb-4">
          Ons platform is opgericht met als doel het vinden van een goede loodgieter eenvoudiger en transparanter te
          maken voor consumenten, terwijl we tegelijkertijd loodgieters helpen hun bedrijf te laten groeien.
        </p>
        <p>
          Met ons uitgebreide netwerk van gecontroleerde professionals kunt u erop vertrouwen dat u altijd de beste
          service krijgt voor al uw loodgietersbehoeften.
        </p>
      </main>
      <Footer />
    </>
  )
}

