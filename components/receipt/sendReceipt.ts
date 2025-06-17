import {Cart, CustomerInfo} from "@/types/types";




export async function sendEmailReceipt(
    customerInfo: CustomerInfo,
    cart: Cart,
    paymentMethod: string,
    toast: (options: { title: string; description: string; variant?: "default" | "destructive" }) => void,
): Promise<boolean> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!customerInfo.email || !emailRegex.test(customerInfo.email)) {
        toast({
            title: "Invalid Email",
            description: "A valid email address is required to send a receipt.",
            variant: "destructive",
        });
        return false;
    }

    try {
        const response = await fetch("/api/send-receipt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customerInfo, cart, paymentMethod }),
        });

        if (!response.ok) {
            throw new Error(`Failed to send email receipt: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.success) {
            toast({
                title: "Email Sent",
                description: "Receipt has been successfully sent to your email.",
                variant: "default",
            });
            return true;
        } else {
            throw new Error(data.error || "Unknown error");
        }
    } catch (error) {
        toast({
            title: "Error Sending Email",
            description: `Failed to send email receipt: ${(error as Error).message}`,
            variant: "destructive",
        });
        return false;
    }
}