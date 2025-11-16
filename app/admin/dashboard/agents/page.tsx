"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, RefreshCw, Edit2, QrCode, Copy, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Agent } from "@/lib/supabase"

export default function AgentsManagement() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    bio: "",
    profile_image_url: "",
    location: "",
    website: "",
    linkedin_url: "",
    whatsapp_number: "",
    is_active: true,
    is_verified: true,
  })

  // Fetch agents
  const fetchAgents = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/agents")
      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        const errorMessage = error.hint 
          ? `${error.error || "Failed to fetch agents"}. ${error.hint}`
          : error.error || error.message || "Failed to fetch agents"
        throw new Error(errorMessage)
      }
      const data = await response.json()
      setAgents(data)
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to fetch agents. Please try again."
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("Error fetching agents:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAgents()
  }, [])

  // Add new agent
  const handleAddAgent = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/admin/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAgent),
      })

      if (!response.ok) {
        const error = await response.json()
        const errorMessage = error.hint 
          ? `${error.error || "Failed to add agent"}. ${error.hint}`
          : error.error || error.message || "Failed to add agent"
        throw new Error(errorMessage)
      }

      toast({
        title: "Success",
        description: "Agent added successfully!",
      })

      // Reset form and refresh agents
      setNewAgent({
        name: "",
        email: "",
        phone: "",
        title: "",
        bio: "",
        profile_image_url: "",
        location: "",
        website: "",
        linkedin_url: "",
        whatsapp_number: "",
        is_active: true,
        is_verified: true,
      })
      setIsAdding(false)
      fetchAgents()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add agent. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Update agent
  const handleUpdateAgent = async (id: number, updatedData: Partial<Agent>) => {
    try {
      const response = await fetch(`/api/admin/agents/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) throw new Error("Failed to update agent")

      toast({
        title: "Success",
        description: "Agent updated successfully!",
      })

      setEditingId(null)
      fetchAgents()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update agent. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Delete agent
  const handleDeleteAgent = async (id: number) => {
    if (!confirm("Are you sure you want to delete this agent?")) return

    try {
      const response = await fetch(`/api/admin/agents?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete agent")

      toast({
        title: "Success",
        description: "Agent deleted successfully!",
      })

      fetchAgents()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete agent. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Copy QR code URL
  const copyQrCodeUrl = (qrCode: string) => {
    const url = `${window.location.origin}/agent/${qrCode}`
    navigator.clipboard.writeText(url)
    toast({
      title: "Copied!",
      description: "QR code URL copied to clipboard",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Agents Management</h1>
        <div className="flex gap-2">
          <Button
            onClick={fetchAgents}
            variant="outline"
            size="icon"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Agent
          </Button>
        </div>
      </div>

      {/* Add New Agent Form */}
      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddAgent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Agent Name"
                    value={newAgent.name}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="agent@example.com"
                    value={newAgent.email}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="+1 234 567 8900"
                    value={newAgent.phone}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Sales Agent, Business Development, etc."
                    value={newAgent.title}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={newAgent.location}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, location: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="profile_image_url">Profile Image URL</Label>
                  <Input
                    id="profile_image_url"
                    placeholder="https://example.com/image.jpg"
                    value={newAgent.profile_image_url}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, profile_image_url: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://example.com"
                    value={newAgent.website}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, website: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    placeholder="https://linkedin.com/in/agent"
                    value={newAgent.linkedin_url}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, linkedin_url: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
                  <Input
                    id="whatsapp_number"
                    placeholder="+1234567890"
                    value={newAgent.whatsapp_number}
                    onChange={(e) =>
                      setNewAgent({ ...newAgent, whatsapp_number: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Agent biography and description..."
                  value={newAgent.bio}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, bio: e.target.value })
                  }
                  rows={4}
                />
              </div>
              <div className="flex gap-4">
                <Button type="submit">Add Agent</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Agents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agents ({agents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>QR Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell>{agent.email}</TableCell>
                      <TableCell>{agent.title || "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {agent.qr_code}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyQrCodeUrl(agent.qr_code)}
                            title="Copy QR Code URL"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {agent.is_active ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <span className="text-xs">
                            {agent.is_active ? "Active" : "Inactive"}
                            {agent.is_verified && " • Verified"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (editingId === agent.id) {
                                setEditingId(null)
                              } else {
                                setEditingId(agent.id)
                              }
                            }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const url = `${window.location.origin}/agent/${agent.qr_code}`
                              window.open(url, "_blank")
                            }}
                            title="View Agent Page"
                          >
                            <QrCode className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteAgent(agent.id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {agents.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No agents found. Add your first agent above.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

