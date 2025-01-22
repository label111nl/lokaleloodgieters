import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LoodgieterRegistratieQuiz } from "@/components/LoodgieterRegistratieQuiz"

export default function LoodgieterRegistratiePage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <LoodgieterRegistratieQuiz />
      </main>
      <Footer />
    </>
  )
}

