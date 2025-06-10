"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { clearCart } from "@/lib/redux/slices/cartSlice";
import { addPurchase } from "@/lib/redux/slices/customersSlice";
import { updateStock } from "@/lib/redux/slices/productsSlice";
import { addSale } from "@/lib/redux/slices/salesSlice";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with your publishable key
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error("Missing Stripe publishable key. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your .env.local file.");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

interface CheckoutFormProps {
    clientSecret: string;
}

function CheckoutForm({ clientSecret }: CheckoutFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const stripe = useStripe();
    const elements = useElements();

    const cart = useAppSelector((state) => state.cart);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const [customerInfo, setCustomerInfo] = useState({
        firstName: cart.customer?.name.split(" ")[0] || "",
        lastName: cart.customer?.name.split(" ")[1] || "",
        email: "",
        phone: "",
        saveInfo: true,
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleEmailChange = (email: string) => {
        if (emailRegex.test(email) || email === "") {
            setCustomerInfo((prev) => ({ ...prev, email }));
        } else {
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address (e.g., example@domain.com).",
                variant: "destructive",
            });
        }
    };

    const [receiptOptions, setReceiptOptions] = useState({
        email: true,
        print: true,
        sms: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;

        if (type === "checkbox") {
            if (id === "save-info") {
                setCustomerInfo((prev) => ({ ...prev, saveInfo: checked }));
            } else if (id.includes("receipt")) {
                setReceiptOptions((prev) => ({
                    ...prev,
                    [id.replace("-receipt", "")]: checked,
                }));
            }
        } else {
            setCustomerInfo((prev) => ({
                ...prev,
                [id.replace("first-name", "firstName").replace("last-name", "lastName")]: value,
            }));
        }
    };

    const handleCompletePayment = async (clientSecret: string) => {
        setIsProcessing(true);

        try {
            if (paymentMethod === "card") {
                if (!stripe || !elements || !clientSecret) {
                    throw new Error("Stripe has not loaded or payment intent is not initialized.");
                }

                // Submit the PaymentElement to collect and validate card details
                const { error: submitError } = await elements.submit();
                if (submitError) {
                    throw new Error(submitError.message || "Failed to submit payment details.");
                }

                const { error, paymentIntent } = await stripe.confirmPayment({
                    elements,
                    clientSecret,
                    confirmParams: {
                        return_url: `${window.location.origin}/pos`, // Redirect to POS after payment
                    },
                    redirect: "if_required",
                });

                if (error) {
                    throw new Error(error.message || "Payment failed.");
                }

                if (paymentIntent.status !== "succeeded") {
                    throw new Error("Payment did not succeed.");
                }
            }

            if (cart.customer) {
                const purchaseId = `P${Math.floor(Math.random() * 10000)
                    .toString()
                    .padStart(4, "0")}`;
                const today = new Date().toISOString().split("T")[0];

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
                );

                cart.items.forEach((item) => {
                    dispatch(
                        updateStock({
                            id: item.id,
                            quantity: -item.quantity,
                        }),
                    );
                });

                dispatch(
                    addSale({
                        date: today,
                        amount: cart.total + cart.tax - cart.discount,
                        orders: 1,
                    }),
                );
            }

            setIsProcessing(false);
            setIsComplete(true);

            dispatch(clearCart()); // Clear cart after successful payment
            toast({
                title: "Payment Successful",
                description: "Your order has been processed successfully.",
                variant: "default",
            });

            setTimeout(() => {
                router.push("/pos");
            }, 2000);
        } catch (error) {
            setIsProcessing(false);
            toast({
                title: "Payment Failed",
                description: `There was an error processing your payment: ${error.message}. Please try again.`,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex-1 p-4 md:p-8 pt-6">
            <div className="flex items-center mb-6">
                <Button variant="outline" size="icon" asChild className="mr-4">
                    <Link href="/pos">
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
                        <Link href="/pos">Return to Point of Sale</Link>
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
                                                $
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
                                    <PaymentElement />
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
                                            placeholder="Raj"
                                            value={customerInfo.firstName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Last Name</Label>
                                        <Input
                                            id="last-name"
                                            placeholder="Sharon"
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
                                        placeholder="raj.sharon@example.com"
                                        value={customerInfo.email}
                                        onChange={(e) => handleEmailChange(e.target.value)}
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
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <Separator />
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal</span>
                                        <span>${cart.total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>GST ({(cart.taxRate * 100).toFixed(0)}%)</span>
                                        <span>${cart.tax.toFixed(2)}</span>
                                    </div>
                                    {cart.discount > 0 && (
                                        <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                                            <span>Discount</span>
                                            <span>-${cart.discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${(cart.total + cart.tax - cart.discount).toFixed(2)}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md shadow transition-colors"
                                    onClick={() => handleCompletePayment(clientSecret)}
                                    disabled={isProcessing || (paymentMethod === "card" && (!stripe || !elements || !clientSecret))}
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
    );
}

export default function CheckoutPage() {
    const { toast } = useToast();
    const cart = useAppSelector((state) => state.cart ?? { items: [], total: 0, tax: 0, taxRate: 0.08, discount: 0, customer: null });
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("useEffect triggered with cart:", cart, "toast:", toast);
        if (cart.items.length > 0) {
            const totalAmount = Math.round((cart.total + cart.tax - cart.discount) * 100);
            console.log("Fetching from:", "/api/create-payment-intent", "with amount:", totalAmount);
            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: totalAmount, currency: "usd" }),
            })
                .then((res) => {
                    console.log("Fetch response status:", res.status, "headers:", res.headers);
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}, text: ${res.statusText}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("Fetched data:", data);
                    if (data.source === "stripe-payment-intent" && data.clientSecret) {
                        console.log("Client secret set to:", data.clientSecret);
                        setClientSecret(data.clientSecret);
                    } else {
                        console.log("Invalid response:", data);
                        throw new Error("Invalid response from payment server");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching client secret:", error);
                    toast({
                        title: "Error",
                        description: `Failed to initialize payment: ${error.message}`,
                        variant: "destructive",
                    });
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            console.log("Cart is empty, skipping fetch.");
        }
    }, [cart, toast]);

    console.log("Rendering with clientSecret:", clientSecret);
    if (loading || (cart.items.length > 0 && !clientSecret)) {
        return <div>Loading...</div>;
    }

    if (!clientSecret) {
        return <div>Unable to initialize payment. Please try again or contact support.</div>;
    }

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm clientSecret={clientSecret} />
        </Elements>
    );
}