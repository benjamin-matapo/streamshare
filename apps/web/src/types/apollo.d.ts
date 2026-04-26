declare module '@apollo/client' {
  // Minimal shims to allow TypeScript compilation in environments
  // where the real type definitions are not being picked up correctly.
  export const ApolloProvider: any;
  export class ApolloClient<T = any> {
    constructor(...args: any[]);
  }
  export const InMemoryCache: any;
  export function HttpLink(args?: any): any;
  export function split(test: any, left: any, right: any): any;
  export function useQuery(...args: any[]): any;
  export function useMutation(...args: any[]): any;
  export function useSubscription(...args: any[]): any;
  export const GraphQLWsLink: any;
  export const gql: any;
  export const createHttpLink: any;
  export const ApolloLink: any;
}
