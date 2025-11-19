import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Force dynamic rendering to prevent build-time errors
export const dynamic = 'force-dynamic'

// Validation schema for contract data
const contractSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  titlePosition: z.string().min(1, 'Title/Position is required'),
  date: z.string().min(1, 'Date is required'),
  signature: z.string().min(1, 'Signature is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request data
    const validatedData = contractSchema.parse(body)
    
    // Save to database
    const contract = await prisma.contract.create({
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
        message: 'Contract submitted successfully',
        id: contract.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving contract:', error)
    
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
    const contracts = await prisma.contract.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return NextResponse.json({
      success: true,
      data: contracts,
    })
  } catch (error) {
    console.error('Error fetching contracts:', error)
    
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
          message: 'Contract ID is required' 
        },
        { status: 400 }
      )
    }
    
    await prisma.contract.delete({
      where: { id },
    })
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contract deleted successfully' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting contract:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

