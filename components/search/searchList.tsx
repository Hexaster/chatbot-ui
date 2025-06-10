interface SearchListProps {
  results: any[]
}

export default function SearchList({ results }: SearchListProps) {
  if (results.length === 0) {
    return <p className="mx-8 mt-4 space-y-2">No results</p>
  }

  // Utility to escape regex-special chars in the match_word
  const escapeRegExp = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

  const highlight = (text: string, match: string) => {
    if (!match) return text
    const escaped = escapeRegExp(match)
    const regex = new RegExp(`(${escaped})`, "gi")
    const parts = text.split(regex)
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 text-yellow-800">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  return (
    <div className="mx-auto max-h-[80vh] w-full max-w-3xl overflow-y-auto px-4">
      <ul className="mx-8 mt-4 space-y-2">
        {results.map((item, idx) => (
          <li
            key={idx}
            className="w-full whitespace-pre-line break-words rounded border p-2"
          >
            {highlight(item.content, item.match_word)}
          </li>
        ))}
      </ul>
    </div>
  )
}
