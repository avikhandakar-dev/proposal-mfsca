import { Card, CardContent } from "@/components/ui/card"
import { User, Handshake, Mail, Phone } from "lucide-react"

const contacts = [
  {
    icon: User,
    label: "CEO",
    value: "Gunasegar Pubalan",
  },
  {
    icon: Handshake,
    label: "Account Manager",
    value: "Avi Khandakar",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@bayah.app",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(307) 998-4183",
  },
]

export function ContactSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Contact Information</h2>
        <div className="mt-3 h-1 w-20 bg-primary" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contacts.map((contact) => (
          <Card key={contact.label} className="bg-secondary/30">
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                <contact.icon className="h-8 w-8" />
              </div>
              <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">{contact.label}</p>
              <p className="text-lg font-semibold text-foreground">{contact.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
