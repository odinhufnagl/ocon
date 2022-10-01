import Config from 'react-native-config';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

const GRAPHQL_ENDPOINT = 'https://capture-it-app.herokuapp.com/v1/graphql';

const link = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  headers: {
    'x-hasura-admin-secret': Config.HASURA_SECRET
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
