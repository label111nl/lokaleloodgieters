import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LoginForm } from "@/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Inloggen</h1>
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}

