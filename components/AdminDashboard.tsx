"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AIUsageStats } from "@/components/AIUsageStats"
import {
  Settings,
  Activity,
  TestTube2,
  AlertCircle,
  KeyRound,
  Users,
  FileText,
  Layout,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AdminSidebar } from "@/components/AdminSidebar"

export function AdminDashboard() {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loodgieters</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription>Beheer loodgietersaccounts</CardDescription>
                <Button asChild className="mt-4">
                  <Link href="/admin/loodgieters">Bekijk Loodgieters</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription>Bekijk en beheer leads</CardDescription>
                <Button asChild className="mt-4">
                  <Link href="/admin/leads">Bekijk Leads</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blogs</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription>Beheer blogartikelen</CardDescription>
                <Button asChild className="mt-4">
                  <Link href="/admin/blogs">Bekijk Blogs</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pagina's</CardTitle>
                <Layout className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription>Beheer website pagina's</CardDescription>
                <Button asChild className="mt-4">
                  <Link href="/admin/pages">Bekijk Pagina's</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Model Management</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription>Beheer en configureer AI-modellen</CardDescription>
                <Button asChild className="mt-4">
                  <Link href="/admin/ai-models">Ga naar AI Models</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Usage Statistics</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription>Bekijk AI gebruiksstatistieken</CardDescription>
                <Button asChild className="mt-4">
                  <Link href="/admin/ai-usage">Bekijk Statistieken</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">A/B Testing</CardTitle>
                <TestTube2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription>Voer A/B-tests uit op AI-modellen</CardDescription>
                <Button asChild className="mt-4">
                  <Link href="/admin/ab-testing">Start A/B Test</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error Logs</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription>Bekijk en analyseer foutmeldingen</CardDescription>
                <Button asChild className="mt-4">
                  <Link href="/admin/error-logs">Bekijk Logs</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Keys</CardTitle>
                <KeyRound className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription>Beheer API-sleutels en toegang</CardDescription>
                <Button asChild className="mt-4">
                  <Link href="/admin/api-keys">Beheer API Keys</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Gebruiksstatistieken</CardTitle>
              <CardDescription>Realtime overzicht van AI-gebruik</CardDescription>
            </CardHeader>
            <CardContent>
              <AIUsageStats />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

