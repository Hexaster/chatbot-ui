import { useRef, useEffect } from "react"
import dynamic from "next/dynamic"

import { NVL } from "@neo4j-nvl/base"
import {
  ClickInteraction,
  DragNodeInteraction,
  HoverInteraction,
  PanInteraction,
  ZoomInteraction
} from "@neo4j-nvl/interaction-handlers"

interface Neo4jGraphProps {
  nodes: []
  relationships: []
  options: {}
  callbacks: {}
}
/**
export const Neo4jGraph = ({
    nodes,
    relationships,
    options,
    callbacks}: Neo4jGraphProps) => {
  const containerRef = useRef(null)
  useEffect(() => {
    if (!containerRef.current) return
    // Instantiate NVL once the component is mounted
    const myNvl = new NVL(
      containerRef.current,
      nodes,
      relationships,
      options,
      callbacks
    )
    new ZoomInteraction(myNvl)
    new PanInteraction(myNvl)
    new DragNodeInteraction(myNvl)
    new ClickInteraction(myNvl, { selectOnClick: true })
    new HoverInteraction(myNvl, { drawShadowOnHover: true })
    // Clean up on unmount (if NVL exposes a destroy or similar)
    return () => {
      if (myNvl.destroy) myNvl.destroy()
    }
  }, [nodes, relationships, options, callbacks])
  return (
    <div
      ref={containerRef}
    />)
}
 **/

export default function Neo4jGraph({
  nodes = [
    { id: "1", caption: "Ellen" },
    { id: "2", caption: "Andrew" }
  ],
  relationships = [{ id: "12", from: "1", to: "2", caption: "loves" }],
  options = {},
  callbacks = {},
  width = "100%",
  height = "100%"
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    // Instantiate NVL once the component is mounted
    const myNvl = new NVL(
      containerRef.current,
      nodes,
      relationships,
      options,
      callbacks
    )
    new ZoomInteraction(myNvl)
    new PanInteraction(myNvl)
    new DragNodeInteraction(myNvl)
    new ClickInteraction(myNvl, { selectOnClick: true })
    new HoverInteraction(myNvl, { drawShadowOnHover: true })
    // Clean up on unmount (if NVL exposes a destroy or similar)
    return () => {
      if (myNvl.destroy) myNvl.destroy()
    }
  }, [nodes, relationships, options, callbacks])
  return <div ref={containerRef} style={{ width, height }} />
}
