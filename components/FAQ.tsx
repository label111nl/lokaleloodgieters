"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Hoe werkt het leadgeneratieproces?",
    answer:
      "Wij ontvangen aanvragen van klanten en sturen deze door naar de meest geschikte loodgieters in ons netwerk, gebaseerd op locatie en expertise.",
  },
  {
    question: "Kan ik mijn abonnement op elk moment wijzigen?",
    answer:
      "Ja, u kunt uw abonnement op elk moment upgraden of downgraden. Wijzigingen gaan in bij de volgende factureringsperiode.",
  },
  {
    question: "Hoe worden de leads verdeeld onder loodgieters?",
    answer:
      "Leads worden verdeeld op basis van locatie, beschikbaarheid en specialisatie. Premium abonnees krijgen voorrang bij de toewijzing van leads.",
  },
  {
    question: "Is er een minimale contractperiode?",
    answer:
      "Nee, er is geen minimale contractperiode. U kunt op elk moment opzeggen met een opzegtermijn van 30 dagen.",
  },
  {
    question: "Hoe kan ik mijn profiel optimaliseren voor meer leads?",
    answer:
      "Zorg voor een volledig ingevuld profiel, voeg foto's van uw werk toe, en moedig tevreden klanten aan om recensies achter te laten.",
  },
]

export function FAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Veelgestelde Vragen</h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

