import { NextResponse } from "next/server"
import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"
import { writeFile } from "fs/promises"
import path from "path"
import { logAIUsage } from "@/lib/logAIUsage"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      // Fetch the active AI model for image analysis
      const { data: activeModel, error: modelError } = await supabase
        .from("ai_models")
        .select("*")
        .eq("is_active", true)
        .eq("provider", "OpenAI")
        .single()

      if (modelError || !activeModel) {
        throw new Error("No active OpenAI model found for image analysis")
      }

      const openai = new OpenAI({
        apiKey: activeModel.api_key || process.env.OPENAI_API_KEY,
      })

      const formData = await req.formData()
      const image = formData.get("image") as File

      if (!image) {
        return NextResponse.json({ error: "No image provided" }, { status: 400 })
      }

      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const tempFilePath = path.join("/tmp", image.name)
      await writeFile(tempFilePath, buffer)

      const response = await openai.chat.completions.create({
        model: activeModel.model_id,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Analyze this plumbing-related image and describe the problem you see." },
              {
                type: "image_url",
                image_url: {
                  url: `data:${image.type};base64,${buffer.toString("base64")}`,
                },
              },
            ],
          },
        ],
      })

      const analysis = response.choices[0].message.content

      await logAIUsage(activeModel.id, "system", "image-analysis", response.usage.total_tokens)

      return NextResponse.json({ analysis })
    } catch (error) {
      console.error("Error analyzing image:", error)
      return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
  }
}

