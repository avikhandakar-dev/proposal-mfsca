import Image from "next/image"

export function ProposalHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <Image src="/logo.svg" alt="Bayah Logo" width={120} height={146} className="h-32 w-auto" priority />
          </div>

          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">BAYAH</h1>
          </div>

          {/* Title */}
          <div className="mb-6">
            <h2 className="text-3xl font-light tracking-wide sm:text-4xl lg:text-5xl">Service Proposal</h2>
          </div>

          {/* Subtitle */}
          <div className="mb-12">
            <p className="text-xl font-medium opacity-95 sm:text-2xl">Muslim Funeral Services Canada</p>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <div className="text-left">
              <p className="text-xs uppercase tracking-wider opacity-80">Date</p>
              <p className="mt-1 text-lg font-semibold">October 4, 2025</p>
            </div>
            <div className="text-left">
              <p className="text-xs uppercase tracking-wider opacity-80">Account Manager</p>
              <p className="mt-1 text-lg font-semibold">Avi Khandakar</p>
            </div>
            <div className="text-left">
              <p className="text-xs uppercase tracking-wider opacity-80">Website</p>
              <p className="mt-1 text-lg font-semibold">bayah.app</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
