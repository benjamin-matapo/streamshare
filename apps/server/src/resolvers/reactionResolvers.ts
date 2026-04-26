import { db } from '../db/client';
import { reactions } from '../db/schema';
import { pubsub } from '../pubsub';
import { withFilter } from 'graphql-subscriptions';

export const reactionResolvers = {
  Mutation: {
    sendReaction: async (_: any, { sessionId, emoji }: { sessionId: string, emoji: string }) => {
      const result = await db.insert(reactions).values({ sessionId, emoji }).returning();
      const reaction = result[0];
      pubsub.publish('NEW_REACTION', { newReaction: reaction });
      return reaction;
    },
  },
  Subscription: {
    newReaction: {
      subscribe: withFilter(
        () => pubsub.asyncIterableIterator(['NEW_REACTION']),
        (payload, variables) => payload.newReaction.sessionId === variables.sessionId
      ),
    },
  },
};
