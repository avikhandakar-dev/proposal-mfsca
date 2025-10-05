"use client";

import { useState } from "react";
import { ProposalHero } from "@/components/proposal-hero";
import { ExecutiveSummary } from "@/components/executive-summary";
import { PlatformCapabilities } from "@/components/platform-capabilities";
import { PricingSection } from "@/components/pricing-section";
import { ImplementationTimeline } from "@/components/implementation-timeline";
import { CustomDevelopment } from "@/components/custom-development";
import { ContractTerms } from "@/components/contract-terms";
import { ContactSection } from "@/components/contact-section";
import { CTASection } from "@/components/cta-section";
import { SignatureSection } from "@/components/signature-section";
import { SelectedPricingDisplay } from "@/components/selected-pricing-display";

export default function ProposalPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <main className="min-h-screen">
      <ProposalHero />
      <ExecutiveSummary />
      <PlatformCapabilities />
      <PricingSection
        selectedOption={selectedOption}
        onSelectOption={setSelectedOption}
      />
      <ImplementationTimeline />
      <CustomDevelopment />
      <ContractTerms />
      <ContactSection />
      <SelectedPricingDisplay selectedOption={selectedOption} />
      <SignatureSection />
    </main>
  );
}
