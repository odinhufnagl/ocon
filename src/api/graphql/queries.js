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

export const notificationQuery = gql`
  query notification($id: Int!) {
    notifications(where: { id: { _eq: $id } }) {
      id
      createdAt
    }
  }
`;

export const latestNotificationQuery = gql`
  query latestNotification($currentUserId: String!) {
    notifications(order_by: { createdAt: desc }, limit: 1) {
      id
      createdAt
      currentUsersPosts: posts(where: { userId: { _eq: $currentUserId } }) {
        id
        image
      }
    }
  }
`;
