// app/layout.tsx
import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { MobileNavigation } from "@/components/mobile-navigation";
import { SwipeNavigation } from "@/components/swipe-navigation";
import { Toaster } from "@/components/ui/toaster";
import { ReduxProvider } from "@/lib/redux/provider";
import { OfflineProvider } from "@/components/offline-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Etiraj POS" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
      <ReduxProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <OfflineProvider>
            <SidebarProvider defaultOpen={true}>
              <SwipeNavigation>
                <div className="flex min-h-screen w-full">
                  <DashboardSidebar />
                  <main className="flex-1 w-full max-w-full overflow-x-hidden pb-16 md:pb-0">
                    {children}
                  </main>
                  <MobileNavigation />
                </div>
              </SwipeNavigation>
              <Toaster />
            </SidebarProvider>
          </OfflineProvider>
        </ThemeProvider>
      </ReduxProvider>
      </body>
      </html>
  );
}