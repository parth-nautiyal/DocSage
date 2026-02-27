import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  text,
  pgEnum
} from 'drizzle-orm/pg-core'

export const userRoleEnum = pgEnum('user_role', ['free_user', 'pro_user', 'admin'])
export const userPlanEnum = pgEnum('user_plan', ['free', 'pro'])
export const documentStatusEnum = pgEnum('document_status', [
  'PENDING', 'PROCESSING', 'READY', 'FAILED'
])

export const users = pgTable('users', {
  id:           uuid('id').primaryKey().defaultRandom(),
  email:        varchar('email', { length: 255 }).notNull().unique(),
  name:         varchar('name', { length: 255 }),
  passwordHash: varchar('password_hash', { length: 255 }),
  role:         userRoleEnum('role').default('free_user').notNull(),
  plan:         userPlanEnum('plan').default('free').notNull(),
  createdAt:    timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:    timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const documents = pgTable('documents', {
  id:          uuid('id').primaryKey().defaultRandom(),
  userId:      uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title:       varchar('title', { length: 500 }).notNull(),
  filename:    varchar('filename', { length: 500 }).notNull(),
  storageKey:  varchar('storage_key', { length: 1000 }).notNull(),
  fileSize:    integer('file_size'),
  pageCount:   integer('page_count'),
  status:      documentStatusEnum('status').default('PENDING').notNull(),
  errorMsg:    text('error_msg'),
  createdAt:   timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt:   timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Document = typeof documents.$inferSelect
export type NewDocument = typeof documents.$inferInsert
