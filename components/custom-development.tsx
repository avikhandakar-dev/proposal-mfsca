import { Card, CardContent } from "@/components/ui/card"
import { Settings, Link2, ClipboardList } from "lucide-react"

const services = [
  {
    icon: Settings,
    title: "Custom Enhancements",
    price: "$67 CAD per request",
    description: "Custom report templates • Specialized workflow automation • Custom email template design",
  },
  {
    icon: Link2,
    title: "Third-Party Integrations",
    price: "$67 CAD per integration",
    description: "Accounting software • Payment gateways • Communication platforms",
  },
  {
    icon: ClipboardList,
    title: "Scope Evaluation",
    price: "Complimentary",
    description: "Each request evaluated individually with detailed scope and pricing",
  },
]

export function CustomDevelopment() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Custom Development Available</h2>
        <div className="mt-3 h-1 w-20 bg-primary" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card
            key={service.title}
            className="border-l-4 border-l-primary transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <CardContent className="p-8">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">{service.title}</h3>
              <p className="mb-4 text-lg font-semibold text-primary">{service.price}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
