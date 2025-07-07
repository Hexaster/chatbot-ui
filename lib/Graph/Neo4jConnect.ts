"use client"
import { nvlResultTransformer } from "@neo4j-nvl/base"

let neo4j = require("neo4j-driver")
const URI = "neo4j+s://b744f41e.databases.neo4j.io"
const USER = "neo4j"
const PASSWORD = "BfzbwMvqT2fAUytNpOIiBgmf8dhKCxQOZHTzVg09iLo"
let driver

export const executeQuery = async (query: string) => {
  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    return await driver.executeQuery(
      query,
      {},
      { resultTransformer: nvlResultTransformer }
    )
  } catch (err) {
    // @ts-ignore
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
    return null
  }
}
