"use client"

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({onSearch, placeholder = "Search characters...",}: SearchBarProps) {
  const [inputValue, setInputValue] = useState("")
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  function handleChange(value: string) {
    setInputValue(value)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      onSearch(value)  // Fires only after 300ms of silence
    }, 300)
  }

  function handleClear() {
    setInputValue("")
    onSearch("")

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sw-text-muted"/>

      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        className="pl-9 pr-9 bg-sw-surface border-sw-border text-sw-text
                   placeholder:text-sw-text-muted  focus-visible:ring-amber-500/30
                   focus-visible:border-amber-500/50"
      />

      {inputValue && (
        <button
          onClick={handleClear}

        >
          <X className="absolute right-3 top-1/2 -translate-y-1/2 text-sw-text-muted hover:text-sw-text transition-colors"/>
        </button>
      )}
    </div>
  )
}
