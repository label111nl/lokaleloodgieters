"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { AddAIModelForm } from "@/components/AddAIModelForm"

interface AIModel {
  id: number
  name: string
  provider: string
  model_id: string
  api_key: string | null
  is_free: boolean
  is_active: boolean
}

export function AIModelManagement() {
  const [models, setModels] = useState<AIModel[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("ai_models").select("*")
      if (error) throw error
      setModels(data)
    } catch (error) {
      toast({
        title: "Fout bij het ophalen van AI-modellen",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateModel = async (id: number, updates: Partial<AIModel>) => {
    try {
      const { error } = await supabase.from("ai_models").update(updates).eq("id", id)
      if (error) throw error
      toast({
        title: "Model bijgewerkt",
        description: "Het AI-model is succesvol bijgewerkt.",
      })
      fetchModels()
    } catch (error) {
      toast({
        title: "Fout bij het bijwerken van het model",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      })
    }
  }

  const deleteModel = async (id: number) => {
    if (window.confirm("Weet u zeker dat u dit model wilt verwijderen?")) {
      try {
        const { error } = await supabase.from("ai_models").delete().eq("id", id)
        if (error) throw error
        toast({
          title: "Model verwijderd",
          description: "Het AI-model is succesvol verwijderd.",
        })
        fetchModels()
      } catch (error) {
        toast({
          title: "Fout bij het verwijderen van het model",
          description: "Er is een fout opgetreden. Probeer het later opnieuw.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">AI-modellen beheren</h2>
      <Button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? "Verberg Formulier" : "Voeg Nieuw Model Toe"}
      </Button>
      {showAddForm && (
        <AddAIModelForm
          onModelAdded={() => {
            fetchModels()
            setShowAddForm(false)
          }}
        />
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Naam</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Model ID</TableHead>
            <TableHead>API Key</TableHead>
            <TableHead>Gratis</TableHead>
            <TableHead>Actief</TableHead>
            <TableHead>Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {models.map((model) => (
            <TableRow key={model.id}>
              <TableCell>{model.name}</TableCell>
              <TableCell>{model.provider}</TableCell>
              <TableCell>{model.model_id}</TableCell>
              <TableCell>
                <Input
                  type="password"
                  value={model.api_key || ""}
                  onChange={(e) => updateModel(model.id, { api_key: e.target.value })}
                  placeholder={model.is_free ? "Niet vereist" : "API Key"}
                  disabled={model.is_free}
                />
              </TableCell>
              <TableCell>{model.is_free ? "Ja" : "Nee"}</TableCell>
              <TableCell>
                <Switch
                  checked={model.is_active}
                  onCheckedChange={(checked) => updateModel(model.id, { is_active: checked })}
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => updateModel(model.id, { is_active: !model.is_active })}>
                  {model.is_active ? "Deactiveren" : "Activeren"}
                </Button>
                <Button variant="destructive" onClick={() => deleteModel(model.id)} className="ml-2">
                  Verwijderen
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

