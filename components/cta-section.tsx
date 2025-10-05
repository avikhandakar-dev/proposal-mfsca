import { Button } from "@/components/ui/button"
import { Mail, ExternalLink } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:px-8 lg:px-12 lg:py-28">
        <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Ready to Get Started?</h2>
        <p className="mb-10 text-xl opacity-95 sm:text-2xl">
          Join us in empowering MFSCA to serve your 2000+ members more efficiently
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            variant="secondary"
            className="h-14 px-8 text-lg font-semibold shadow-lg transition-all hover:scale-105"
            asChild
          >
            <a href="mailto:support@bayah.app">
              <Mail className="mr-2 h-5 w-5" />
              Schedule a Demo
            </a>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="h-14 px-8 text-lg font-semibold shadow-lg transition-all hover:scale-105"
            asChild
          >
            <a href="https://bayah.app" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-5 w-5" />
              Visit Our Website
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
