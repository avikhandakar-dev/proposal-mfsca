"use client";

import { StaticSiteContract } from "@/components/static-site-contract";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ANW Service Proposal - MFSCA",
  description:
    "Static Site Management Contract",
};

export default function StaticSiteContractPage() {
  return (
    <main className="min-h-screen">
      <StaticSiteContract />
    </main>
  );
}

