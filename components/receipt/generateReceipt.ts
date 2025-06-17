import {Cart, CustomerInfo} from "@/types/types";


export function generateReceiptHTML(cart: Cart, customerInfo: CustomerInfo, paymentMethod: string): string {
    const currentDate = new Date().toLocaleString("en-US", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "Africa/Lagos",
    }); // e.g., 6/17/2025, 12:20 PM WAT
    const receiptNo = `P${Math.floor(Math.random() * 10000).toFixed(0).padStart(4, "0")}`;

    return `
        <html>
        <head>
            <title>Receipt</title>
            <style>
                body { font-family: Arial, Helvetica, sans-serif; font-size: 12px; padding: 20px; }
                .receipt { max-width: 400px; margin: 0 auto; border: 1px solid #ccc; padding: 15px; }
                .header { text-align: center; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 10px; }
                .store-info { font-size: 10px; text-align: center; margin: 5px 0; }
                .transaction-info { font-size: 10px; text-align: right; margin: 10px 0; }
                .items-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
                .items-table th, .items-table td { border: 1px solid #ddd; padding: 5px; text-align: left; }
                .items-table th { background-color: #f5f5f5; }
                .total-row { font-weight: bold; text-align: right; padding-top: 10px; }
                .footer { text-align: center; margin-top: 20px; font-weight: bold; }
                .barcode { width: 100%; height: 30px; background: repeating-linear-gradient(to right, #000 0, #000 2px, transparent 2px, transparent 4px); margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="receipt">
                <div class="header">YOUR STORE NAME</div>
                <div class="store-info">
                    Address: Your address<br>
                    Tel: +234-906-7890-089
                </div>
                <div class="transaction-info">
                    Date: ${currentDate}<br>
                    Receipt No: ${receiptNo}<br>
                    Payment Method: ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
                </div>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cart.items
        .map(
            (item) => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>$${item.price.toFixed(2)}</td>
                                <td>$${ (item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                        `
        )
        .join("")}
                    </tbody>
                </table>
                <div class="total-row">Sub-total: $${cart.total.toFixed(2)}</div>
                <div class="total-row">Sales Tax: $${cart.tax.toFixed(2)}</div>
                ${cart.discount > 0 ? `<div class="total-row">Discount: -$${cart.discount.toFixed(2)}</div>` : ""}
                <div class="total-row">Total: $${(cart.total + cart.tax - cart.discount).toFixed(2)}</div>
                <div class="footer">THANK YOU</div>
                <div class="barcode"></div>
            </div>
        </body>
        </html>
    `;
}