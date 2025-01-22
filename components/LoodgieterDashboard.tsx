"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OffertesList } from "@/components/OffertesList"
import { ProfielBeheer } from "@/components/ProfielBeheer"
import { AbonnementBeheer } from "@/components/AbonnementBeheer"
import { OffertesOverzicht } from "@/components/OffertesOverzicht"
import { LoodgieterSidebar } from "@/components/LoodgieterSidebar"

interface LoodgieterData {
  id: string
  // Add other properties as needed
}

interface LoodgieterDashboardProps {
  loodgieterData: LoodgieterData | null
}

export function LoodgieterDashboard({ loodgieterData }: LoodgieterDashboardProps) {
  const [activeTab, setActiveTab] = useState("offertes")

  if (!loodgieterData) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen">
      <LoodgieterSidebar />
      <div className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Loodgieter Dashboard</CardTitle>
            <CardDescription>Beheer uw offertes, profiel en abonnement</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="offertes">Offertes</TabsTrigger>
                <TabsTrigger value="offertes_overzicht">Offertes Overzicht</TabsTrigger>
                <TabsTrigger value="profiel">Profiel</TabsTrigger>
                <TabsTrigger value="abonnement">Abonnement</TabsTrigger>
              </TabsList>
              <TabsContent value="offertes">
                <OffertesList loodgieterId={loodgieterData.id} />
              </TabsContent>
              <TabsContent value="offertes_overzicht">
                <OffertesOverzicht />
              </TabsContent>
              <TabsContent value="profiel">
                <ProfielBeheer loodgieterData={loodgieterData} />
              </TabsContent>
              <TabsContent value="abonnement">
                <AbonnementBeheer loodgieterId={loodgieterData.id} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

