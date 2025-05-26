"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { FadeIn, SlideIn } from "@/components/animations"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveChanges = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been successfully updated",
      })
    }, 1000)
  }

  return (
    <FadeIn className="flex flex-col w-full max-w-full p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-6 gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <Button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <div className="w-full overflow-auto mb-6">
          <TabsList className="w-full flex flex-wrap">
            <TabsTrigger value="general" className="flex-1">
              General
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex-1">
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex-1">
              Security
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex-1">
              Integrations
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general" className="space-y-6 w-full">
          <SlideIn direction="up">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Update your business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input id="business-name" defaultValue="Etiraj Store" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Tax ID / Business Number</Label>
                    <Input id="tax-id" defaultValue="123456789" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="contact@etiraj.com" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue="123 Main St, City, State, ZIP" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideIn>

          <SlideIn direction="up" delay={0.1}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Regional Settings</CardTitle>
                <CardDescription>Configure regional preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD - US Dollar</SelectItem>
                        <SelectItem value="eur">EUR - Euro</SelectItem>
                        <SelectItem value="gbp">GBP - British Pound</SelectItem>
                        <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="utc-5">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-8">UTC-8 (Pacific Time)</SelectItem>
                        <SelectItem value="utc-7">UTC-7 (Mountain Time)</SelectItem>
                        <SelectItem value="utc-6">UTC-6 (Central Time)</SelectItem>
                        <SelectItem value="utc-5">UTC-5 (Eastern Time)</SelectItem>
                        <SelectItem value="utc-0">UTC+0 (Greenwich Mean Time)</SelectItem>
                        <SelectItem value="utc+1">UTC+1 (Central European Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="mm-dd-yyyy">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                    <Input id="tax-rate" type="number" defaultValue="7.5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideIn>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6 w-full">
          <SlideIn direction="up">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Customize the appearance of your POS system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Color Theme</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="light" name="theme" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="dark" name="theme" className="h-4 w-4" />
                      <Label htmlFor="dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="system" name="theme" className="h-4 w-4" />
                      <Label htmlFor="system">System</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Accent Color</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="green" name="accent" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="green">Green</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="blue" name="accent" className="h-4 w-4" />
                      <Label htmlFor="blue">Blue</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="purple" name="accent" className="h-4 w-4" />
                      <Label htmlFor="purple">Purple</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="font-size">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="compact-mode" />
                  <Label htmlFor="compact-mode">Compact Mode</Label>
                </div>
              </CardContent>
            </Card>
          </SlideIn>

          <SlideIn direction="up" delay={0.1}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Receipt Customization</CardTitle>
                <CardDescription>Customize the appearance of receipts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo</Label>
                  <Input id="logo" type="file" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="header">Receipt Header</Label>
                  <Textarea id="header" defaultValue="Thank you for shopping with us!" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footer">Receipt Footer</Label>
                  <Textarea id="footer" defaultValue="Please come again!" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="show-tax" defaultChecked />
                  <Label htmlFor="show-tax">Show Tax Breakdown</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="show-barcode" defaultChecked />
                  <Label htmlFor="show-barcode">Show Barcode/QR Code</Label>
                </div>
              </CardContent>
            </Card>
          </SlideIn>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 w-full">
          <SlideIn direction="up">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Low Stock Alerts</p>
                      <p className="text-sm text-muted-foreground">Receive alerts when products are running low</p>
                    </div>
                    <Switch id="low-stock-email" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Daily Sales Summary</p>
                      <p className="text-sm text-muted-foreground">Receive daily summary of sales</p>
                    </div>
                    <Switch id="daily-sales-email" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Order Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications for new orders</p>
                    </div>
                    <Switch id="new-order-email" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SMS Notifications</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Critical Alerts</p>
                      <p className="text-sm text-muted-foreground">Receive SMS for critical system alerts</p>
                    </div>
                    <Switch id="critical-sms" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Out of Stock Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive SMS when items are out of stock</p>
                    </div>
                    <Switch id="out-of-stock-sms" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input id="notification-email" type="email" defaultValue="alerts@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification-phone">Notification Phone Number</Label>
                  <Input id="notification-phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </CardContent>
            </Card>
          </SlideIn>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 w-full">
          <SlideIn direction="up">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security options for your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="enable-2fa" />
                  </div>
                  <Button variant="outline">Set Up Two-Factor Authentication</Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Session Management</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto Logout</p>
                      <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                    </div>
                    <Switch id="auto-logout" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideIn>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6 w-full">
          <SlideIn direction="up">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Payment Integrations</CardTitle>
                <CardDescription>Connect payment processors to your POS system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">S</span>
                    </div>
                    <div>
                      <p className="font-medium">Stripe</p>
                      <p className="text-sm text-muted-foreground">Process credit card payments</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">P</span>
                    </div>
                    <div>
                      <p className="font-medium">PayPal</p>
                      <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                      <span className="text-green-600 dark:text-green-300 font-bold">S</span>
                    </div>
                    <div>
                      <p className="font-medium">Square</p>
                      <p className="text-sm text-muted-foreground">Process in-person and online payments</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </CardContent>
            </Card>
          </SlideIn>

          <SlideIn direction="up" delay={0.1}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Other Integrations</CardTitle>
                <CardDescription>Connect other services to your POS system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                      <span className="text-purple-600 dark:text-purple-300 font-bold">Q</span>
                    </div>
                    <div>
                      <p className="font-medium">QuickBooks</p>
                      <p className="text-sm text-muted-foreground">Sync sales and inventory with accounting</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                      <span className="text-orange-600 dark:text-orange-300 font-bold">M</span>
                    </div>
                    <div>
                      <p className="font-medium">Mailchimp</p>
                      <p className="text-sm text-muted-foreground">Email marketing integration</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                      <span className="text-red-600 dark:text-red-300 font-bold">T</span>
                    </div>
                    <div>
                      <p className="font-medium">Twilio</p>
                      <p className="text-sm text-muted-foreground">SMS notifications and alerts</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </CardContent>
            </Card>
          </SlideIn>
        </TabsContent>
      </Tabs>
    </FadeIn>
  )
}
