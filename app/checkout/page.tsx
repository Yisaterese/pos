"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { clearCart } from "@/lib/redux/slices/cartSlice"
import { addPurchase } from "@/lib/redux/slices/customersSlice"
import { updateStock } from "@/lib/redux/slices/productsSlice"
import { addSale } from "@/lib/redux/slices/salesSlice"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const dispatch = useAppDispatch()

  const cart = useAppSelector((state) => state.cart)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const [customerInfo, setCustomerInfo] = useState({
    firstName: cart.customer?.name.split(" ")[0] || "",
    lastName: cart.customer?.name.split(" ")[1] || "",
    email: "",
    phone: "",
    saveInfo: true,
  })

  const [receiptOptions, setReceiptOptions] = useState({
    email: true,
    print: true,
    sms: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target

    if (type === "checkbox") {
      if (id === "save-info") {
        setCustomerInfo((prev) => ({ ...prev, saveInfo: checked }))
      } else if (id.includes("receipt")) {
        setReceiptOptions((prev) => ({
          ...prev,
          [id.replace("-receipt", "")]: checked,
        }))
      }
    } else {
      setCustomerInfo((prev) => ({
        ...prev,
        [id.replace("first-name", "firstName").replace("last-name", "lastName")]: value,
      }))
    }
  }

  const handleCompletePayment = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // Create a new purchase record
      if (cart.customer) {
        const purchaseId = `P${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`
        const today = new Date().toISOString().split("T")[0]

        dispatch(
          addPurchase({
            id: purchaseId,
            customerId: cart.customer.id,
            date: today,
            items: cart.items.map((item) => ({
              productId: item.id,
              productName: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
            total: cart.total + cart.tax - cart.discount,
            paymentMethod:
              paymentMethod === "card" ? "Credit Card" : paymentMethod === "cash" ? "Cash" : "UPI/Mobile Payment",
          }),
        )

        // Update inventory
        cart.items.forEach((item) => {
          dispatch(
            updateStock({
              id: item.id,
              quantity: -item.quantity,
            }),
          )
        })

        // Update sales data
        dispatch(
          addSale({
            date: today,
            amount: cart.total + cart.tax - cart.discount,
            orders: 1,
          }),
        )
      }

      setIsProcessing(false)
      setIsComplete(true)

      toast({
        title: "Payment Successful",
        description: "Your order has been processed successfully.",
        variant: "default",
      })

      // Clear cart after successful payment
      setTimeout(() => {
        dispatch(clearCart())
        router.push("/pos")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/images/pos">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Checkout</h2>
      </div>

      {isComplete ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 mb-4">
            <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-300" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Complete!</h2>
          <p className="text-muted-foreground mb-6">Your transaction has been processed successfully.</p>
          <p className="text-sm text-muted-foreground mb-8">
            {receiptOptions.email && "A receipt has been sent to your email. "}
            {receiptOptions.print && "Your receipt is being printed. "}
            {receiptOptions.sms && "A receipt has been sent to your phone. "}
          </p>
          <Button asChild>
            <Link href="/images/pos">Return to Point of Sale</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
          <div className="md:col-span-1 lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  defaultValue="card"
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-colors duration-200"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      <span className="text-center">Credit/Debit Card</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                    <Label
                      htmlFor="cash"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-colors duration-200"
                    >
                      <div className="mb-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        ₹
                      </div>
                      <span className="text-center">Cash</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="mobile" id="mobile" className="peer sr-only" />
                    <Label
                      htmlFor="mobile"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-colors duration-200"
                    >
                      <div className="mb-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        U
                      </div>
                      <span className="text-center">UPI/Mobile Payment</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {paymentMethod === "card" && (
              <Card className="animate-in fade-in-50 duration-300">
                <CardHeader>
                  <CardTitle>Card Information</CardTitle>
                  <CardDescription>Enter your payment card details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input id="card-name" placeholder="Rajesh Sharma" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVV</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>Enter customer details for the receipt</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      placeholder="Rajesh"
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      placeholder="Sharma"
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="rajesh.sharma@example.com"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="save-info"
                    className="h-4 w-4"
                    checked={customerInfo.saveInfo}
                    onChange={handleInputChange}
                  />
                  <Label htmlFor="save-info">Save customer information for future purchases</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your order details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST ({(cart.taxRate * 100).toFixed(0)}%)</span>
                    <span>₹{cart.tax.toFixed(2)}</span>
                  </div>
                  {cart.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span>Discount</span>
                      <span>-₹{cart.discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{(cart.total + cart.tax - cart.discount).toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md shadow transition-colors"
                  onClick={handleCompletePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Complete Payment"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Receipt Options</CardTitle>
                <CardDescription>Choose how to receive your receipt</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="email-receipt"
                      className="h-4 w-4"
                      checked={receiptOptions.email}
                      onChange={handleInputChange}
                    />
                    <Label htmlFor="email-receipt">Email receipt</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="print-receipt"
                      className="h-4 w-4"
                      checked={receiptOptions.print}
                      onChange={handleInputChange}
                    />
                    <Label htmlFor="print-receipt">Print receipt</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sms-receipt"
                      className="h-4 w-4"
                      checked={receiptOptions.sms}
                      onChange={handleInputChange}
                    />
                    <Label htmlFor="sms-receipt">SMS receipt</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
