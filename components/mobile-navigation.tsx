"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CreditCard, FileText, Home, Package, Settings, ShoppingCart, Users, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type NavItem = {
  name: string
  href: string
  icon: React.ElementType
}

const primaryNavItems: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "POS", href: "/pos", icon: ShoppingCart },
  { name: "Products", href: "/products", icon: Package },
  { name: "Customers", href: "/customers", icon: Users },
]

const secondaryNavItems: NavItem[] = [
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Receipts", href: "/receipts", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function MobileNavigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border md:hidden">
        <div className="grid h-full grid-cols-5">
          {primaryNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center px-1",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center px-1 text-muted-foreground">
                <Menu className="h-5 w-5" />
                <span className="text-xs mt-1">More</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@etiraj.com</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {secondaryNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg",
                      pathname === item.href ? "bg-primary/10 text-primary" : "hover:bg-muted",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted"
                  >
                    <Avatar className="h-5 w-5">
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <span>Profile</span>
                  </Link>
                  <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-left">
                    <X className="h-5 w-5" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind the navigation bar */}
      <div className="h-16 md:hidden" />
    </>
  )
}
