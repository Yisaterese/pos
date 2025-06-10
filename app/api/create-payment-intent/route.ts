import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY); // Add this line
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-05-28.basil",
});

export async function POST(req: NextRequest) {
    try {
        const { amount, currency } = await req.json();
        if (!amount || !currency) {
            return NextResponse.json({ error: "Missing amount or currency" }, { status: 400 });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount),
            currency,
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({
            source: "stripe-payment-intent",
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Stripe error:", error);
        return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 });
    }
}