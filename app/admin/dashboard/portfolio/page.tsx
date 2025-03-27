"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, RefreshCw, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import type { Portfolio } from "@/lib/supabase"

export default function PortfolioManagement() {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
  })

  // Fetch portfolio items
  const fetchPortfolio = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/portfolio")
      if (!response.ok) throw new Error("Failed to fetch portfolio")
      const data = await response.json()
      setPortfolio(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch portfolio items. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPortfolio()
  }, [])

  // Handle bulk upload
  const handleBulkUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    const files = fileInputRef.current?.files
    if (!files?.length) {
      toast({
        title: "Error",
        description: "Please select files to upload",
        variant: "destructive",
      })
      return
    }

    try {
      setUploading(true)
      const formData = new FormData()
      
      // Log the number of files being uploaded
      console.log(`Uploading ${files.length} files`)
      
      Array.from(files).forEach((file) => {
        formData.append('files', file)
        // Log each file being added to formData
        console.log(`Adding file: ${file.name}, size: ${file.size}, type: ${file.type}`)
      })

      // Upload files to Cloudinary
      console.log('Sending files to upload endpoint...')
      const uploadResponse = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text()
        console.error('Upload failed:', errorText)
        throw new Error(`Upload failed: ${errorText}`)
      }

      const uploadedFiles = await uploadResponse.json()
      console.log('Files uploaded successfully:', uploadedFiles)

      // Add items to portfolio
      console.log('Adding items to portfolio...')
      for (const file of uploadedFiles) {
        try {
          const response = await fetch("/api/admin/portfolio", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(file),
          })
          
          if (!response.ok) {
            const errorText = await response.text()
            console.error('Failed to add portfolio item:', errorText)
            throw new Error(`Failed to add portfolio item: ${errorText}`)
          }
        } catch (error) {
          console.error('Error adding portfolio item:', error)
          throw error
        }
      }

      toast({
        title: "Success",
        description: `Successfully uploaded ${files.length} images!`,
      })

      // Reset form and refresh portfolio
      if (fileInputRef.current) fileInputRef.current.value = ""
      fetchPortfolio()
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload images. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  // Add new portfolio item
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      })

      if (!response.ok) throw new Error("Failed to add portfolio item")

      toast({
        title: "Success",
        description: "Portfolio item added successfully!",
      })

      // Reset form and refresh portfolio
      setNewItem({
        title: "",
        description: "",
        imageUrl: "",
        category: "",
      })
      fetchPortfolio()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add portfolio item. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Delete portfolio item
  const handleDeleteItem = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/portfolio?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete portfolio item")

      toast({
        title: "Success",
        description: "Portfolio item deleted successfully!",
      })

      fetchPortfolio()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete portfolio item. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Portfolio Management</h1>
        <Button
          onClick={fetchPortfolio}
          variant="outline"
          size="icon"
          className="ml-2"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Bulk Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Upload Images</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBulkUpload} className="flex items-center gap-4">
            <Input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              className="flex-1"
            />
            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Images
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Add New Portfolio Item Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Portfolio Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Title"
                value={newItem.title}
                onChange={(e) =>
                  setNewItem({ ...newItem, title: e.target.value })
                }
              />
              <Input
                placeholder="Category"
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
              />
            </div>
            <Textarea
              placeholder="Description"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              className="min-h-[100px]"
            />
            <div className="flex items-center gap-4">
              <Input
                placeholder="Image URL"
                value={newItem.imageUrl}
                onChange={(e) =>
                  setNewItem({ ...newItem, imageUrl: e.target.value })
                }
                className="flex-1"
              />
              <Button type="submit" className="flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Portfolio Items Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Items</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.category}
                    </p>
                    <p className="text-sm line-clamp-2">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
              {portfolio.length === 0 && (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No portfolio items found. Add your first item above.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
} 