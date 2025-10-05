"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircleIcon } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// Zod schema for form validation
const proposalFormSchema = z.object({
  clientName: z.string().min(1, "Client name is required").min(2, "Client name must be at least 2 characters"),
  titlePosition: z.string().min(1, "Title/Position is required").min(2, "Title/Position must be at least 2 characters"),
  date: z.string().min(1, "Date is required").refine((date) => {
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selectedDate >= today
  }, "Date cannot be in the past"),
  signature: z.string().min(1, "Signature is required"),
})

type ProposalFormData = z.infer<typeof proposalFormSchema>

export function SignatureSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  // React Hook Form setup with Zod validation
  const form = useForm<ProposalFormData>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      clientName: "",
      titlePosition: "",
      date: "",
      signature: "",
    },
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    
    // Update the signature field in the form when user stops drawing
    if (!isSignatureEmpty()) {
      const signatureDataURL = getSignatureDataURL()
      if (signatureDataURL) {
        form.setValue("signature", signatureDataURL)
        form.clearErrors("signature")
      }
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Clear the signature field in the form and remove any validation errors
    form.setValue("signature", "")
    form.clearErrors("signature")
  }

  const isSignatureEmpty = () => {
    const canvas = canvasRef.current
    if (!canvas) return true

    const ctx = canvas.getContext("2d")
    if (!ctx) return true

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    return !imageData.data.some((channel) => channel !== 0)
  }

  const getSignatureDataURL = () => {
    const canvas = canvasRef.current
    if (!canvas) return null
    return canvas.toDataURL('image/png')
  }

  const handleSubmit = async (data: ProposalFormData) => {
    // Get the current signature data (should already be in form state)
    const signatureDataURL = data.signature || getSignatureDataURL()
    
    if (!signatureDataURL) {
      toast({
        title: "Error",
        description: "Failed to capture signature.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: data.clientName,
          titlePosition: data.titlePosition,
          date: data.date,
          signature: signatureDataURL,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit proposal')
      }

      toast({
        title: "Success!",
        description: "Your proposal has been submitted successfully.",
      })

      // Set success state to show the success message
      setIsSubmitted(true)

      // Reset form
      form.reset()
      clearSignature()
    } catch (error) {
      console.error('Error submitting proposal:', error)
      toast({
        title: "Error",
        description: "Failed to submit proposal. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <section className="bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="mb-8">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Client Authorization & Acceptance
          </h2>
          <div className="mt-3 h-1 w-20 bg-primary" />
        </div>

        <p className="mb-12 leading-relaxed text-muted-foreground">
          This Service Proposal has been carefully reviewed and is hereby accepted by the client. By signing below, the
          client confirms their agreement with the terms, pricing, and conditions outlined herein.
        </p>

        {isSubmitted && (
          <Alert className="mb-8 border-green-200 bg-green-50 text-green-800">
            <CheckCircleIcon className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Proposal Submitted Successfully!</AlertTitle>
            <AlertDescription className="text-green-700">
              Thank you for your submission. Your proposal has been received and will be processed shortly. 
              You will receive a confirmation email with the details.
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="border-2">
                <CardContent className="p-6">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                          Client Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter client name"
                            className="mt-2 h-12 text-base"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              if (isSubmitted) setIsSubmitted(false)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6">
                  <FormField
                    control={form.control}
                    name="titlePosition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                          Title / Position
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter title or position"
                            className="mt-2 h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="border-2 sm:col-span-2">
                <CardContent className="p-6">
                  <FormField
                    control={form.control}
                    name="signature"
                    render={({ field }) => (
                      <FormItem>
                        <div className="mb-2 flex items-center justify-between">
                          <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                            Authorized Signature
                          </FormLabel>
                          <Button variant="outline" size="sm" onClick={clearSignature} type="button">
                            Clear
                          </Button>
                        </div>
                        <FormControl>
                          <canvas
                            ref={canvasRef}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                            className="mt-2 h-32 w-full cursor-crosshair rounded-md border-2 border-dashed bg-background touch-none"
                          />
                        </FormControl>
                        <p className="mt-2 text-xs text-muted-foreground">Draw your signature above</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="border-2 sm:col-span-2">
                <CardContent className="p-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                          Date
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="mt-2 h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <Card className="border-t-4 border-t-primary">
              <CardContent className="p-8">
                <p className="mb-4 font-semibold text-foreground">For and on behalf of Bayah LLC</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Authorized Representative: Avi Khandakar</p>
                  <p>Title: Account Manager, Bayah LLC</p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 flex justify-center">
              <Button 
                type="submit"
                size="lg" 
                className="h-14 px-12 text-base font-semibold"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Confirm & Submit Proposal"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  )
}
