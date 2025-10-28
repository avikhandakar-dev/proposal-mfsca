export function ExecutiveSummary() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="space-y-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Executive Summary
          </h2>
          <div className="mt-3 h-1 w-20 bg-primary" />
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Bayah is a comprehensive SaaS platform designed specifically for
            mosques and religious facilities to streamline funeral service
            fundraising and operations. Our platform enables organizations like
            MFSCA to efficiently manage member contacts, create fundraising
            campaigns, communicate through email broadcasting, and maintain
            complete financial oversight of funeral services.
          </p>
          <p>
            With MFSCA serving{" "}
            <span className="font-semibold text-foreground">2000+ members</span>{" "}
            across Canada, Bayah provides the digital infrastructure to scale
            your noble mission of easing financial burdens and providing
            compassionate support to families during their most difficult times.
          </p>
        </div>
      </div>
    </section>
  );
}
