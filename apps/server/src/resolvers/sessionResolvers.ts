import { db } from '../db/client';
import { sessions, slides } from '../db/schema';
import { eq } from 'drizzle-orm';
import { pubsub } from '../pubsub';
import { withFilter } from 'graphql-subscriptions';

export const sessionResolvers = {
  Query: {
    session: async (_: any, { id }: { id: string }) => {
      const result = await db.select().from(sessions).where(eq(sessions.id, id));
      return result[0] || null;
    },
    sessions: async () => {
      return await db.select().from(sessions);
    },
  },
  Mutation: {
    createSession: async (_: any, { name }: { name: string }) => {
      const result = await db.insert(sessions).values({ name }).returning();
      return result[0];
    },
    nextSlide: async (_: any, { sessionId }: { sessionId: string }) => {
      const sessionList = await db.select().from(sessions).where(eq(sessions.id, sessionId));
      if (!sessionList[0]) throw new Error("Session not found");
      
      const newIndex = (sessionList[0].currentSlideIndex || 0) + 1;
      const updated = await db.update(sessions)
        .set({ currentSlideIndex: newIndex })
        .where(eq(sessions.id, sessionId))
        .returning();
      
      pubsub.publish('SESSION_UPDATED', { sessionUpdated: updated[0] });
      return updated[0];
    },
    prevSlide: async (_: any, { sessionId }: { sessionId: string }) => {
      const sessionList = await db.select().from(sessions).where(eq(sessions.id, sessionId));
      if (!sessionList[0]) throw new Error("Session not found");
      
      const newIndex = Math.max((sessionList[0].currentSlideIndex || 0) - 1, 0);
      const updated = await db.update(sessions)
        .set({ currentSlideIndex: newIndex })
        .where(eq(sessions.id, sessionId))
        .returning();
      
      pubsub.publish('SESSION_UPDATED', { sessionUpdated: updated[0] });
      return updated[0];
    },
    goToSlide: async (_: any, { sessionId, index }: { sessionId: string, index: number }) => {
      const updated = await db.update(sessions)
        .set({ currentSlideIndex: index })
        .where(eq(sessions.id, sessionId))
        .returning();
      
      if (!updated[0]) throw new Error("Session not found");
      
      pubsub.publish('SESSION_UPDATED', { sessionUpdated: updated[0] });
      return updated[0];
    },
  },
  Subscription: {
    sessionUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterableIterator(['SESSION_UPDATED']),
        (payload, variables) => {
          return payload.sessionUpdated.id === variables.sessionId;
        }
      ),
    },
  },
  Session: {
    slides: async (parent: any) => {
      return await db.select().from(slides).where(eq(slides.sessionId, parent.id)).orderBy(slides.order);
    },
  },
};
