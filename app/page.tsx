"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Battery, CreditCard, DollarSign, Package, ShoppingCart } from "lucide-react"
import { FadeIn, SlideIn, StaggeredItem, StaggeredList } from "@/components/animations"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { MobileHeader } from "@/components/mobile-header"
import { PageTransition } from "@/components/page-transition"

export default function Home() {
  const router = useRouter()
  const { toast } = useToast()

  // Define keyboard shortcuts
  const shortcuts = [
    {
      key: "p",
      ctrl: true,
      action: () => router.push("/pos"),
      description: "Navigate to Point of Sale",
    },
    {
      key: "i",
      ctrl: true,
      action: () => router.push("/products"),
      description: "Navigate to Inventory",
    },
    {
      key: "c",
      ctrl: true,
      action: () => router.push("/customers"),
      description: "Navigate to Customers",
    },
    {
      key: "a",
      ctrl: true,
      action: () => router.push("/analytics"),
      description: "Navigate to Analytics",
    },
    {
      key: "s",
      ctrl: true,
      action: () => router.push("/settings"),
      description: "Navigate to Settings",
    },
    {
      key: "h",
      ctrl: true,
      action: () => {
        toast({
          title: "Keyboard Shortcuts",
          description: "Ctrl+P: POS, Ctrl+I: Inventory, Ctrl+C: Customers, Ctrl+A: Analytics, Ctrl+S: Settings",
          duration: 5000,
        })
      },
      description: "Show Help",
    },
  ]

  return (
    <PageTransition>
      <MobileHeader title="Dashboard" />
      <KeyboardShortcuts shortcuts={shortcuts} />
      <FadeIn className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Welcome back, Admin</span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <StaggeredList className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StaggeredItem>
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
              </StaggeredItem>

              <StaggeredItem>
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">+19% from last month</p>
                  </CardContent>
                </Card>
              </StaggeredItem>

              <StaggeredItem>
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Products</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,432</div>
                    <p className="text-xs text-muted-foreground">+7 added today</p>
                  </CardContent>
                </Card>
              </StaggeredItem>

              <StaggeredItem>
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inventory Status</CardTitle>
                    <Battery className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Good</div>
                    <p className="text-xs text-muted-foreground">12 items low in stock</p>
                  </CardContent>
                </Card>
              </StaggeredItem>
            </StaggeredList>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <SlideIn direction="up" delay={0.2} className="col-span-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                    <CardDescription>Monthly sales performance for the current year</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <BarChart className="h-16 w-16 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Sales chart will appear here</span>
                  </CardContent>
                </Card>
              </SlideIn>

              <SlideIn direction="up" delay={0.3} className="col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Latest transactions and inventory changes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StaggeredList className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <StaggeredItem key={i} className="flex items-center gap-4">
                          <div
                            className={`rounded-full p-2 ${i % 2 === 0 ? "bg-green-100 dark:bg-green-900" : "bg-blue-100 dark:bg-blue-900"}`}
                          >
                            {i % 2 === 0 ? (
                              <ShoppingCart className={`h-4 w-4 ${i % 2 === 0 ? "text-green-500" : "text-blue-500"}`} />
                            ) : (
                              <Package className={`h-4 w-4 ${i % 2 === 0 ? "text-green-500" : "text-blue-500"}`} />
                            )}
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {i % 2 === 0 ? "New sale completed" : "Inventory updated"}
                            </p>
                            <p className="text-xs text-muted-foreground">{`${i * 10} minutes ago`}</p>
                          </div>
                        </StaggeredItem>
                      ))}
                    </StaggeredList>
                  </CardContent>
                </Card>
              </SlideIn>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Detailed analytics will be displayed here</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <BarChart className="h-16 w-16 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Analytics charts will appear here</span>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generate and view reports</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <span className="text-muted-foreground">Reports will be displayed here</span>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </PageTransition>
  )
}
