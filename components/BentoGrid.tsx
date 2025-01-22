"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wrench, Droplet, Thermometer, Home, PenTool, Shield, Hammer, ShowerHeadIcon as Shower } from "lucide-react"

interface Service {
  id: number
  name: string
  description: string
  icon: string
}

const iconMap = {
  Wrench,
  Droplet,
  Thermometer,
  Home,
  PenTool,
  Shield,
  Hammer,
  Shower,
}

export function BentoGrid() {
  const [services, setServices] = useState<Service[]>([])
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase.from("services").select("*").order("id")

      if (error) {
        console.error("Error fetching services:", error)
      } else {
        setServices(data || [])
      }
    }

    fetchServices()
  }, [supabase])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => {
        const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Wrench
        return (
          <Card key={service.id} className="overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="p-4">
              <div className="flex items-center space-x-4">
                <div className="bg-primary p-2 rounded-full">
                  <IconComponent className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{service.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

