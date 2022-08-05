import gql from 'graphql-tag';
import { objectToGraphql } from './helpers';

export const userQuery = gql`
  query user($id: String!) {
    users(where: { id: { _eq: $id } }) {
      id
      email
      avatar {
        id
        image
      }
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
      notificationToken
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

export const yesterdaysNotificationQuery = gql`
  query yesterdaysNotification {
    notifications(order_by: { createdAt: desc }, limit: 2) {
      id
      createdAt
    }
  }
`;

export const latestPostsWithoutCurrentUserQuery = gql`
  query latestPosts($currentUserId: String!, $limit: Int, $offset: Int) {
    notifications(order_by: { createdAt: desc }, limit: 1) {
      id
      posts: posts(
        where: { userId: { _neq: $currentUserId } }
        limit: $limit
        offset: $offset
      ) {
        createdAt
        id
        image
        postType {
          position
        }
        location
        country {
          name
        }
        reactions {
          reactionType {
            name
          }
        }
        createdBy {
          email
          avatar {
            id
            image
          }
          id
          postsCount: posts_aggregate {
            aggregate {
              count
            }
          }
        }
        currentUsersTotalReactionsCount: reactions_aggregate(
          where: { userId: { _eq: $currentUserId } }
        ) {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

export const postsQuery = (where, orderBy, currentUserId, limit, offset) => {
  const whereInput = objectToGraphql(where || {});
  const orderByInput = orderBy || '{ createdAt: desc }';

  return gql`
  query posts {
    posts(where: ${whereInput}, order_by:${orderByInput}, limit:${limit}, offset: ${offset} ) {
      createdAt,
      id,
      image,
      postType {position},
    location,
    createdBy{
      id
      email
      postsCount: posts_aggregate {
        aggregate {
          count
        }
      }
      avatar {
        id
        image
      }
    }
    countryCode
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

export const countriesQuery = () => gql`
  query {
    countries {
      name
      code
    }
  }
`;

export const avatarsQuery = gql`
  query {
    avatars {
      id
      image
    }
  }
`;
