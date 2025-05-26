import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function UpdateStockPage({ params }: { params: { id: string } }) {
  // This would normally fetch the product based on the ID
  const product = {
    id: params.id,
    name: "Wireless Headphones",
    sku: "PRD001",
    stock: 45,
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href={`/products/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Update Stock: {product.name}</h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Stock Adjustment</CardTitle>
            <CardDescription>Update the inventory levels for this product</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Current Stock Level</Label>
              <div className="text-2xl font-bold">{product.stock} units</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adjustment-type">Adjustment Type</Label>
              <RadioGroup defaultValue="add" className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add" id="add" />
                  <Label htmlFor="add">Add Stock (Receiving inventory)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="remove" id="remove" />
                  <Label htmlFor="remove">Remove Stock (Damaged, lost, etc.)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="set" id="set" />
                  <Label htmlFor="set">Set Exact Quantity (Inventory count)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" min="1" placeholder="Enter quantity" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Adjustment</Label>
              <Select>
                <SelectTrigger id="reason">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receiving">New Inventory Received</SelectItem>
                  <SelectItem value="returned">Customer Return</SelectItem>
                  <SelectItem value="damaged">Damaged/Defective</SelectItem>
                  <SelectItem value="lost">Lost/Stolen</SelectItem>
                  <SelectItem value="count">Inventory Count Adjustment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Reference Number (Optional)</Label>
              <Input id="reference" placeholder="Purchase order or invoice number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Additional details about this adjustment" rows={3} />
            </div>

            <div className="pt-4 space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between">
                  <span>Current Stock:</span>
                  <span>{product.stock} units</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>New Stock Level:</span>
                  <span>45 units</span>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link href={`/products/${params.id}`}>Cancel</Link>
                </Button>
                <Button>Update Stock</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
