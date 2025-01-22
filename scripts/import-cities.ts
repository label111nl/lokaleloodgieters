import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// Voorbeeld steden per provincie (dit zou je kunnen uitbreiden met een complete lijst)
const citiesByProvince: Record<string, string[]> = {
  "Noord-Holland": ["Amsterdam", "Haarlem", "Alkmaar", "Zaandam", "Hoorn", "Purmerend", "Den Helder"],
  "Zuid-Holland": ["Rotterdam", "Den Haag", "Leiden", "Dordrecht", "Delft", "Gouda", "Zoetermeer"],
  Utrecht: ["Utrecht", "Amersfoort", "Veenendaal", "Nieuwegein", "Zeist", "Woerden"],
  // ... voeg andere provincies toe
}

async function importCities() {
  try {
    // Voor elke provincie
    for (const [provinceName, cities] of Object.entries(citiesByProvince)) {
      // Haal provincie ID op
      const { data: province, error: provinceError } = await supabase
        .from("provinces")
        .select("id")
        .eq("name", provinceName)
        .single()

      if (provinceError) throw provinceError

      // Voeg steden toe
      for (const cityName of cities) {
        const { error: cityError } = await supabase.from("cities").insert({ name: cityName, province_id: province.id })

        if (cityError && cityError.code !== "23505") {
          // Negeer unieke constraint violations
          console.error(`Error adding ${cityName}:`, cityError)
        }
      }

      console.log(`Added cities for ${provinceName}`)
    }

    console.log("Cities import completed")
  } catch (error) {
    console.error("Import failed:", error)
  }
}

importCities()

