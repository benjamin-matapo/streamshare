import { db } from '../db/client';
import { questions } from '../db/schema';
import { eq } from 'drizzle-orm';
import { pubsub } from '../pubsub';
import { withFilter } from 'graphql-subscriptions';

export const questionResolvers = {
  Query: {
    questions: async (_: any, { sessionId }: { sessionId: string }) => {
      return await db.select().from(questions).where(eq(questions.sessionId, sessionId)).orderBy(questions.createdAt);
    },
  },
  Mutation: {
    askQuestion: async (_: any, { sessionId, text }: { sessionId: string, text: string }) => {
      const result = await db.insert(questions).values({ sessionId, text }).returning();
      const question = result[0];
      const booleanAnswered = { ...question, answered: question.answered === 1 };
      pubsub.publish('NEW_QUESTION', { newQuestion: booleanAnswered });
      return booleanAnswered;
    },
    upvoteQuestion: async (_: any, { questionId }: { questionId: string }) => {
      const existing = await db.select().from(questions).where(eq(questions.id, questionId));
      if (!existing[0]) throw new Error("Question not found");

      const result = await db.update(questions)
        .set({ upvotes: (existing[0].upvotes || 0) + 1 })
        .where(eq(questions.id, questionId))
        .returning();
      
      const question = result[0];
      const booleanAnswered = { ...question, answered: question.answered === 1 };
      pubsub.publish('QUESTION_UPVOTED', { questionUpvoted: booleanAnswered });
      return booleanAnswered;
    },
  },
  Subscription: {
    newQuestion: {
      subscribe: withFilter(
        () => pubsub.asyncIterableIterator(['NEW_QUESTION']),
        (payload, variables) => payload.newQuestion.sessionId === variables.sessionId
      ),
    },
    questionUpvoted: {
      subscribe: withFilter(
        () => pubsub.asyncIterableIterator(['QUESTION_UPVOTED']),
        (payload, variables) => payload.questionUpvoted.sessionId === variables.sessionId
      ),
    },
  },
  Question: {
    answered: (parent: any) => {
      if (typeof parent.answered === 'boolean') return parent.answered;
      return parent.answered === 1;
    }
  }
};
