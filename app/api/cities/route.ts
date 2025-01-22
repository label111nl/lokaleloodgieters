import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const provinceId = searchParams.get("provinceId")

  if (!provinceId) {
    return NextResponse.json({ error: "Province ID is required" }, { status: 400 })
  }

  const supabase = createRouteHandlerClient({ cookies })

  const { data: cities, error } = await supabase
    .from("cities")
    .select("id, name")
    .eq("province_id", provinceId)
    .order("name")

  if (error) {
    return NextResponse.json({ error: "Failed to fetch cities" }, { status: 500 })
  }

  return NextResponse.json(cities)
}

