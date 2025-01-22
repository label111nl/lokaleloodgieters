"use client"

import { Gauge, Settings, Activity, TestTube2, AlertCircle, KeyRound } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/ThemeToggle"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue_Modern_Technician_Logo__4_-removebg-preview-3T9gZitsIhkqVBhK2OQ4KMpj2EMa1a.png"
                alt="Logo"
                className="h-8 w-auto"
              />
              <span className="font-semibold">Admin Dashboard</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Hoofdmenu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard"}>
                      <Link href="/admin/dashboard">
                        <Gauge className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>AI Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/ai-models"}>
                      <Link href="/admin/ai-models">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>AI Model Management</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/ai-usage"}>
                      <Link href="/admin/ai-usage">
                        <Activity className="mr-2 h-4 w-4" />
                        <span>AI Usage Statistics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/ab-testing"}>
                      <Link href="/admin/ab-testing">
                        <TestTube2 className="mr-2 h-4 w-4" />
                        <span>A/B Testing</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/error-logs"}>
                      <Link href="/admin/error-logs">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        <span>Error Logs</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/admin/api-keys"}>
                      <Link href="/admin/api-keys">
                        <KeyRound className="mr-2 h-4 w-4" />
                        <span>API Keys</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">v1.0.0</span>
            <ThemeToggle />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="flex h-16 items-center gap-2 border-b px-4">
            <SidebarTrigger />
          </div>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

