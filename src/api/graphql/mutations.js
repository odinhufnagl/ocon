import gql from 'graphql-tag';
import { objectToGraphql } from './helpers';

export const createUserMutation = (obj) => {
  const input = objectToGraphql(obj);
  return gql`
   mutation {
    insert_users(objects: ${input}) {returning {id, email}}
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

export const updateUserMutation = (id, set) => {
  const setInput = objectToGraphql(set);
  const idInput = objectToGraphql(id);
  console.log('setInput', setInput, id);

  return gql`
  mutation {
    update_users_by_pk(pk_columns:{id:${idInput}} _set:${setInput}) {id}
  }
  `;
};

export const createUserReportMutation = (obj) => {
  const input = objectToGraphql(obj);
  console.log('input', input);
  return gql`
   mutation {
        insert_userReports_one (object:${input}) {id}
     } 
   `;
};

export const createFollowingMutation = (obj) => {
  const input = objectToGraphql(obj);
  console.log('input', input);
  return gql`
   mutation {
        insert_followings_one (object:${input}) {id}
     } 
   `;
};

export const deleteFollowingsMutation = (where) => {
  const input = objectToGraphql(where);
  console.log('input', input);
  return gql`
   mutation {
        delete_followings (where:${input}) {returning {id}}
     } 
   `;
};
