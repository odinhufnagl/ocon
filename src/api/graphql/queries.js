import gql from 'graphql-tag';
import { objectToGraphql } from './helpers';

export const userQuery = gql`
  query user($id: String!) {
    users(where: { id: { _eq: $id } }) {
      id
      email
      appState
      postsCount: posts_aggregate {
        aggregate {
          count
        }
      }
      reactionsCount: reactions_aggregate {
        aggregate {
          count
        }
      }
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

export const postsQuery = (where, orderBy, currentUserId) => {
  const whereInput = objectToGraphql(where || {});
  const orderByInput = orderBy || '{ createdAt: desc }';

  return gql`
  query posts {
    posts(where: ${whereInput}, order_by:${orderByInput}) {
      createdAt,
      id,
      image,
      postType {position, colorTop, colorBottom},
      city,
      country,
      reactions {
        reactionType {name}
      },
      currentUsersTotalReactionsCount:reactions_aggregate(where:{userId:{_eq:${currentUserId}}}) {
        aggregate {count}
      },
      
    }
  }
`;
};
