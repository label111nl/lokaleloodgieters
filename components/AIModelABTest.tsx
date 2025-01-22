"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AIModel {
  id: number
  name: string
  provider: string
  model_id: string
}

interface TestResult {
  model_id: number
  response_time: number
  token_count: number
  response: string
}

export function AIModelABTest() {
  const [models, setModels] = useState<AIModel[]>([])
  const [modelA, setModelA] = useState<number | null>(null)
  const [modelB, setModelB] = useState<number | null>(null)
  const [prompt, setPrompt] = useState("")
  const [results, setResults] = useState<{ [key: string]: TestResult }>({})
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    try {
      const { data, error } = await supabase.from("ai_models").select("*").eq("is_active", true)

      if (error) throw error
      setModels(data)
    } catch (error) {
      console.error("Error fetching AI models:", error)
      toast({
        title: "Fout bij ophalen AI-modellen",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      })
    }
  }

  const runTest = async () => {
    if (!modelA || !modelB || !prompt) {
      toast({
        title: "Onvolledige gegevens",
        description: "Selecteer twee modellen en voer een prompt in.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const testModels = [modelA, modelB]
      const testResults: { [key: string]: TestResult } = {}

      for (const modelId of testModels) {
        const startTime = Date.now()
        const { data, error } = await supabase.functions.invoke("ai-model-test", {
          body: { model_id: modelId, prompt },
        })
        const endTime = Date.now()

        if (error) throw error

        testResults[modelId] = {
          model_id: modelId,
          response_time: endTime - startTime,
          token_count: data.token_count,
          response: data.response,
        }
      }

      setResults(testResults)
    } catch (error) {
      console.error("Error running A/B test:", error)
      toast({
        title: "Fout bij uitvoeren A/B-test",
        description: "Er is een fout opgetreden. Probeer het later opnieuw.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">AI-model A/B Test</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="modelA">Model A</Label>
          <Select onValueChange={(value) => setModelA(Number(value))}>
            <SelectTrigger id="modelA">
              <SelectValue placeholder="Selecteer Model A" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id.toString()}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="modelB">Model B</Label>
          <Select onValueChange={(value) => setModelB(Number(value))}>
            <SelectTrigger id="modelB">
              <SelectValue placeholder="Selecteer Model B" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id.toString()}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="prompt">Test Prompt</Label>
        <Textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Voer hier uw test prompt in..."
          rows={4}
        />
      </div>
      <Button onClick={runTest} disabled={loading}>
        {loading ? "Test uitvoeren..." : "Start A/B Test"}
      </Button>
      {Object.keys(results).length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-6">
          {Object.entries(results).map(([modelId, result]) => (
            <Card key={modelId}>
              <CardHeader>
                <CardTitle>{models.find((m) => m.id === Number(modelId))?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Responstijd: {result.response_time}ms</p>
                <p>Tokens gebruikt: {result.token_count}</p>
                <Textarea value={result.response} readOnly rows={6} className="mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

