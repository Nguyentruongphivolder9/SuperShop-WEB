import { User } from './user.type'

export type FullMessageType = Message & {
  sender: User
  seen: User[]
}

export type FullConversationType = Conversation & {
  users: User[]
  messages: FullMessageType[]
}

export interface Conversation {
  id: string
  lastMessageAt: string
  name: string
  isGroup: boolean
  messagesIds: string[]
  userIds: string[]
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  body: string | null
  image: string | null
  seenIds: string
  conversationId: string
  senderIds: string
  createdAt: string
  updatedAt: string
}

export type ConversationResponse = {
  id: string
  lastMessageAt: string
  name: string
  isGroup: boolean
  messagesIds: string[]
  userIds: string[]
  createdAt: string
  updatedAt: string
}

export type ConversationRequest = {
  name?: string
  isGroup?: boolean
  userIds: string[]
}

export type MessageRequest = {
  body: string | null
  image: string | null

  conversationId: string
  senderId: string
}

export type MessageResponse = {
  id: string
  body: string | null
  image: string | null
  seenIds: string
  conversationId: string
  senderId: string[]
}
