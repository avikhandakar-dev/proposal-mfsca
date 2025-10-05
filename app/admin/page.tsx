"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Proposal {
  id: string
  clientName: string
  titlePosition: string
  date: string
  signature: string
  createdAt: string
  updatedAt: string
}

export default function AdminPage() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProposals = async () => {
    try {
      const response = await fetch('/api/proposals')
      const result = await response.json()
      
      if (result.success) {
        setProposals(result.data)
      }
    } catch (error) {
      console.error('Error fetching proposals:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProposals()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading proposals...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Proposal Submissions</h1>
        <p className="text-muted-foreground mt-2">
          View all submitted proposals from clients
        </p>
        <Button onClick={fetchProposals} className="mt-4">
          Refresh
        </Button>
      </div>

      {proposals.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-muted-foreground">
              No proposals submitted yet.
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {proposals.map((proposal) => (
            <Card key={proposal.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{proposal.clientName}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {new Date(proposal.createdAt).toLocaleDateString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Client Information</h3>
                    <p><strong>Name:</strong> {proposal.clientName}</p>
                    <p><strong>Title/Position:</strong> {proposal.titlePosition}</p>
                    <p><strong>Date:</strong> {proposal.date}</p>
                    <p><strong>Submitted:</strong> {new Date(proposal.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Signature</h3>
                    <div className="border rounded-lg p-4 bg-white">
                      <img 
                        src={proposal.signature} 
                        alt="Client Signature" 
                        className="max-w-full h-auto"
                        style={{ maxHeight: '150px' }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}