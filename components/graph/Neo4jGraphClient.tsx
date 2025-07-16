import { InteractiveNvlWrapper } from "@neo4j-nvl/react"
import type { InteractiveNvlWrapperProps } from "@neo4j-nvl/react"

export default function Neo4jGraphClient({
  nodes = [
    { id: "1", caption: "Ellen" },
    { id: "2", caption: "Andrew" }
  ],
  rels = [{ id: "12", from: "1", to: "2", caption: "loves" }],
  ...props
}: InteractiveNvlWrapperProps) {
  return (
    <InteractiveNvlWrapper
      nodes={nodes}
      rels={rels}
      nvlOptions={{ renderer: "canvas" }}
      onClick={evt => console.log("custom click event", evt)}
      {...props}
    />
  )
}
