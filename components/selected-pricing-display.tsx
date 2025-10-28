import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface SelectedPricingDisplayProps {
  selectedOption: string | null
}

const pricingDetails = {
  "fixed-monthly": {
    title: "Fixed Monthly Plan",
    price: "$335/month CAD",
    description: "Unlimited transactions with all platform features included. No hidden costs - all third-party fees included.",
  },
  "transaction-based": {
    title: "Transaction-Based Plan",
    price: "$0/month CAD + $0.67 per transaction CAD",
    description: "Pay only for what you use - perfect for variable activity. Transaction fee includes all third-party costs (Stripe, Mailgun, SMS gateways).",
  },
}

export function SelectedPricingDisplay({ selectedOption }: SelectedPricingDisplayProps) {
  if (!selectedOption) {
    return (
      <section className="border-t bg-secondary/20 py-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <Card className="border-2 border-dashed border-muted-foreground/30">
            <CardContent className="py-8 text-center">
              <p className="text-lg text-muted-foreground">
                Please select a pricing option above to proceed with your proposal
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  const details = pricingDetails[selectedOption as keyof typeof pricingDetails]

  return (
    <section className="border-t bg-gradient-to-b from-primary/5 to-background py-12">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <Card className="border-2 border-primary shadow-lg">
          <CardContent className="py-8">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-2xl font-bold text-foreground">Selected Pricing Option</h3>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-primary">{details.title}</p>
                  <p className="text-lg font-medium text-foreground">{details.price}</p>
                  <p className="text-muted-foreground">{details.description}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
