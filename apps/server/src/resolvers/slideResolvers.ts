import { db } from '../db/client';
import { slides } from '../db/schema';

export const slideResolvers = {
  Mutation: {
    addSlide: async (_: any, { sessionId, type, content, order }: { sessionId: string, type: string, content: string, order: number }) => {
      const result = await db.insert(slides).values({ sessionId, type, content, order }).returning();
      return result[0];
    },
  },
};
