import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { BentoGrid } from "@/components/BentoGrid"
import { Reviews } from "@/components/Reviews"
import { CoverageSection } from "@/components/CoverageSection"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BentoGrid />
      <Reviews />
      <CoverageSection />
      <Footer />
    </main>
  )
}

