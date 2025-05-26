"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { FadeIn, SlideIn } from "@/components/animations"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  // This would normally fetch the customer based on the ID
  const customer = {
    id: params.id,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    country: "United States",
    status: "Active",
    notes: "Prefers email communication. Interested in electronics products.",
  }

  const handleSaveChanges = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Customer updated",
        description: "Customer information has been successfully updated",
      })
      router.push(`/customers/${params.id}`)
    }, 1000)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Customer updated",
        description: `${customer.name}'s information has been updated successfully.`,
      })

      router.push(`/customers/${params.id}`)
    }, 1000)
  }

  return (
    <FadeIn className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href={`/customers/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Edit Customer: {customer.name}</h2>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid gap-6 md:grid-cols-2">
          <SlideIn direction="left" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update the customer's basic details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={customer.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={customer.email} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue={customer.phone} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={customer.status.toLowerCase()}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Add any additional details about the customer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" defaultValue={customer.notes} rows={4} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="e.g. VIP, Wholesale, Retail" />
                </div>
              </CardContent>
            </Card>
          </SlideIn>

          <SlideIn direction="right" delay={0.1} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
                <CardDescription>Update the customer's address details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" defaultValue={customer.address} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue={customer.city} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" defaultValue={customer.state} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                    <Input id="zipCode" defaultValue={customer.zipCode} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" defaultValue={customer.country} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Communication Preferences</CardTitle>
                <CardDescription>Set how the customer prefers to be contacted</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Preferred Contact Method</Label>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="email-pref" name="contact-pref" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="email-pref">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="phone-pref" name="contact-pref" className="h-4 w-4" />
                    <Label htmlFor="phone-pref">Phone</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="sms-pref" name="contact-pref" className="h-4 w-4" />
                    <Label htmlFor="sms-pref">SMS</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="marketing" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="marketing">Receive marketing emails</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="newsletter" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="newsletter">Subscribe to newsletter</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="promotions" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="promotions">Receive promotions and discounts</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <Button variant="outline" asChild>
                  <Link href={`/customers/${params.id}`}>Cancel</Link>
                </Button>
                <Button onClick={handleSaveChanges} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </SlideIn>
        </div>
      </form>
    </FadeIn>
  )
}
