import { NextRequest, NextResponse } from "next/server";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import {generateReceiptHTML} from "@/components/receipt/generateReceipt";

export async function POST(request: NextRequest) {
    const { customerInfo, cart, paymentMethod } = await request.json();
    console.log("Received request:", { customerInfo, cart, paymentMethod });

    const apiKey = process.env.MAILSEND_API_KEY;
    if (!apiKey) {
        console.error("MAILSEND_API_KEY is missing in .env.local");
        return NextResponse.json(
            { error: "MailerSend API key is missing. Please check your .env file." },
            { status: 500 }
        );
    }
    console.log("API Key loaded:", apiKey);

    const mailerSend = new MailerSend({
        apiKey,
    });

    const sentFrom = new Sender("no-reply@test-r6ke4n1wvoygon12.mlsender.net", "Your Store Name");
    console.log("Sender:", sentFrom);
    const recipients = [new Recipient(customerInfo.email, `${customerInfo.firstName} ${customerInfo.lastName}`)];
    console.log("Recipients:", recipients);

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject(`Your Purchase Receipt - ${new Date().toLocaleDateString()}`) // e.g., 6/16/2025
        .setHtml(generateReceiptHTML(cart, customerInfo, paymentMethod))
        .setText(`Thank you, ${customerInfo.firstName}! Your receipt for $${(cart.total + cart.tax - cart.discount).toFixed(2)} is below.`);
    console.log("Email Params:", emailParams);

    try {
        console.log("Sending email...");
        await mailerSend.email.send(emailParams);
        console.log("Email sent successfully");
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Email sending failed at send receipt component:", error);
        return NextResponse.json(
            { error: `Failed to send email receipt send receipt component: ${(error as Error).message}` },
            { status: 500 }
        );
    }
}