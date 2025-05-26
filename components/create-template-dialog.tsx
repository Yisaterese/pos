"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function CreateTemplateDialog() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOpen(false)
    toast({
      title: "Template created",
      description: "Your new receipt template has been created successfully.",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Template</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Receipt Template</DialogTitle>
            <DialogDescription>Design a new receipt template for your business.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="template-name" className="text-right">
                Template Name
              </Label>
              <Input id="template-name" placeholder="e.g., Standard Receipt" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paper-size" className="text-right">
                Paper Size
              </Label>
              <select
                id="paper-size"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="80mm">80mm (Thermal)</option>
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="header" className="text-right pt-2">
                Header Text
              </Label>
              <Textarea id="header" placeholder="Thank you for shopping with us!" className="col-span-3" rows={2} />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="footer" className="text-right pt-2">
                Footer Text
              </Label>
              <Textarea id="footer" placeholder="Please come again!" className="col-span-3" rows={2} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-1"></div>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="show-logo" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="show-logo">Show Logo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="show-tax" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="show-tax">Show Tax Breakdown</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="show-barcode" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="show-barcode">Show Barcode/QR Code</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Template</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
