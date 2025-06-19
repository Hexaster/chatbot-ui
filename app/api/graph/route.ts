import { NextRequest, NextResponse } from "next/server"
import { nvlResultTransformer } from "@neo4j-nvl/base"

let neo4j = require("neo4j-driver")
const URI = "neo4j+s://b744f41e.databases.neo4j.io"
const USER = "neo4j"
const PASSWORD = "BfzbwMvqT2fAUytNpOIiBgmf8dhKCxQOZHTzVg09iLo"
let driver

export async function POST(req: NextRequest) {
  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    const { query } = await req.json()

    const data = await driver.executeQuery(
      query,
      {},
      { resultTransformer: nvlResultTransformer }
    )

    const nodes = data.nodes.map((node: { id: any }) => {
      const { properties, labels } = data.recordObjectMap.get(node.id)
      return {
        ...node,
        caption: properties.name ?? properties.title,
        color: labels[0] === "Content" ? "red" : "blue"
      }
    })

    const relationships = data.relationships.map((relation: { id: any }) => {
      const or = data.recordObjectMap.get(relation.id)
      return {
        ...relation,
        caption: or.type
      }
    })
    driver.close()
    return NextResponse.json({ nodes, relationships })
  } catch (err) {
    // @ts-ignore
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
    return { nodes: [], relationships: [] }
  }
}
