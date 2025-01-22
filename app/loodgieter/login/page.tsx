import { LoginForm } from "@/components/LoginForm"

export default function PlumberLoginPage() {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Loodgieter Inloggen</h1>
        <LoginForm userType="plumber" />
      </div>
    </div>
  )
}

