"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export function SearchBar({ placeholder = "Search...", onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const { toast } = useToast()

  // Debounce search
  useEffect(() => {
    if (!query) return

    const timer = setTimeout(() => {
      handleSearch()
    }, 200)

    return () => clearTimeout(timer)
  }, [query])

  const handleSearch = () => {
    if (!query.trim()) return

    setIsSearching(true)

    // Simulate search API call
  //   setTimeout(() => {
  //     if (onSearch) {
  //       onSearch(query)
  //     } else {
  //       toast({
  //         title: "Search results",
  //         description: `Found results for "${query}"`,
  //       })
  //     }
  //     setIsSearching(false)
  //   }, 600)
  // }
}
  const handleClear = () => {
    setQuery("")
    if (onSearch) {
      onSearch("")
    }
  }

  return (
    <div className={`relative flex w-full max-w-sm items-center ${className}`}>
      <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="w-full bg-background pl-8 pr-10 focus-visible:ring-1"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            handleSearch()
          }
        }}
      />
      {query && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 h-full rounded-l-none"
          onClick={handleClear}
          type="button"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear</span>
        </Button>
      )}
      {isSearching && (
        <div className="absolute right-10 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}
