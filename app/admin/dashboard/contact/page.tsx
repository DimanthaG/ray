"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Mail, Phone, Building2, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  subject: string | null
  message: string
  status: 'unread' | 'read'
  created_at: string
}

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/contact')
      if (!response.ok) throw new Error('Failed to fetch submissions')
      const data = await response.json()
      setSubmissions(data)
    } catch (error) {
      console.error('Error fetching submissions:', error)
      toast({
        title: "Error",
        description: "Failed to load contact submissions",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'read' }),
      })

      if (!response.ok) throw new Error('Failed to update status')

      setSubmissions(prev =>
        prev.map(sub =>
          sub.id === id ? { ...sub, status: 'read' } : sub
        )
      )

      toast({
        title: "Success",
        description: "Message marked as read",
      })
    } catch (error) {
      console.error('Error updating submission:', error)
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Contact Submissions</h2>
        <p className="text-muted-foreground">
          View and manage contact form submissions from your website visitors.
        </p>
      </div>

      <div className="grid gap-6">
        {submissions.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            No contact submissions yet.
          </Card>
        ) : (
          submissions.map((submission) => (
            <Card key={submission.id} className="p-6">
              <div className="flex flex-col md:flex-row gap-6 justify-between">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        {submission.subject || "No Subject"}
                        <Badge variant={submission.status === 'unread' ? "default" : "secondary"}>
                          {submission.status}
                        </Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(submission.created_at), 'PPpp')}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span className="font-medium">{submission.name}</span>
                    </div>
                    <a
                      href={`mailto:${submission.email}`}
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {submission.email}
                    </a>
                    {submission.phone && (
                      <a
                        href={`tel:${submission.phone}`}
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {submission.phone}
                      </a>
                    )}
                    {submission.company && (
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {submission.company}
                      </div>
                    )}
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">{submission.message}</p>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 md:w-[100px]">
                  {submission.status === 'unread' && (
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => markAsRead(submission.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
} 