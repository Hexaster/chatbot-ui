"use client"
import Neo4jGraph from "@/components/graph/Neo4jGraph"
import { executeQuery } from "@/lib/Graph/Neo4jConnect"
import { useEffect, useState } from "react"

const Graph = () => {
  const [data, setData] = useState({ nodes: [], relationships: [] })

  useEffect(() => {
    executeQuery("MATCH p=()-[]->() RETURN p;")
      .then(setData)
      .catch(console.error)
  }, [])

  return (
    <div className="relative h-screen w-full" id="frame">
      <Neo4jGraph {...data} />
    </div>
  )
}

export default Graph
