"use client"

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import Image from "next/image"
import Neo4jGraph from "@/components/graph/Neo4jGraph"

const graph = () => {
  const nodes = [
    { id: "1", label: "Node 1", caption: "Andrew" },
    { id: "2", label: "Node 2", caption: "Ellen" }
  ]
  const relationships = [{ id: "12", from: "1", to: "2", caption: "loves" }]
  const options = { initialZoom: 1.0 }
  return (
    <div className="relative h-screen w-full" id="frame">
      <h1>Neo4j NVL Demo in Next.js</h1>
      <Neo4jGraph
        nodes={nodes}
        relationships={relationships}
        options={options}
      />
    </div>
  )
}

export default graph
