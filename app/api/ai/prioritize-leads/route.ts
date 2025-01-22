import { NextResponse } from "next/server"
import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"
import { logAIUsage } from "@/lib/logAIUsage"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      // Fetch the active AI model for lead prioritization
      const { data: activeModel, error: modelError } = await supabase
        .from("ai_models")
        .select("*")
        .eq("is_active", true)
        .eq("provider", "OpenAI")
        .single()

      if (modelError || !activeModel) {
        throw new Error("No active OpenAI model found for lead prioritization")
      }

      const openai = new OpenAI({
        apiKey: activeModel.api_key || process.env.OPENAI_API_KEY,
      })

      const { leads } = await req.json()

      const prompt = `Prioritize the following leads based on urgency, potential value, and response time:
      ${JSON.stringify(leads)}
      
      Return the prioritized leads as a JSON array with added 'priority' field (1 being highest priority).`

      const completion = await openai.chat.completions.create({
        model: activeModel.model_id,
        messages: [{ role: "user", content: prompt }],
      })

      const prioritizedLeads = JSON.parse(completion.choices[0].message.content)

      await logAIUsage(activeModel.id, "system", "lead-prioritization", completion.usage.total_tokens)

      return NextResponse.json(prioritizedLeads)
    } catch (error) {
      console.error("Error prioritizing leads:", error)
      return NextResponse.json({ error: "Failed to prioritize leads" }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
  }
}

