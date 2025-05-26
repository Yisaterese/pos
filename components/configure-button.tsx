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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface ConfigureButtonProps {
  title: string
  description: string
  fields?: { id: string; label: string; type?: string; placeholder?: string }[]
}

export function ConfigureButton({
  title,
  description,
  fields = [
    { id: "api-key", label: "API Key", type: "password", placeholder: "Enter API key" },
    { id: "webhook", label: "Webhook URL", placeholder: "https://example.com/webhook" },
  ],
}: ConfigureButtonProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setOpen(false)
    toast({
      title: "Configuration saved",
      description: `${title} has been configured successfully.`,
    })
  }

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Configure
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {fields.map((field) => (
                <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field.id} className="text-right">
                    {field.label}
                  </Label>
                  <Input
                    id={field.id}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    className="col-span-3"
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
