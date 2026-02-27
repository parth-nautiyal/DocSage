// ─── Document Types ───────────────────────────────────────────
export type DocumentStatus = 'PENDING' | 'PROCESSING' | 'READY' | 'FAILED'

export interface Document {
  id: string
  userId: string
  title: string
  filename: string
  storageKey: string
  fileSize: number
  pageCount: number | null
  status: DocumentStatus
  errorMsg: string | null
  createdAt: string
  updatedAt: string
}

// ─── User Types ───────────────────────────────────────────────
export type UserRole = 'free_user' | 'pro_user' | 'admin'
export type UserPlan = 'free' | 'pro'

export interface User {
  id: string
  email: string
  name: string | null
  role: UserRole
  plan: UserPlan
  createdAt: string
}

// ─── Conversation Types ───────────────────────────────────────
export interface Conversation {
  id: string
  userId: string
  documentId: string
  title: string | null
  createdAt: string
}

export interface Message {
  id: string
  conversationId: string
  role: 'user' | 'assistant'
  content: string
  sourceChunks: SourceChunk[] | null
  tokensUsed: number | null
  createdAt: string
}

export interface SourceChunk {
  chunkIndex: number
  pageNumber: number | null
  similarity: number
  contentPreview: string
}

// ─── API Response Types ───────────────────────────────────────
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  error: string
  code?: string
  details?: Record<string, string[]>
}

// ─── Job Types ────────────────────────────────────────────────
export interface ProcessDocumentJobData {
  documentId: string
  userId: string
  storageKey: string
}
