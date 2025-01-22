import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegistratieBevestigingPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Registratie Ontvangen</h1>
        <p className="mb-6">
          Bedankt voor uw registratie als loodgieter op ons platform. We hebben uw aanvraag ontvangen en zullen deze zo
          snel mogelijk verwerken.
        </p>
        <p className="mb-6">U ontvangt binnen 24 uur een e-mail met verdere instructies om uw account te activeren.</p>
        <Link href="/">
          <Button>Terug naar Home</Button>
        </Link>
      </main>
      <Footer />
    </>
  )
}

