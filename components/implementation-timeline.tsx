import { Card, CardContent } from "@/components/ui/card"

const timelineItems = [
  {
    phase: "1",
    title: "Training Phase (Week 3-4)",
    activities: "Administrator training sessions • User documentation delivery • Best practices workshop",
    deliverables: "Trained team • Documentation package • Training materials",
  },
  {
    phase: "2",
    title: "Go Live (Week 4)",
    activities: "Full platform activation • Ongoing support begins • Performance monitoring",
    deliverables: "Live system • Support channels active • Success metrics tracking",
  },
]

export function ImplementationTimeline() {
  return (
    <section className="bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Implementation Timeline</h2>
          <div className="mt-3 h-1 w-20 bg-primary" />
        </div>

        <div className="space-y-8">
          {timelineItems.map((item) => (
            <div key={item.phase} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-2xl font-bold text-primary-foreground shadow-lg">
                  {item.phase}
                </div>
              </div>

              <Card className="flex-1 border-l-4 border-l-primary">
                <CardContent className="p-8">
                  <h3 className="mb-4 text-2xl font-semibold text-primary">{item.title}</h3>
                  <div className="space-y-3">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground">Activities:</span> {item.activities}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground">Deliverables:</span> {item.deliverables}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
