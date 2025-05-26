"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ImageUpload } from "@/components/image-upload"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { updateUserProfile } from "@/lib/redux/slices/settingsSlice"
import { useToast } from "@/components/ui/use-toast"
import { PageTransition } from "@/components/page-transition"
import { SwipeNavigation } from "@/components/swipe-navigation"

export default function ProfilePage() {
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const userProfile = useAppSelector((state) => state.settings.userProfile)

  const [formData, setFormData] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    email: userProfile.email,
    phone: userProfile.phone,
    bio: userProfile.bio,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleImageChange = (image: string | null) => {
    dispatch(updateUserProfile({ avatar: image }))
  }

  const handleSaveChanges = () => {
    dispatch(updateUserProfile(formData))
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  return (
    <PageTransition>
      <SwipeNavigation>
        <div className="flex flex-col w-full max-w-full p-4 md:p-8 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-6 gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_3fr] w-full">
            <Card className="w-full md:row-span-2">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your profile picture and details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ImageUpload
                  initialImage={userProfile.avatar || ""}
                  onImageChange={handleImageChange}
                  buttonText="Change Avatar"
                />
                <div className="space-y-1 text-center">
                  <h3 className="font-medium text-lg">
                    {userProfile.firstName} {userProfile.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                  <Badge className="mt-2">Administrator</Badge>
                </div>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="admin" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Administrator" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joined">Joined</Label>
                    <Input id="joined" defaultValue="January 15, 2023" readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="w-full">
              <Tabs defaultValue="personal" className="w-full">
                <div className="w-full overflow-auto mb-6">
                  <TabsList className="w-full flex flex-wrap">
                    <TabsTrigger value="personal" className="flex-1">
                      Personal Information
                    </TabsTrigger>
                    <TabsTrigger value="account" className="flex-1">
                      Account Settings
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="flex-1">
                      Activity Log
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="personal" className="space-y-6 w-full">
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" value={formData.firstName} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" value={formData.lastName} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" value={formData.phone} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Tell us about yourself"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Address Information</CardTitle>
                      <CardDescription>Update your address details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address-line-1">Address Line 1</Label>
                          <Input id="address-line-1" placeholder="123 Main St" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address-line-2">Address Line 2</Label>
                          <Input id="address-line-2" placeholder="Apt 4B" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="New York" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State/Province</Label>
                          <Input id="state" placeholder="NY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP/Postal Code</Label>
                          <Input id="zip" placeholder="10001" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input id="country" placeholder="United States" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="account" className="space-y-6 w-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>Update your account preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <select
                          id="language"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <select
                          id="timezone"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="utc-8">UTC-8 (Pacific Time)</option>
                          <option value="utc-7">UTC-7 (Mountain Time)</option>
                          <option value="utc-6">UTC-6 (Central Time)</option>
                          <option value="utc-5">UTC-5 (Eastern Time)</option>
                          <option value="utc-0">UTC+0 (Greenwich Mean Time)</option>
                          <option value="utc+1">UTC+1 (Central European Time)</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="email-notifications" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="email-notifications">Receive email notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="marketing-emails" className="h-4 w-4" />
                        <Label htmlFor="marketing-emails">Receive marketing emails</Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>Update your password</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity" className="space-y-6 w-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Activity Log</CardTitle>
                      <CardDescription>Recent account activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            action: "Logged in",
                            date: "May 5, 2023 - 09:32 AM",
                            ip: "192.168.1.1",
                            device: "Chrome on Windows",
                          },
                          {
                            action: "Changed password",
                            date: "May 3, 2023 - 02:15 PM",
                            ip: "192.168.1.1",
                            device: "Chrome on Windows",
                          },
                          {
                            action: "Updated profile information",
                            date: "May 1, 2023 - 11:45 AM",
                            ip: "192.168.1.1",
                            device: "Chrome on Windows",
                          },
                          {
                            action: "Logged in",
                            date: "April 30, 2023 - 08:20 AM",
                            ip: "192.168.1.1",
                            device: "Chrome on Windows",
                          },
                          {
                            action: "Logged out",
                            date: "April 29, 2023 - 05:30 PM",
                            ip: "192.168.1.1",
                            device: "Chrome on Windows",
                          },
                        ].map((activity, index) => (
                          <div key={index} className="flex justify-between border-b pb-3 last:border-0 last:pb-0">
                            <div>
                              <p className="font-medium">{activity.action}</p>
                              <p className="text-sm text-muted-foreground">{activity.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">{activity.ip}</p>
                              <p className="text-sm text-muted-foreground">{activity.device}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SwipeNavigation>
    </PageTransition>
  )
}
