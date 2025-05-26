"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Printer } from "lucide-react"
import Link from "next/link"
import { SearchBar } from "@/components/search-bar"
import { ExportButton } from "@/components/export-button"
import { useToast } from "@/components/ui/use-toast"
import { CreateTemplateDialog } from "@/components/create-template-dialog"
import { useState } from "react"

export default function ReceiptsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  const handlePrint = (id: string) => {
    toast({
      title: "Printing receipt",
      description: `Receipt ${id} is being sent to the printer.`,
    })
  }

  const handleDownload = (id: string) => {
    toast({
      title: "Downloading receipt",
      description: `Receipt ${id} is being downloaded as PDF.`,
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Receipts</h2>
        <div className="flex items-center gap-2">
          <ExportButton type="receipts" />
        </div>
      </div>

      <div className="flex items-center gap-4 w-full">
        <SearchBar placeholder="Search receipts..." />
      </div>

      <Tabs defaultValue="all" className="space-y-4 w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">
            All Receipts
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex-1">
            Sent
          </TabsTrigger>
          <TabsTrigger value="printed" className="flex-1">
            Printed
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex-1">
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Recent Receipts</CardTitle>
              <CardDescription>View and manage all receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "RCP-001",
                      date: "2023-05-01 14:30",
                      customer: "John Doe",
                      amount: 89.99,
                      status: "Sent",
                    },
                    {
                      id: "RCP-002",
                      date: "2023-05-01 15:45",
                      customer: "Jane Smith",
                      amount: 124.5,
                      status: "Printed",
                    },
                    {
                      id: "RCP-003",
                      date: "2023-05-02 09:15",
                      customer: "Robert Johnson",
                      amount: 45.0,
                      status: "Sent",
                    },
                    {
                      id: "RCP-004",
                      date: "2023-05-02 11:30",
                      customer: "Emily Davis",
                      amount: 199.99,
                      status: "Pending",
                    },
                    {
                      id: "RCP-005",
                      date: "2023-05-03 13:20",
                      customer: "Michael Wilson",
                      amount: 34.5,
                      status: "Sent",
                    },
                    {
                      id: "RCP-006",
                      date: "2023-05-03 16:45",
                      customer: "Sarah Brown",
                      amount: 59.99,
                      status: "Printed",
                    },
                  ].map((receipt) => (
                    <TableRow key={receipt.id}>
                      <TableCell className="font-medium">{receipt.id}</TableCell>
                      <TableCell>{receipt.date}</TableCell>
                      <TableCell>{receipt.customer}</TableCell>
                      <TableCell className="text-right">${receipt.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            receipt.status === "Sent" ? "default" : receipt.status === "Printed" ? "outline" : "warning"
                          }
                        >
                          {receipt.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/receipts/${receipt.id}`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handlePrint(receipt.id)}>
                            <Printer className="h-4 w-4" />
                            <span className="sr-only">Print</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDownload(receipt.id)}>
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4 w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Sent Receipts</CardTitle>
              <CardDescription>Receipts sent to customers via email or SMS</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Sent To</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "RCP-001",
                      date: "2023-05-01 14:30",
                      customer: "John Doe",
                      sentTo: "john.doe@example.com",
                      amount: 89.99,
                    },
                    {
                      id: "RCP-003",
                      date: "2023-05-02 09:15",
                      customer: "Robert Johnson",
                      sentTo: "+1 555-123-4567",
                      amount: 45.0,
                    },
                    {
                      id: "RCP-005",
                      date: "2023-05-03 13:20",
                      customer: "Michael Wilson",
                      sentTo: "michael.wilson@example.com",
                      amount: 34.5,
                    },
                  ].map((receipt) => (
                    <TableRow key={receipt.id}>
                      <TableCell className="font-medium">{receipt.id}</TableCell>
                      <TableCell>{receipt.date}</TableCell>
                      <TableCell>{receipt.customer}</TableCell>
                      <TableCell>{receipt.sentTo}</TableCell>
                      <TableCell className="text-right">${receipt.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/receipts/${receipt.id}`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDownload(receipt.id)}>
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="printed" className="space-y-4 w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Printed Receipts</CardTitle>
              <CardDescription>Receipts that have been printed</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Receipt ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Printed By</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "RCP-002",
                      date: "2023-05-01 15:45",
                      customer: "Jane Smith",
                      printedBy: "Admin User",
                      amount: 124.5,
                    },
                    {
                      id: "RCP-006",
                      date: "2023-05-03 16:45",
                      customer: "Sarah Brown",
                      printedBy: "Admin User",
                      amount: 59.99,
                    },
                  ].map((receipt) => (
                    <TableRow key={receipt.id}>
                      <TableCell className="font-medium">{receipt.id}</TableCell>
                      <TableCell>{receipt.date}</TableCell>
                      <TableCell>{receipt.customer}</TableCell>
                      <TableCell>{receipt.printedBy}</TableCell>
                      <TableCell className="text-right">${receipt.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/receipts/${receipt.id}`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handlePrint(receipt.id)}>
                            <Printer className="h-4 w-4" />
                            <span className="sr-only">Print</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4 w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Receipt Templates</CardTitle>
              <CardDescription>Manage receipt templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <Card className="w-full">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Standard Receipt</CardTitle>
                    <CardDescription>Default receipt template</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between">
                      <Badge>Default</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Detailed Receipt</CardTitle>
                    <CardDescription>Includes product details and tax breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Simple Receipt</CardTitle>
                    <CardDescription>Minimal information for quick printing</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <CreateTemplateDialog />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
