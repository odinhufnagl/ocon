import gql from 'graphql-tag';
import { objectToGraphql } from './helpers';

export const createUserMutation = (obj) => {
  const input = objectToGraphql(obj);
  return gql`
   mutation {
    insert_users(objects: ${input}) {returning {id, email, appState}}
  }
`;
};
