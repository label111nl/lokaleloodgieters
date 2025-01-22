import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

interface AIModel {
  id: number
  name: string
  provider: string
  model_id: string
  cost_per_1000_tokens: number
  max_tokens: number
  is_active: boolean
}

export async function selectOptimalAIModel(taskType: string, inputTokens: number): Promise<AIModel | null> {
  try {
    const { data: models, error } = await supabase
      .from("ai_models")
      .select("*")
      .eq("is_active", true)
      .order("cost_per_1000_tokens", { ascending: true })

    if (error) throw error

    // Filter models based on task type and input size
    const suitableModels = models.filter((model: AIModel) => {
      // Add logic here to determine if a model is suitable for the task type
      // For example, you might have a 'supported_tasks' field in your ai_models table
      const isSuitableForTask = true // Placeholder, replace with actual logic

      return isSuitableForTask && model.max_tokens >= inputTokens
    })

    if (suitableModels.length === 0) {
      console.warn("No suitable AI model found for the given task and input size")
      return null
    }

    // Return the first (cheapest) suitable model
    return suitableModels[0]
  } catch (error) {
    console.error("Error selecting optimal AI model:", error)
    return null
  }
}

