"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  userType: "plumber" | "admin"
}

export function LoginForm({ userType, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("email", email)
        .single()

      if (userError) throw userError

      toast({
        title: "Ingelogd",
        description: `U bent succesvol ingelogd als ${userType === "plumber" ? "loodgieter" : "admin"}.`,
      })

      if (userType === "admin" && userData.role === "admin") {
        router.push("/admin/dashboard")
      } else if (userType === "plumber" && userData.role === "plumber") {
        router.push("/loodgieter/dashboard")
      } else {
        throw new Error("Unauthorized: Invalid user role")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Fout bij inloggen",
        description: "Er is een fout opgetreden. Controleer uw gegevens en probeer het opnieuw.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card {...props}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Inloggen</CardTitle>
        <CardDescription>
          Voer uw e-mailadres en wachtwoord in om toegang te krijgen tot uw{" "}
          {userType === "admin" ? "admin" : "loodgieter"} account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                placeholder="naam@voorbeeld.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Wachtwoord</Label>
              <Input
                id="password"
                name="password"
                placeholder="Uw wachtwoord"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Inloggen
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button
          variant="link"
          className="px-0 text-xs text-muted-foreground"
          onClick={() => router.push("/wachtwoord-vergeten")}
        >
          Wachtwoord vergeten?
        </Button>
      </CardFooter>
    </Card>
  )
}

