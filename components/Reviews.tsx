import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function Reviews() {
  const reviews = [
    {
      name: "Jan de Vries",
      rating: 5,
      text: "Ik had een lekkage en ze waren er binnen een uur. Zeer professioneel en netjes gewerkt.",
    },
    {
      name: "Maria Jansen",
      rating: 5,
      text: "Mijn radiator werd perfect gerepareerd. Ik ben zeer tevreden met de ondersteuning.",
    },
    {
      name: "Peter Bakker",
      rating: 5,
      text: "Uitstekende service voor een eerlijke prijs. Zeker een aanrader!",
    },
  ]

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Wat onze klanten zeggen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{review.text}</p>
                <p className="font-semibold">{review.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

