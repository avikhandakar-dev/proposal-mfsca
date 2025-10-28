import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Target,
  Mail,
  DollarSign,
  RefreshCw,
  Shield,
} from "lucide-react";

const capabilities = [
  {
    icon: Users,
    title: "Contact Management",
    description:
      "Maintain comprehensive member databases with subscription tracking and unlimited profiles",
  },
  {
    icon: Target,
    title: "Campaign Creation",
    description:
      "Launch targeted fundraising campaigns for funeral services with real-time tracking",
  },
  {
    icon: Mail,
    title: "Email Broadcasting",
    description:
      "Professional template-based communication with members and donors",
  },
  {
    icon: DollarSign,
    title: "Financial Management",
    description:
      "Track donations, expenses, and maintain transparent financial records",
  },
  {
    icon: RefreshCw,
    title: "Subscription Services",
    description:
      "Enable members to contribute regularly for peace of mind coverage",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Bank-grade encryption with 99.9% uptime guarantee",
  },
];

export function PlatformCapabilities() {
  return (
    <section className="bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Platform Capabilities
          </h2>
          <div className="mt-3 h-1 w-20 bg-primary" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <Card
              key={capability.title}
              className="group border-l-4 border-l-primary transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <capability.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {capability.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {capability.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
