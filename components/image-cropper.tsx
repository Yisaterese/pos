"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { RotateCw, ZoomIn } from "lucide-react"

interface ImageCropperProps {
  image: string
  onCrop: (croppedImage: string) => void
  onCancel: () => void
  aspectRatio?: number
  open: boolean
}

export function ImageCropper({ image, onCrop, onCancel, aspectRatio = 1, open }: ImageCropperProps) {
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!open) return

    imageRef.current = new Image()
    imageRef.current.src = image
    imageRef.current.onload = () => {
      drawImage()
    }
  }, [image, open])

  const drawImage = () => {
    if (!canvasRef.current || !imageRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate dimensions
    const imgWidth = imageRef.current.width
    const imgHeight = imageRef.current.height
    const imgAspectRatio = imgWidth / imgHeight

    let drawWidth, drawHeight

    if (imgAspectRatio > aspectRatio) {
      // Image is wider than canvas aspect ratio
      drawHeight = canvas.height
      drawWidth = drawHeight * imgAspectRatio
    } else {
      // Image is taller than canvas aspect ratio
      drawWidth = canvas.width
      drawHeight = drawWidth / imgAspectRatio
    }

    // Apply transformations
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(scale, scale)
    ctx.drawImage(imageRef.current, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight)
    ctx.restore()
  }

  useEffect(() => {
    drawImage()
  }, [scale, rotation])

  const handleCrop = () => {
    if (!canvasRef.current) return
    const croppedImage = canvasRef.current.toDataURL("image/jpeg")
    onCrop(croppedImage)
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full aspect-square overflow-hidden rounded-md border">
            <canvas ref={canvasRef} width={300} height={300} className="w-full h-full" />
          </div>
          <div className="w-full space-y-4">
            <div className="flex items-center space-x-2">
              <ZoomIn className="h-4 w-4" />
              <Slider
                value={[scale]}
                min={0.5}
                max={3}
                step={0.1}
                onValueChange={(value) => setScale(value[0])}
                className="flex-1"
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleRotate} className="w-full">
              <RotateCw className="mr-2 h-4 w-4" />
              Rotate
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleCrop}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
