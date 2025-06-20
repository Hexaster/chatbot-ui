"use client"
import { executeQuery } from "@/lib/Graph/Neo4jConnect"
import { useEffect, useState } from "react"
import Neo4jGraphClient from "@/components/graph/Neo4jGraphClient"
import { type HitTargets, Node, Relationship } from "@neo4j-nvl/base"
import type { MouseEventCallbacks } from "@neo4j-nvl/react"

const Graph = () => {
  const [nodes, setNodes] = useState<Node[]>([])
  const [relationships, setRelationships] = useState<Relationship[]>([])

  useEffect(() => {
    executeQuery("MATCH p=()-[]->() RETURN p;")
      .then(result => {
        console.log(result)
        const styledNodes = result.nodes.map((node: Node) => {
          const { properties, labels } = result.recordObjectMap.get(node.id)
          return {
            ...node,
            caption: properties.name ?? properties.title,
            color: labels[0] === "Content" ? "red" : "blue"
          }
        })
        setNodes(styledNodes)

        const styledRels = result?.relationships.map((rel: Relationship) => {
          const or = result?.recordObjectMap.get(rel.id)
          return {
            ...rel,
            caption: or.type
          }
        })
        setRelationships(styledRels)
      })
      .catch(console.error)
  }, [])

  const mouseEventCallbacks: MouseEventCallbacks = {
    onHover: (
      element: Node | Relationship,
      hitTargets: HitTargets,
      evt: MouseEvent
    ) => {},

    onRelationshipRightClick: (
      rel: Relationship,
      hitTargets: HitTargets,
      evt: MouseEvent
    ) => console.log("onRelationshipRightClick", rel, hitTargets, evt),
    onNodeClick: (node: Node, hitTargets: HitTargets, evt: MouseEvent) => {
      console.log("onNodeClick", node, hitTargets, evt)
      const newNodes = nodes.map((oldNode: Node) =>
        oldNode.id === node.id ? { ...oldNode, color: "green" } : oldNode
      )
      setNodes(newNodes)
    },
    onNodeRightClick: (node: Node, hitTargets: HitTargets, evt: MouseEvent) =>
      console.log("onNodeRightClick", node, hitTargets, evt),
    onNodeDoubleClick: (node: Node, hitTargets: HitTargets, evt: MouseEvent) =>
      console.log("onNodeDoubleClick", node, hitTargets, evt),
    onRelationshipClick: (
      rel: Relationship,
      hitTargets: HitTargets,
      evt: MouseEvent
    ) => console.log("onRelationshipClick", rel, hitTargets, evt),
    onRelationshipDoubleClick: (
      rel: Relationship,
      hitTargets: HitTargets,
      evt: MouseEvent
    ) => console.log("onRelationshipDoubleClick", rel, hitTargets, evt),
    onCanvasClick: (evt: MouseEvent) => console.log("onCanvasClick", evt),
    onCanvasDoubleClick: (evt: MouseEvent) =>
      console.log("onCanvasDoubleClick", evt),
    onCanvasRightClick: (evt: MouseEvent) =>
      console.log("onCanvasRightClick", evt),
    onDrag: (nodes: Node[]) => console.log("onDrag", nodes),
    onPan: (evt: MouseEvent) => console.log("onPan", evt),
    onZoom: (zoomLevel: number) => console.log("onZoom", zoomLevel)
  }

  return (
    <div className="relative h-screen w-full" id="frame">
      <Neo4jGraphClient
        nodes={nodes}
        rels={relationships}
        mouseEventCallbacks={mouseEventCallbacks}
      />
    </div>
  )
}

export default Graph
