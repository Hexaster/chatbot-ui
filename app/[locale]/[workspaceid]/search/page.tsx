"use client"
import SearchBar from "@/components/search/searchbar"
import SearchList from "@/components/search/searchList"
import { useState } from "react"

const Search = () => {
  const [results, setResults] = useState<any[]>([])
  const [isInitialised, setIsInitialised] = useState(true)
  return (
    <div className="flex grow flex-col items-center justify-center">
      <h2 className="text-center text-2xl font-bold">📚 Search</h2>
      <SearchBar setResults={setResults} setIsInitialised={setIsInitialised} />
      {!isInitialised && <SearchList results={results} />}
    </div>
  )
}

export default Search
