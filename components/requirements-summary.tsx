import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  Users,
  Mail,
  DollarSign,
  Calendar,
  BarChart3,
  Settings,
  Shield,
} from "lucide-react";

const requirementCategories = [
  {
    icon: Users,
    title: "Contact & Member Management",
    requirements: [
      "Unlimited contact storage and management",
      "Member registration and profile management",
      "Family relationship tracking",
      "Contact import/export capabilities",
      "Advanced search and filtering",
    ],
  },
  {
    icon: Mail,
    title: "Communication Features",
    requirements: [
      "Unlimited email broadcasting",
      "Automated notification systems",
      "Email template customization",
      "Campaign management and tracking",
    ],
  },
  {
    icon: DollarSign,
    title: "Financial Management",
    requirements: [
      "Complete donation tracking",
      "Payment processing integration",
      "Financial reporting and analytics",
      "Recurring donation management",
      "Tax receipt generation",
    ],
  },
  {
    icon: Calendar,
    title: "Event & Service Management",
    requirements: [
      "Funeral service scheduling",
      "Event calendar management",
      "Resource booking system",
      "Service coordination tools",
      "Automated reminders",
    ],
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    requirements: [
      "Comprehensive dashboard",
      "Custom report generation",
      "Financial analytics",
      "Member engagement metrics",
      "Export capabilities",
    ],
  },
  {
    icon: Settings,
    title: "Platform Customization",
    requirements: [
      "White labeling with custom domain",
      "Branding customization",
      "Custom workflow automation",
      "User role management",
      "API access for integrations",
    ],
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    requirements: [
      "Data encryption and security",
      "PIPEDA compliance",
      "Regular security audits",
      "Backup and disaster recovery",
      "Access control and permissions",
    ],
  },
];

export function RequirementsSummary() {
  return (
    <section className="bg-gradient-to-b from-secondary/20 to-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Complete Requirements Summary
          </h2>
          <div className="mt-3 h-1 w-20 bg-primary" />
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            All previously discussed requirements and features included in this
            proposal to ensure complete transparency and avoid any additional
            charges. This comprehensive list covers all agreed-upon
            functionality.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {requirementCategories.map((category) => (
            <Card
              key={category.title}
              className="transition-all hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <category.icon className="h-6 w-6" />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.requirements.map((requirement) => (
                    <li key={requirement} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {requirement}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-primary/5 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Commitment Guarantee
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                All requirements listed above are included in the stated pricing
                with no additional charges. This serves as our contractual
                commitment to deliver all discussed functionality within the
                agreed timeline and budget.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
