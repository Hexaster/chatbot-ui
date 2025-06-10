import { Tables } from "@/supabase/types"
import { ChatMessage, LLMID } from "."

export interface ChatSettings {
  model: LLMID
  prompt: string
  temperature: number
  contextLength: number
  // If true, a part of user's profile will be included as the prompt
  // It helps the AI know who you are to reply more accurately
  includeProfileContext: boolean
  // If true, some special instructions (rules will be injected)
  includeWorkspaceInstructions: boolean
  embeddingsProvider: "openai" | "local"
}

// A payload is the whole piece of data being sent or received.
export interface ChatPayload {
  chatSettings: ChatSettings
  workspaceInstructions: string
  chatMessages: ChatMessage[]
  assistant: Tables<"assistants"> | null // customised AI model settings
  messageFileItems: Tables<"file_items">[]
  chatFileItems: Tables<"file_items">[]
}

export interface ChatAPIPayload {
  chatSettings: ChatSettings
  messages: Tables<"messages">[]
}
