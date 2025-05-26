"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WifiOff, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <WifiOff className="h-12 w-12 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">You're Offline</CardTitle>
          <CardDescription>You're currently offline. Some features may be limited until you reconnect.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">Don't worry, you can still:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>View cached products and customers</li>
            <li>Create new sales transactions</li>
            <li>Add items to cart and complete sales</li>
            <li>View recent sales history</li>
          </ul>
          <p className="text-center mt-4 text-sm text-muted-foreground">
            All transactions will be synchronized when you're back online.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Go to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
