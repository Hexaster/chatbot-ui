"use client"
import { executeQuery } from "@/lib/Graph/Neo4jConnect"
import { useEffect, useRef, useState } from "react"
import Neo4jGraphClient from "@/components/graph/Neo4jGraphClient"
import { type HitTargets, Node, NVL, Relationship } from "@neo4j-nvl/base"
import type { MouseEventCallbacks } from "@neo4j-nvl/react"
import { supabase } from "@/lib/supabase/browser-client"
import { getDomainByUserId } from "@/db/domain"
import dynamic from "next/dynamic"
import { WithTooltip } from "@/components/ui/with-tooltip"
import { TooltipProvider } from "@/components/ui/tooltip"

const Graph = () => {
  const [nodes, setNodes] = useState<Node[]>([])
  const [relationships, setRelationships] = useState<Relationship[]>([])

  // State for hovered node and position
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0
  })

  // Click state (persistent until canvas click)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 })

  // Ref to nvl
  const nvlRef = useRef()

  useEffect(() => {
    ;(async () => {
      const session = (await supabase.auth.getSession()).data.session
      const studiedDomains = await getDomainByUserId(session.user.id)
      const studiedSet = new Set(studiedDomains.map(d => d.domain_id))
      console.log("studiedDomains: ", studiedSet)

      executeQuery("MATCH p=()-[]->() RETURN p;")
        .then(result => {
          console.log(result)
          const styledNodes = result.nodes.map((node: Node) => {
            const { properties, labels } = result.recordObjectMap.get(node.id)
            console.log("properties:  " + JSON.stringify(properties))
            //console.log("labels:  " + JSON.stringify(labels))
            //console.log("node id: ", node.id)
            if (studiedSet.has(properties.uuid)) {
              console.log("Get node: ", properties.uuid)
            }
            let color = "blue"
            if (labels[0] === "Content") {
              color = studiedSet.has(properties.uuid) ? "green" : "red"
            }
            return {
              ...node,
              caption: properties.name,
              color: color
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
    })()
  }, [])

  const mouseEventCallbacks: MouseEventCallbacks = {
    onHover: (
      element: Node | Relationship,
      hitTargets: HitTargets,
      evt: MouseEvent
    ) => {
      // Finding nodes
      if (element && !("from" in element)) {
        console.log("onHover", element, evt)
        setHoveredNode(element as Node)
        setHoverPos({ x: evt.clientX, y: evt.clientY })
      }
      if (!element) {
        setHoveredNode(null)
      }
    },

    onRelationshipRightClick: (
      rel: Relationship,
      hitTargets: HitTargets,
      evt: MouseEvent
    ) => console.log("onRelationshipRightClick", rel, hitTargets, evt),

    onNodeClick: (node: Node, hitTargets: HitTargets, evt: MouseEvent) => {
      console.log("onNodeClick", node, hitTargets, evt)
      setSelectedNode(hoveredNode)
      setClickPos(hoverPos)
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
    onCanvasClick: (evt: MouseEvent) => {
      console.log("onCanvasClick", evt)
      setSelectedNode(null)
    },
    onCanvasDoubleClick: (evt: MouseEvent) =>
      console.log("onCanvasDoubleClick", evt),
    onCanvasRightClick: (evt: MouseEvent) =>
      console.log("onCanvasRightClick", evt),
    onDrag: (nodes: Node[]) => console.log("onDrag", nodes),
    onPan: (evt: MouseEvent) => console.log("onPan", evt),
    onZoom: (zoomLevel: number) => console.log("onZoom", zoomLevel)
  }

  // Decide which tooltip to render: click-fixed or hover
  const activeNode = selectedNode ?? hoveredNode
  const activePos = selectedNode ? clickPos : hoverPos

  return (
    <div className="relative h-screen w-full" id="frame">
      <Neo4jGraphClient
        nodes={nodes}
        rels={relationships}
        mouseEventCallbacks={mouseEventCallbacks}
        //ref={nvlRef}
      />

      {activeNode && (
        <div
          style={{
            position: "fixed",
            top: activePos.y,
            left: activePos.x,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            pointerEvents: "none",
            fontSize: "0.8rem",
            whiteSpace: "nowrap",
            zIndex: 10
          }}
        >
          {/* Customize this however you like */}
          <strong>Node:</strong> {activeNode.id}
        </div>
      )}
    </div>
  )
}

export default Graph
