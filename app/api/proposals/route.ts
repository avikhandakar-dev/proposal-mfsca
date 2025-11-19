import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic'

// Validation schema for proposal data
const proposalSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  titlePosition: z.string().min(1, 'Title/Position is required'),
  date: z.string().min(1, 'Date is required'),
  signature: z.string().min(1, 'Signature is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request data
    const validatedData = proposalSchema.parse(body)
    
    // Save to database
    const proposal = await prisma.proposal.create({
      data: {
        clientName: validatedData.clientName,
        titlePosition: validatedData.titlePosition,
        date: validatedData.date,
        signature: validatedData.signature,
      },
    })
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Proposal submitted successfully',
        id: proposal.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving proposal:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const proposals = await prisma.proposal.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json({
      success: true,
      data: proposals,
    })
  } catch (error) {
    console.error('Error fetching proposals:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Proposal ID is required' 
        },
        { status: 400 }
      )
    }
    
    await prisma.proposal.delete({
      where: { id },
    })
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Proposal deleted successfully' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting proposal:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}