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

export const createPostMutation = (obj) => {
  const input = objectToGraphql(obj);
  return gql`
  mutation {
    insert_posts(objects: ${input}) {returning {id}}
  }`;
};

export const createReactionMutation = (obj) => {
  const input = objectToGraphql(obj);
  return gql`
  mutation {
    insert_reactions(objects: ${input}) {returning {id}}
  }
  `;
};
