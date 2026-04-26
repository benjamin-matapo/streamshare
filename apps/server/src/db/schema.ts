import { pgTable, uuid, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const sessions = pgTable('sessions', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    currentSlideIndex: integer('current_slide_index').default(0)
});

export const slides = pgTable('slides', {
    id: uuid('id').primaryKey().defaultRandom(),
    sessionId: uuid('session_id').references(() => sessions.id),
    type: text('type').notNull(), // 'text' | 'image' | 'video' | 'iframe'
    content: text('content').notNull(),
    order: integer('order').notNull()
});

export const reactions = pgTable('reactions', {
    id: uuid('id').primaryKey().defaultRandom(),
    sessionId: uuid('session_id').references(() => sessions.id),
    emoji: text('emoji').notNull(),
    createdAt: timestamp('created_at').defaultNow()
});

export const questions = pgTable('questions', {
    id: uuid('id').primaryKey().defaultRandom(),
    sessionId: uuid('session_id').references(() => sessions.id),
    text: text('text').notNull(),
    upvotes: integer('upvotes').default(0),
    answered: integer('answered').default(0),
    createdAt: timestamp('created_at').defaultNow()
});