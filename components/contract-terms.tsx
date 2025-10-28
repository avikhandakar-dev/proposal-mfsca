import { Card, CardContent } from "@/components/ui/card"
import { Calendar, XCircle, DollarSign, Clock, Globe, Database, Shield, CheckCircle } from "lucide-react"

const terms = [
  {
    icon: Globe,
    title: "White Labeling & Domain",
    description: "Complete white labeling included with your custom domain. Full branding control and ownership.",
  },
  {
    icon: Database,
    title: "Data Ownership & Portability",
    description: "You own all your data. Complete data portability guaranteed. Daily automated backups with 30-day retention.",
  },
  {
    icon: Shield,
    title: "Infrastructure & Security",
    description: "Secure cloud infrastructure with daily backups. Data export available in standard formats anytime.",
  },
  {
    icon: CheckCircle,
    title: "Implementation Billing",
    description: "Billing begins only after full implementation and client acceptance. No charges during development phase.",
  },
  {
    icon: Calendar,
    title: "Flexible Terms",
    description: "Month-to-month billing with no long-term commitment required",
  },
  {
    icon: XCircle,
    title: "Easy Cancellation",
    description: "30-day notice, cancel anytime without penalties. Full data export provided upon cancellation.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden costs. All third-party fees (Stripe, Mailgun, SMS) included in stated pricing.",
  },
  {
    icon: Clock,
    title: "Payment Terms",
    description: "Net 15 days from invoice date, billed monthly in CAD after platform is fully operational",
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
