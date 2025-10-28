"use client";

import { useState } from "react";
import { UnifiedProposal } from "@/components/unified-proposal";

export default function ProposalPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <main className="min-h-screen">
      <UnifiedProposal
        selectedOption={selectedOption}
        onSelectOption={setSelectedOption}
      />
    </main>
  );
}
