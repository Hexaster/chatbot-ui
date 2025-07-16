import dynamic from "next/dynamic"
import { JSX } from "react"

const Neo4jGraphClient = dynamic(() => import("./Neo4jGraphClient"), {
  ssr: false
})

export default function Neo4jGraph(
  props: JSX.IntrinsicAttributes & {
    nodes: any[]
    rels: any[]
  }
) {
  return <Neo4jGraphClient {...props} />
}
