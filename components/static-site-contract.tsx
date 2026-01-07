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
  Settings,
  Bug,
  FileText,
  Code,
  CheckCircle2,
  Shield,
  Clock,
  DollarSign,
  User,
  Handshake,
  Mail,
  Phone,
  CheckCircleIcon,
  GitBranch,
  Server,
  Globe,
  XCircle,
} from "lucide-react";


// Zod schema for form validation
const contractFormSchema = z.object({
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

type ContractFormData = z.infer<typeof contractFormSchema>;

export function StaticSiteContract() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // React Hook Form setup with Zod validation
  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      clientName: "",
      titlePosition: "",
      date: "",
      signature: "",
    },
  });

  const services = [
    {
      icon: Settings,
      title: "Maintenance",
      description:
        "Ongoing maintenance to ensure your static site runs smoothly and efficiently",
    },
    {
      icon: Bug,
      title: "Bug Fixes",
      description:
        "Prompt identification and resolution of any bugs or issues that arise",
    },
    {
      icon: FileText,
      title: "Content Updates",
      description:
        "Regular content updates to keep your site current and relevant",
    },
    {
      icon: Code,
      title: "GitHub Environments",
      description:
        "Three separate environments (DEV/UAT/PROD) managed on GitHub for safe deployments",
    },
  ];

  const contacts = [
    {
      icon: Handshake,
      label: "Developer",
      value: "Avi Khandakar",
    },
    {
      icon: Mail,
      label: "Email",
      value: "avikhandakar@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+8801752439315",
    },
    {
      icon: Globe,
      label: "Website",
      value: "https://www.alphanumericwebs.com/",
      isLink: true,
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

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { x, y } = getCoordinates(e);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const { x, y } = getCoordinates(e);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (!canvas) return;

      const signature = canvas.toDataURL();
      form.setValue("signature", signature);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    form.setValue("signature", "");
  };

  const onSubmit = async (data: ContractFormData) => {
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
          title: "Contract Submitted Successfully!",
          description: "Thank you for your submission. We'll be in touch soon.",
        });
      } else {
        throw new Error(result.error || "Failed to submit contract");
      }
    } catch (error) {
      console.error("Error submitting contract:", error);
      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your contract. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 flex items-center justify-center">
                <Image
                  src="https://www.alphanumericwebs.com/logo.svg"
                  alt="Alpha Numeric Webs Logo"
                  width={160}
                  height={53}
                  className="h-12 w-auto"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Alpha Numeric Webs</h1>
                <p className="text-sm text-slate-300">Static Site Management Contract</p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm border-slate-600 text-slate-200 bg-slate-800">
              Contract Proposal
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Hero Section */}
          <Card className="border-slate-200 shadow-sm bg-gradient-to-r from-blue-50 to-slate-50">
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-slate-900">
                  Static Site Management Contract
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Comprehensive maintenance, bug fixes, and content updates for
                  your static website with professional GitHub environment
                  management
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Services Overview */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Services Included
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">
                          {service.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Pricing Section */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Pricing & Billing
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-4xl font-bold text-blue-600">$50</span>
                  <span className="text-xl text-slate-600">CAD</span>
                  <span className="text-xl text-slate-600">/month</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Fixed monthly rate covering all maintenance, bug fixes, and
                  content updates
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-slate-700">
                      Maintenance & monitoring
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-slate-700">
                      Bug fixes and issue resolution
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-slate-700">
                      Content updates and changes
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-slate-700">
                      3 GitHub environments (DEV/UAT/PROD)
                    </span>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> New features and functionality
                  enhancements are not included in this contract and will
                  require a separate contract with additional pricing.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* GitHub Environments */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                GitHub Environment Management
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <GitBranch className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      DEV
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    Development environment for testing new changes and updates
                    before deployment
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <GitBranch className="h-5 w-5 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      UAT
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    User Acceptance Testing environment for client review and
                    approval before production
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Server className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      PROD
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    Production environment for live website with stable, tested
                    code
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scope & Limitations */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Scope & Limitations
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">
                      Included Services
                    </h3>
                    <ul className="text-sm text-slate-600 leading-relaxed mt-1 space-y-1 list-disc list-inside">
                      <li>Routine maintenance and monitoring</li>
                      <li>Bug fixes and error resolution</li>
                      <li>Content updates (text, images, basic HTML/CSS)</li>
                      <li>GitHub repository management</li>
                      <li>Environment deployment coordination</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">
                      Not Included (Requires New Contract)
                    </h3>
                    <ul className="text-sm text-slate-600 leading-relaxed mt-1 space-y-1 list-disc list-inside">
                      <li>New features and functionality</li>
                      <li>Major design changes or redesigns</li>
                      <li>Integration with new third-party services</li>
                      <li>Performance optimization beyond basic fixes</li>
                      <li>Custom development work</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms & Conditions */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Terms & Conditions
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">
                      Response Time
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      We commit to responding to maintenance requests and bug
                      reports within 12 business hours. Critical issues will be
                      addressed with priority.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">
                      Billing
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Monthly billing will commence upon contract signing. The
                      contract can be terminated with 30 days written notice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">
                      Code Ownership
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      All code and content remain the property of the client.
                      Alpha Numeric Webs maintains access for maintenance purposes only.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <XCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-900">
                      Contract Termination
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      The contract can be terminated with 30 days written notice.
                      This provides both parties with flexibility while ensuring
                      a smooth transition period if needed.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>

          </Card>

          {/* Contact Information */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Contact Information
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {contacts.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 rounded-lg border border-slate-200 bg-slate-50"
                    >
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">
                          {contact.label}
                        </p>
                        {contact.isLink ? (
                          <a
                            href={contact.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-slate-900">
                            {contact.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
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
                    Contract Submitted Successfully!
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
                          By signing this contract, you agree to the monthly
                          billing terms, service scope, and limitations as
                          outlined above. The contract can be terminated with 30
                          days written notice. New features will require a
                          separate contract agreement.
                        </p>

                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Submit Contract
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

