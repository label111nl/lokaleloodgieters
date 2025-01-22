"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StarIcon } from "lucide-react"

interface Review {
  id: number
  customer_name: string
  rating: number
  comment: string
  created_at: string
}

export function BeoordelingenBeheer() {
  const [reviews, setReviews] = useState<Review[]>([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("plumber_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching reviews:", error)
    } else {
      setReviews(data)
    }
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <StarIcon key={i} className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
      ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Beoordelingen</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Klant</TableHead>
              <TableHead>Beoordeling</TableHead>
              <TableHead>Commentaar</TableHead>
              <TableHead>Datum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.customer_name}</TableCell>
                <TableCell>
                  <div className="flex">{renderStars(review.rating)}</div>
                </TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>{new Date(review.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

