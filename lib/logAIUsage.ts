import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function logAIUsage(modelId: number, userId: string, usageType: string, tokensUsed: number) {
  try {
    await supabase.from("ai_usage_logs").insert({
      model_id: modelId,
      user_id: userId,
      usage_type: usageType,
      tokens_used: tokensUsed,
    })
  } catch (error) {
    console.error("Error logging AI usage:", error)
  }
}

