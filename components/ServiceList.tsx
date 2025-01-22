import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    title: "Loodgieterswerk",
    description: "Reparatie en installatie van leidingen, kranen, en sanitair.",
  },
  {
    title: "Ontstopping",
    description: "Snelle en effectieve ontstopping van afvoeren en rioleringen.",
  },
  {
    title: "CV-ketel onderhoud",
    description: "Regelmatig onderhoud en reparatie van verwarmingssystemen.",
  },
  {
    title: "Dakwerk",
    description: "Reparatie en onderhoud van dakgoten en regenpijpen.",
  },
]

export function ServiceList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {services.map((service, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{service.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

