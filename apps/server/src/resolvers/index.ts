import { sessionResolvers } from './sessionResolvers';
import { slideResolvers } from './slideResolvers';
import { reactionResolvers } from './reactionResolvers';
import { questionResolvers } from './questionResolvers';

export const resolvers = {
  Query: {
    ...sessionResolvers.Query,
    ...questionResolvers.Query,
  },
  Mutation: {
    ...sessionResolvers.Mutation,
    ...slideResolvers.Mutation,
    ...reactionResolvers.Mutation,
    ...questionResolvers.Mutation,
  },
  Subscription: {
    ...sessionResolvers.Subscription,
    ...reactionResolvers.Subscription,
    ...questionResolvers.Subscription,
  },
  Session: sessionResolvers.Session,
  Question: questionResolvers.Question,
};
