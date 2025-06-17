
export function printReceipt(
    generateReceiptHTML: () => string,
    toast: (options: { title: string; description: string; variant?: "default" | "destructive" }) => void,
): void {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
        toast({
            title: "Error",
            description: "Unable to open print window. Please allow pop-ups and try again.",
            variant: "destructive",
        });
        return;
    }

    const htmlContent = generateReceiptHTML();
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for the content to load and add a small delay to ensure rendering
    printWindow.onload = () => {
        setTimeout(() => {
            try {
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            } catch (error) {
                console.error("Print failed:", error);
                toast({
                    title: "Print Error",
                    description: `Failed to print receipt: ${(error as Error).message}`,
                    variant: "destructive",
                });
                printWindow.close();
            }
        }, 500); // 500ms delay to ensure content is rendered
    };

    // Fallback in case onload doesn't trigger (e.g., if content is immediate)
    setTimeout(() => {
        if (printWindow && !printWindow.closed) {
            try {
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            } catch (error) {
                console.error("Print failed (fallback):", error);
                toast({
                    title: "Print Error",
                    description: `Failed to print receipt: ${(error as Error).message}`,
                    variant: "destructive",
                });
                printWindow.close();
            }
        }
    }, 1000); // 1000ms fallback delay
}