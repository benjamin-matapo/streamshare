import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({ uri: (import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/graphql' });

const wsLink = new GraphQLWsLink(createClient({
  url: (import.meta.env.VITE_WS_URL || 'ws://localhost:4000') + '/graphql'
}));

const splitLink = split(
  ({ query }: { query: any }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({ link: splitLink, cache: new InMemoryCache() });
