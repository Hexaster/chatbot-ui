import React from "react"

export interface SearchItemProps {
  content: string
}

const SearchItem: React.FC<SearchItemProps> = ({ content }) => {
  return (
    <li className="rounded border p-2">
      <p>{content}</p>
    </li>
  )
}

export default SearchItem
