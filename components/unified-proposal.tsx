"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Users,
  Target,
  Mail,
  DollarSign,
  RefreshCw,
  Shield,
  Check,
  CheckCircle2,
  BarChart3,
  Settings,
  Calendar,
  XCircle,
  Clock,
  Globe,
  Database,
  CheckCircle,
  User,
  Handshake,
  Phone,
  Link2,
  ClipboardList,
  ExternalLink,
  CheckCircleIcon,
} from "lucide-react";

// Zod schema for form validation
const proposalFormSchema = z.object({
  clientName: z
    .string()
    .min(1, "Client name is required")
    .min(2, "Client name must be at least 2 characters"),
  titlePosition: z
    .string()
    .min(1, "Title/Position is required")
    .min(2, "Title/Position must be at least 2 characters"),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, "Date cannot be in the past"),
  signature: z.string().min(1, "Signature is required"),
});

type ProposalFormData = z.infer<typeof proposalFormSchema>;

interface UnifiedProposalProps {
  selectedOption: string | null;
  onSelectOption: (optionId: string) => void;
}

export function UnifiedProposal({
  selectedOption,
  onSelectOption,
}: UnifiedProposalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // React Hook Form setup with Zod validation
  const form = useForm<ProposalFormData>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      clientName: "",
      titlePosition: "",
      date: "",
      signature: "",
    },
  });

  // Data structures
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
      icon: Shield,
      title: "Security & Compliance",
      description: "Bank-grade encryption with 99.9% uptime guarantee",
    },
  ];

  const pricingOptions = [
    {
      id: "fixed-monthly",
      title: "Fixed Monthly",
      price: "$350",
      period: "/month CAD",
      description: "High-volume organizations (500+ transactions/month)",
      features: [
        "Unlimited transactions",
        "All platform features",
        "Unlimited contacts",
        "Unlimited campaigns",
        "Unlimited email broadcasting",
        "Full financial management",
        "Unlimited user accounts",
        "Unlimited data storage",
        "Email support",
        "Dedicated account manager",
        "White labeling with custom domain",
        "Complete data ownership and portability",
        "Daily automated backups included",
      ],
      recommended: false,
    },
    {
      id: "transaction-based",
      title: "Transaction-Based",
      price: "$0",
      period: "/month CAD",
      additionalCost: "+ $0.67 per transaction CAD",
      description: "Variable activity organizations - scale costs with usage",
      features: [
        "Pay only for what you use",
        "All platform features",
        "Unlimited contacts",
        "Unlimited campaigns",
        "Unlimited email broadcasting",
        "Full financial management",
        "Unlimited user accounts",
        "Unlimited data storage",
        "Email support",
        "Dedicated account manager",
        "White labeling with custom domain",
        "Complete data ownership and portability",
        "Daily automated backups included",
      ],
      recommended: true,
    },
  ];

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
  ];

  // Canvas drawing functions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const signatureData = canvas.toDataURL();
    form.setValue("signature", signatureData);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    form.setValue("signature", "");
  };

  const onSubmit = async (data: ProposalFormData) => {
    try {
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Proposal Submitted Successfully!",
          description: "Thank you for your submission. We'll be in touch soon.",
        });
      } else {
        throw new Error(result.error || "Failed to submit proposal");
      }
    } catch (error) {
      console.error("Error submitting proposal:", error);
      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your proposal. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header Section */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 border border-dashed rounded-lg flex items-center justify-center p-2">
                <Image
                  src="/logo.svg"
                  alt="Bayah Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  BAYAH Service Proposal
                </h1>
                <p className="text-slate-600 text-sm">
                  Muslim Funeral Services Canada
                </p>
              </div>
            </div>
            <div className="text-right text-sm text-slate-600">
              <p>
                <span className="font-medium">Date:</span> October 28, 2025
              </p>
              <p>
                <span className="font-medium">Account Manager:</span> Avi
                Khandakar
              </p>
              <p>
                <span className="font-medium">Website:</span> bayah.app
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <p className="text-slate-700 leading-relaxed">
              Bayah is a comprehensive SaaS platform designed specifically for
              mosques and religious facilities to streamline funeral service
              fundraising and operations. Our platform enables organizations
              like MFSCA to efficiently manage member contacts, create
              fundraising campaigns, communicate through email broadcasting, and
              maintain complete financial oversight of funeral services. With
              MFSCA serving 2000+ members across Canada, Bayah provides the
              digital infrastructure to scale your noble mission of easing
              financial burdens and providing compassionate support to families
              during their most difficult times.
            </p>
          </div>

          {/* Our Expertise Section */}
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Our Expertise
              </h2>
              <p className="text-slate-600">
                Professional tools and proven experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {capabilities.map((capability, index) => (
                <Card
                  key={index}
                  className="border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <capability.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {capability.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {capability.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contractual Clarity & Ownership */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Contractual Clarity & Ownership
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-1 gap-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-medium text-slate-900">
                          White Labeling & Custom Domain
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Complete white labeling is included in your package.
                          You can add your own custom domain, and all "powered
                          by Bayah" references will be removed from your
                          platform. Your organization will have full branding
                          control with no external references visible to your
                          members.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Database className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-medium text-slate-900">
                          Data Ownership & Portability
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          You maintain complete ownership of all your data. We
                          do not misuse or share your data with third parties.
                          Your data can be downloaded at any time in standard
                          formats, ensuring full portability. You have the right
                          to export all member information, financial records,
                          and campaign data whenever needed.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-medium text-slate-900">
                          Backup & Data Security
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Our database is automatically backed up every 24 hours
                          to ensure data integrity and security. These backups
                          are stored securely and can be used for data recovery
                          if needed. Additionally, you can download your data at
                          any time for your own backup purposes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Transparency */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Cost Transparency
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">
                      No Hidden Costs
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      There are absolutely no hidden costs in our pricing
                      structure. The monthly fee or transaction-based pricing
                      covers all platform features, unlimited storage, support,
                      and maintenance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">
                      Third-Party Payment Processing
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      The only additional cost is the Stripe payment processing
                      fee (2.9% + 30¢ per transaction), which is a standard
                      industry rate for secure payment processing. This fee goes
                      directly to Stripe and is not marked up by Bayah.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">
                      Email Gateway Included
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Professional email broadcasting and communication services
                      are included at no additional cost. This covers all member
                      communications, campaign updates, and administrative
                      emails.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* MFSCA Specific Requirements */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                MFSCA Specific Requirements
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">
                      30-Day Membership Activation
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Membership benefits will activate after 30 days of
                      registration, as per MFSCA's current policy. This feature
                      will be built into the system at no additional cost.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">
                      Age Dependency Rules
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Members aged 25+ cannot be registered as dependents,
                      maintaining MFSCA's current eligibility requirements. This
                      business rule will be enforced automatically by the
                      system.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">
                      Registration Approval Process
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      All new member registrations will require administrative
                      approval before activation, ensuring quality control and
                      compliance with MFSCA's membership standards.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing & Implementation */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Billing & Implementation
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">
                      Billing Start Date
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Billing will commence only after full implementation and
                      acceptance of the platform. No charges will apply from the
                      signing date until the system is fully operational and
                      accepted by MFSCA.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">
                      Usability Clause
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Since the platform cannot be used before complete
                      implementation, charges will not apply until it is fully
                      operational and all features are available for use.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">
                      Currency & Payment Terms
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      All billing will be in Canadian Dollars (CAD). Payment
                      terms and invoicing will be established upon contract
                      signing with flexible payment options available.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Options */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Pricing Options
            </h2>

            <div className="grid lg:grid-cols-2 gap-6">
              {pricingOptions.map((option) => (
                <Card
                  key={option.title}
                  onClick={() => onSelectOption(option.id)}
                  className={`cursor-pointer transition-all border-2 hover:shadow-md ${
                    selectedOption === option.id
                      ? "border-blue-500 shadow-lg"
                      : option.recommended
                      ? "border-blue-200"
                      : "border-slate-200"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {option.title}
                      </h3>
                      {option.recommended && (
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-bold text-slate-900">
                        {option.price}
                      </span>
                      <span className="text-slate-600">{option.period}</span>
                    </div>
                    {option.additionalCost && (
                      <p className="text-sm text-slate-600">
                        {option.additionalCost}
                      </p>
                    )}
                    <p className="text-sm text-slate-600">
                      {option.description}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {option.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pricing Note */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> After one year, for each 100 members, the
                price will increase by $15 CAD.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <h3 className="text-lg font-semibold text-slate-900">
                  Contact Information
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {contacts.map((contact) => (
                  <div
                    key={contact.label}
                    className="flex items-center space-x-3"
                  >
                    <contact.icon className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-700">
                      {contact.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <h3 className="text-lg font-semibold text-slate-900">
                  Implementation Timeline
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-900">
                      Phase 1: Setup & Training
                    </span>
                    <span className="text-sm text-slate-600">2-3 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-900">
                      Phase 2: Go-Live & Support
                    </span>
                    <span className="text-sm text-slate-600">1 week</span>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <div className="space-y-1">
                    <p className="text-sm text-slate-700">
                      • Platform configuration and customization
                    </p>
                    <p className="text-sm text-slate-700">
                      • Staff training and documentation
                    </p>
                    <p className="text-sm text-slate-700">
                      • Data migration and testing
                    </p>
                    <p className="text-sm text-slate-700">
                      • Ongoing support and optimization
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Our SaaS Platform Services */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Our SaaS Platform Services
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-slate-600" />
                    <h3 className="text-lg font-medium text-slate-900">
                      Custom Enhancements
                    </h3>
                  </div>
                  <p className="text-sm text-blue-600 font-semibold">
                    $67 CAD per request
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Custom report templates • Specialized workflow automation
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Link2 className="h-5 w-5 text-slate-600" />
                    <h3 className="text-lg font-medium text-slate-900">
                      Third-Party Integrations
                    </h3>
                  </div>
                  <p className="text-sm text-blue-600 font-semibold">
                    $67 CAD per integration
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Accounting software • Payment gateways • Communication
                    platforms
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <ClipboardList className="h-5 w-5 text-slate-600" />
                    <h3 className="text-lg font-medium text-slate-900">
                      Scope Evaluation
                    </h3>
                  </div>
                  <p className="text-sm text-blue-600 font-semibold">
                    Complimentary
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Each request evaluated individually with detailed scope and
                    pricing
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signature Section */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Signature & Agreement
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              {isSubmitted ? (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">
                    Proposal Submitted Successfully!
                  </AlertTitle>
                  <AlertDescription className="text-green-700">
                    Thank you for your submission. We'll be in touch soon to
                    discuss the next steps.
                  </AlertDescription>
                </Alert>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="clientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">
                              Client Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                className="text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="titlePosition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">
                              Title/Position
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your title or position"
                                className="text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="max-w-xs">
                          <FormLabel className="text-sm">Date</FormLabel>
                          <FormControl>
                            <Input type="date" className="text-sm" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-3">
                      <Label className="text-sm">Digital Signature</Label>
                      <div className="border border-slate-300 rounded-lg p-3 bg-slate-50">
                        <canvas
                          ref={canvasRef}
                          width={500}
                          height={120}
                          className="w-full h-20 border border-slate-200 rounded cursor-crosshair bg-white"
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                        />
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-slate-600">Sign above</p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={clearSignature}
                            className="text-xs"
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                      {form.formState.errors.signature && (
                        <p className="text-sm text-red-600">
                          {form.formState.errors.signature.message}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-800 font-medium text-sm mb-1">
                          Terms & Conditions
                        </p>
                        <p className="text-blue-700 text-xs leading-relaxed">
                          By signing this proposal, you agree to the payment
                          terms, project timeline, and scope as outlined above.
                          All work remains property of Bayah until final payment
                          is received.
                        </p>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Submit Proposal
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
