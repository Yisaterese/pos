"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Upload, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ImageCropper } from "./image-cropper"
import { CameraCapture } from "./camera-capture"

interface ImageUploadProps {
  initialImage?: string
  onImageChange: (image: string | null) => void
  className?: string
  buttonText?: string
  aspectRatio?: number
}

export function ImageUpload({
  initialImage,
  onImageChange,
  className,
  buttonText = "Upload Image",
  aspectRatio = 1,
}: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(initialImage || null)
  const [isUploading, setIsUploading] = useState(false)
  const [cropperOpen, setCropperOpen] = useState(false)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [tempImage, setTempImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    // Read the file as a data URL
    const reader = new FileReader()
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string
      setTempImage(imageDataUrl)
      setCropperOpen(true)
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleCameraCapture = () => {
    setCameraOpen(true)
  }

  const handleCameraImage = (imageDataUrl: string) => {
    setCameraOpen(false)
    setTempImage(imageDataUrl)
    setCropperOpen(true)
  }

  const handleCancelCamera = () => {
    setCameraOpen(false)
  }

  const handleRemoveImage = () => {
    setImage(null)
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleCrop = (croppedImage: string) => {
    setImage(croppedImage)
    onImageChange(croppedImage)
    setCropperOpen(false)
    setTempImage(null)
  }

  const handleCancelCrop = () => {
    setCropperOpen(false)
    setTempImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <div className="relative">
        {image ? (
          <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-primary/20">
            <Image
              src={image || ""}
              alt="Profile"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full p-1"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center border-4 border-primary/20">
            <Camera size={40} className="text-muted-foreground" />
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-full">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <Upload className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={handleCameraCapture} disabled={isUploading}>
          <Camera className="mr-2 h-4 w-4" />
          Take Photo
        </Button>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      {tempImage && (
        <ImageCropper
          image={tempImage}
          onCrop={handleCrop}
          onCancel={handleCancelCrop}
          aspectRatio={aspectRatio}
          open={cropperOpen}
        />
      )}

      <CameraCapture onCapture={handleCameraImage} onCancel={handleCancelCamera} open={cameraOpen} />
    </div>
  )
}
