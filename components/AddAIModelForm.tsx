"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

export function AddAIModelForm({ onModelAdded }: { onModelAdded: () => void }) {
  const [name, setName] = useState("")
  const [provider, setProvider] = useState("")
  const [modelId, setModelId] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isFree, setIsFree] = useState(false)
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from("ai_models").insert({
        name,
        provider,
        model_id: modelId,
        api_key: apiKey,
        is_free: isFree,
      })
      if (error) throw error
      toast({
        title: "Model toegevoegd",
        description: "Het nieuwe AI-model is succesvol toegevoegd.",
      })
      onModelAdded()
      // Reset form
      setName("")
      setProvider("")
      setModelId("")
      setApiKey("")
      setIsFree(false)
    } catch (error) {
      toast({
        title: "Fout bij toevoegen model",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Naam</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="provider">Provider</Label>
        <Input id="provider" value={provider} onChange={(e) => setProvider(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="modelId">Model ID</Label>
        <Input id="modelId" value={modelId} onChange={(e) => setModelId(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="apiKey">API Key</Label>
        <Input id="apiKey" type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="isFree" checked={isFree} onCheckedChange={setIsFree} />
        <Label htmlFor="isFree">Gratis model</Label>
      </div>
      <Button type="submit">Model Toevoegen</Button>
    </form>
  )
}

