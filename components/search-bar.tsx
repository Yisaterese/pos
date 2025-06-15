"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({ placeholder = "Search...", onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState("");

  // Update search immediately on change
  useEffect(() => {
    if (onSearch) {
      onSearch(query || "");
    }
  }, [query]);

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

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
                e.preventDefault();
                if (onSearch) onSearch(query);
              }
            }}
        />
        {/*{query && (*/}
        {/*    <Button*/}
        {/*        variant="ghost"*/}
        {/*        size="icon"*/}
        {/*        className="absolute right-0 h-full rounded-l-none"*/}
        {/*        onClick={handleClear}*/}
        {/*        type="button"*/}
        {/*    >*/}
        {/*      <X className="h-4 w-4"  /> */}
        {/*      <span className="sr-only">Clear</span>*/}
        {/*    </Button>*/}
        {/*)}*/}
      </div>
  );
}