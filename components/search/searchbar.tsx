import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"

interface SearchBarProps {
  setResults: (data: any[]) => void
  setIsInitialised: (flag: boolean) => void
}

export default function SearchBar({
  setResults,
  setIsInitialised
}: SearchBarProps) {
  const [query, setQuery] = useState("") // 1. our search text

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) return // ignore empty
    try {
      const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL as string
      const apiEndpoint = BACKEND + `/query/?q=${encodeURIComponent(query)}`
      console.log("Searching for " + query)
      const res = await fetch(apiEndpoint, {})
      const data = await res.json() // { results: [...] }
      console.log(data.results)
      setResults(data.results)
      setIsInitialised(false)
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <form onSubmit={handleSearch} className="flex justify-center">
      <Input
        type="text"
        className="w-80 px-3 py-2"
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.currentTarget.value)}
      />
      <Button type="submit" className="px-3 py-2">
        Search
      </Button>
    </form>
  )
}
