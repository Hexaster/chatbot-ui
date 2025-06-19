"use client"
import { useRef, useEffect } from "react"
import type {
  ExternalCallbacks,
  HitTargets,
  Layout,
  Node,
  NvlOptions,
  Relationship
} from "@neo4j-nvl/base"
import { InteractionOptions, InteractiveNvlWrapper } from "@neo4j-nvl/react"
import type { MouseEventCallbacks } from "@neo4j-nvl/react"
import { LayoutOptions } from "cytoscape"

interface InteractiveNvlWrapperProps {
  interactionOptions?: InteractionOptions
  layout?: Layout
  layoutOptions?: LayoutOptions
  mouseEventCallbacks?: MouseEventCallbacks
  nodes: Node[]
  nvlCallbacks?: ExternalCallbacks
  nvlOptions?: NvlOptions
  onInitializationError?: (error: unknown) => void
  positions?: Node[]
  rels: Relationship[]
}
export default function Neo4jGraphClient({
  nodes = [
    { id: "1", caption: "Ellen" },
    { id: "2", caption: "Andrew" }
  ],
  relationships = [{ id: "12", from: "1", to: "2", caption: "loves" }]
}) {
  const mouseEventCallbacks: MouseEventCallbacks = {
    onHover: (
      element: Node | Relationship,
      hitTargets: HitTargets,
      evt: MouseEvent
    ) => console.log("onHover", element, hitTargets, evt),
    onRelationshipRightClick: (
      rel: Relationship,
      hitTargets: HitTargets,
      evt: MouseEvent
    ) => console.log("onRelationshipRightClick", rel, hitTargets, evt),
    onNodeClick: (node: Node, hitTargets: HitTargets, evt: MouseEvent) =>
      console.log("onNodeClick", node, hitTargets, evt),
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
    <InteractiveNvlWrapper
      nodes={nodes}
      rels={relationships}
      mouseEventCallbacks={mouseEventCallbacks}
      onClick={evt => console.log("custom click event", evt)}
    />
  )
}
