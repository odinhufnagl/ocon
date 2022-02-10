import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

const GRAPHQL_ENDPOINT = 'https://capture-it.hasura.app/v1/graphql';
const HASURA_SECRET =
  '0ZzSVj7ATIv4co9LKCMDMv5gjiUwdpupXe9dF88Sr3k88mndDcQ72hgp9GjavSDG';
const link = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  headers: {
    'x-hasura-admin-secret': HASURA_SECRET
  }
});

const defaultOptions = {
  query: {
    fetchPolicy: 'no-cache'
  }
};

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({ addTypename: false }),
  defaultOptions
});
