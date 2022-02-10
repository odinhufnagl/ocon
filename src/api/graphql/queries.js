import gql from 'graphql-tag';

export const userQuery = gql`
  query user($id: String!) {
    users(where: { id: { _eq: $id } }) {
      id
      email
      appState
    }
  }
`;
