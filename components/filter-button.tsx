"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"

interface FilterButtonProps {
  options?: { label: string; value: string }[]
  onFilter?: (filters: string[]) => void
}

export function FilterButton({
  options = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ],
  onFilter,
}: FilterButtonProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const { toast } = useToast()

  const toggleFilter = (value: string) => {
    setSelectedFilters((prev) => (prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]))
  }

  const applyFilters = () => {
    if (onFilter) {
      onFilter(selectedFilters)
    } else {
      toast({
        title: "Filters applied",
        description: `Applied filters: ${selectedFilters.length ? selectedFilters.join(", ") : "None"}`,
      })
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-4">
        <div className="space-y-2">
          <h4 className="font-medium">Filter by</h4>
          <div className="space-y-1">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={option.value}
                  checked={selectedFilters.includes(option.value)}
                  onChange={() => toggleFilter(option.value)}
                  className="h-4 w-4"
                />
                <label htmlFor={option.value} className="text-sm">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <Button size="sm" className="w-full mt-2" onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
