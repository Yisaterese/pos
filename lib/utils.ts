import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // Changed from INR to USD
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date)
  }
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Format for Indian phone numbers
  if (phoneNumber.startsWith("+91")) {
    const cleaned = phoneNumber.substring(3).replace(/\D/g, "")
    return `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}`
  }
  return phoneNumber
}

export function generateOrderId(): string {
  const prefix = "ETR"
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
  return `${prefix}-${timestamp}-${random}`
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}