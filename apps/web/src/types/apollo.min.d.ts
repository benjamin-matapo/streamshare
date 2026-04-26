declare module '@apollo/client' {
  export const ApolloProvider: any;
  export const gql: any;
  export function useQuery(...args: any[]): any;
  export function useMutation(...args: any[]): any;
  export function useSubscription(...args: any[]): any;
  export class ApolloClient<T = any> {
    constructor(...args: any[]): void;
  }
  export class InMemoryCache {
    constructor(...args: any[]): void;
  }
  export class HttpLink {
    constructor(...args: any[]): void;
  }
  export function split(...args: any[]): any;
  export class GraphQLWsLink {
    constructor(...args: any[]): void;
  }
}
