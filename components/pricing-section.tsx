"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const pricingOptions = [
  {
    id: "fixed-monthly",
    title: "Fixed Monthly",
    price: "$250",
    period: "/month",
    description: "High-volume organizations (500+ transactions/month)",
    features: [
      "Unlimited transactions",
      "All platform features",
      "Unlimited contacts",
      "Unlimited campaigns",
      "Unlimited email broadcasting",
      "Full financial management",
      "Unlimited user accounts",
      "Unlimited data storage",
      "Email & phone support",
      "Dedicated account manager",
      "1 year free migration support",
    ],
    recommended: false,
  },
  {
    id: "transaction-based",
    title: "Transaction-Based",
    price: "$0",
    period: "/month",
    additionalCost: "+ $0.50 per transaction",
    description: "Variable activity organizations - scale costs with usage",
    features: [
      "Pay only for what you use",
      "All platform features",
      "Unlimited contacts",
      "Unlimited campaigns",
      "Unlimited email broadcasting",
      "Full financial management",
      "Unlimited user accounts",
      "Unlimited data storage",
      "Email & phone support",
      "Dedicated account manager",
      "1 year free migration support",
    ],
    recommended: true,
  },
]

interface PricingSectionProps {
  selectedOption: string | null
  onSelectOption: (optionId: string) => void
}

export function PricingSection({ selectedOption, onSelectOption }: PricingSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Pricing Options</h2>
        <div className="mt-3 h-1 w-20 bg-primary" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {pricingOptions.map((option) => (
          <Card
            key={option.title}
            onClick={() => onSelectOption(option.id)}
            className={`relative cursor-pointer transition-all hover:shadow-xl ${
              option.recommended ? "border-2 border-primary shadow-lg" : ""
            } ${selectedOption === option.id ? "ring-4 ring-primary ring-offset-2 ring-offset-background" : ""}`}
          >
            {option.recommended && (
              <div className="absolute -top-4 right-8">
                <Badge className="bg-primary px-6 py-2 text-sm font-semibold uppercase tracking-wide">
                  Recommended
                </Badge>
              </div>
            )}

            {selectedOption === option.id && (
              <div className="absolute -top-4 left-8">
                <Badge className="bg-green-600 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white">
                  Selected
                </Badge>
              </div>
            )}

            <CardHeader className="space-y-6 pb-8 pt-10 text-center">
              <div>
                <h3 className="text-2xl font-semibold text-foreground">{option.title}</h3>
              </div>
              <div>
                <div className="flex items-baseline justify-center">
                  <span className="text-6xl font-bold tracking-tight text-primary">{option.price}</span>
                  <span className="ml-2 text-xl text-muted-foreground">{option.period}</span>
                </div>
                {option.additionalCost && (
                  <p className="mt-3 text-lg font-medium text-primary">{option.additionalCost}</p>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-8 pb-10">
              <ul className="space-y-4">
                {option.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-center text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Best for:</span> {option.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-12 bg-secondary/30">
        <CardContent className="p-8">
          <h3 className="mb-4 text-xl font-semibold text-foreground">What counts as a transaction?</h3>
          <p className="leading-relaxed text-muted-foreground">
            Billable transactions include: Sending invoices • Processing member subscription payments • Recording
            donations • Payment processing for funeral campaigns • Financial transactions across all services
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
