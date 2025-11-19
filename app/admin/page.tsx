"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Proposal {
  id: string
  clientName: string
  titlePosition: string
  date: string
  signature: string
  createdAt: string
  updatedAt: string
}

interface Contract {
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
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchProposals = async () => {
    try {
      const response = await fetch('/api/proposals')
      const result = await response.json()
      
      if (result.success) {
        setProposals(result.data)
      }
    } catch (error) {
      console.error('Error fetching proposals:', error)
    }
  }

  const fetchContracts = async () => {
    try {
      const response = await fetch('/api/contracts')
      const result = await response.json()
      
      if (result.success) {
        setContracts(result.data)
      }
    } catch (error) {
      console.error('Error fetching contracts:', error)
    }
  }

  const fetchAll = async () => {
    setLoading(true)
    await Promise.all([fetchProposals(), fetchContracts()])
    setLoading(false)
  }

  const deleteProposal = async (id: string) => {
    if (!confirm('Are you sure you want to delete this proposal?')) {
      return
    }

    try {
      const response = await fetch(`/api/proposals?id=${id}`, {
        method: 'DELETE',
      })
      const result = await response.json()

      if (result.success) {
        toast({
          title: "Proposal deleted",
          description: "The proposal has been successfully deleted.",
        })
        fetchProposals()
      } else {
        throw new Error(result.message || 'Failed to delete proposal')
      }
    } catch (error) {
      console.error('Error deleting proposal:', error)
      toast({
        title: "Error",
        description: "Failed to delete proposal. Please try again.",
        variant: "destructive",
      })
    }
  }

  const deleteContract = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contract?')) {
      return
    }

    try {
      const response = await fetch(`/api/contracts?id=${id}`, {
        method: 'DELETE',
      })
      const result = await response.json()

      if (result.success) {
        toast({
          title: "Contract deleted",
          description: "The contract has been successfully deleted.",
        })
        fetchContracts()
      } else {
        throw new Error(result.message || 'Failed to delete contract')
      }
    } catch (error) {
      console.error('Error deleting contract:', error)
      toast({
        title: "Error",
        description: "Failed to delete contract. Please try again.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          View and manage all submitted proposals and contracts
        </p>
        <Button onClick={fetchAll} className="mt-4">
          Refresh All
        </Button>
      </div>

      {/* Proposals Section */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Proposal Submissions</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {proposals.length} proposal{proposals.length !== 1 ? 's' : ''} submitted
          </p>
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
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-normal text-muted-foreground">
                        {new Date(proposal.createdAt).toLocaleDateString()}
                      </span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteProposal(proposal.id)}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
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

      {/* Contracts Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Contract Submissions</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {contracts.length} contract{contracts.length !== 1 ? 's' : ''} submitted
          </p>
        </div>

        {contracts.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <div className="text-center text-muted-foreground">
                No contracts submitted yet.
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {contracts.map((contract) => (
              <Card key={contract.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{contract.clientName}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-normal text-muted-foreground">
                        {new Date(contract.createdAt).toLocaleDateString()}
                      </span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteContract(contract.id)}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Client Information</h3>
                      <p><strong>Name:</strong> {contract.clientName}</p>
                      <p><strong>Title/Position:</strong> {contract.titlePosition}</p>
                      <p><strong>Date:</strong> {contract.date}</p>
                      <p><strong>Submitted:</strong> {new Date(contract.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Signature</h3>
                      <div className="border rounded-lg p-4 bg-white">
                        <img 
                          src={contract.signature} 
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
    </div>
  )
}