import { Card, CardContent } from "@/components/ui/card"
import { Calendar, XCircle, DollarSign, Clock } from "lucide-react"

const terms = [
  {
    icon: Calendar,
    title: "Flexible Terms",
    description: "Month-to-month billing with no long-term commitment required",
  },
  {
    icon: XCircle,
    title: "Easy Cancellation",
    description: "30-day notice, cancel anytime without penalties",
  },
  {
    icon: DollarSign,
    title: "No Setup Fees",
    description: "Setup fee waived for MFSCA - get started immediately",
  },
  {
    icon: Clock,
    title: "Quick Payment",
    description: "Net 15 days from invoice date, billed monthly in USD",
  },
]

export function ContractTerms() {
  return (
    <section className="bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Contract Terms</h2>
          <div className="mt-3 h-1 w-20 bg-primary" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {terms.map((term) => (
            <Card key={term.title} className="transition-all hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <term.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">{term.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{term.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
