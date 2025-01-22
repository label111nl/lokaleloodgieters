import { NextResponse } from "next/server"
import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"
import { logAIUsage } from "@/lib/logAIUsage"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      // Fetch the active AI model for content generation
      const { data: activeModel, error: modelError } = await supabase
        .from("ai_models")
        .select("*")
        .eq("is_active", true)
        .eq("provider", "OpenAI")
        .single()

      if (modelError || !activeModel) {
        throw new Error("No active OpenAI model found for content generation")
      }

      const openai = new OpenAI({
        apiKey: activeModel.api_key || process.env.OPENAI_API_KEY,
      })

      const { topic, keywords } = await req.json()

      const prompt = `Write a blog post about ${topic}. Include the following keywords: ${keywords}. The content should be SEO-friendly and engaging for readers.`

      const completion = await openai.chat.completions.create({
        model: activeModel.model_id,
        messages: [{ role: "user", content: prompt }],
      })

      const generatedContent = completion.choices[0].message.content

      await logAIUsage(activeModel.id, "system", "content-generation", completion.usage.total_tokens)

      return NextResponse.json({ content: generatedContent })
    } catch (error) {
      console.error("Error generating content:", error)
      return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
  }
}

