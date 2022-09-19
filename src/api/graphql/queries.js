import gql from 'graphql-tag';
import { objectToGraphql } from './helpers';

export const usersQuery = (where, currentUserId = 'h', limit, offset) => {
  console.log('cur', currentUserId);
  const whereInput = objectToGraphql(where);
  return gql`
    query user {
      users(
        where: ${whereInput}
        limit: ${limit}
        offset: ${offset}
        ) {
        id
        email
        username
        avatar {
          id
          image
        }
        profileImage
        postsCount: posts_aggregate {
          aggregate {
            count
          }
        }
        reactionsCount: reactions_aggregate {
          aggregate {
            count
          }
        },
        isAlreadyFollowing: followers_aggregate(where:{followerId: {_eq: ${currentUserId}}}) {aggregate {count}}
        followersCount: followers_aggregate {
          aggregate {
            count
          }
        }
        followingCount: following_aggregate {
          aggregate {
            count
          }
        }

        notificationToken
        timeZone
      }
    }
  `;
};

export const searchUsersQuery = (args, limit, offset) => {
  const argsInput = objectToGraphql(args);
  console.log(argsInput);
  return gql`
    query {search_users(args:${argsInput} limit: ${limit} offset:${offset}) {
        id
        email
        username
        avatar {
          id
          image
        }
        profileImage
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
        followersCount: followers_aggregate {
          aggregate {
            count
          }
        }
        followingCount: following_aggregate {
          aggregate {
            count
          }
        }

        notificationToken
        timeZone
      }
    }
  `;
};

export const notificationsQuery = (where) => {
  const whereInput = objectToGraphql(where);
  return gql` 
  query notifications {
    notifications(where: ${whereInput}) {
      id
      createdAt
      timeZones {
        timeZoneName
      }
    }
  }
`;
};

export const latestNotificationQuery = (where) => {
  const whereInput = objectToGraphql(where);
  return gql`
  query latestNotification($currentUserId: String!) {
    notifications(order_by: { createdAt: desc }, where: ${whereInput}, limit: 1) {
      id
      createdAt
      currentUsersPosts: posts(where: { userId: { _eq: $currentUserId } }) {
        id
        image
        thumbnail
        video
      }
    }
  }
`;
};

export const yesterdaysNotificationQuery = gql`
  query yesterdaysNotification {
    notifications(order_by: { createdAt: desc }, limit: 2) {
      id
      createdAt
    }
  }
`;

export const latestPostsWithoutCurrentUserQuery = (
  postWhere,
  orderBy,
  currentUserId,
  limit,
  offset
) => {
  const postWhereInput = objectToGraphql(postWhere);
  const currentUserIdInput = objectToGraphql(currentUserId);
  const orderByInput = orderBy || '{ createdAt: desc }';

  return gql`
    query latestPosts {
      notifications(order_by: { createdAt: desc }, limit: 1) {
        id
        posts: posts(
          where: ${postWhereInput}
          order_by: ${orderByInput}
          limit: ${limit}
          offset: ${offset}
        ) {
          createdAt
          id
          image
          thumbnail
          video
          postType {
            id
            name
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
            username
            avatar {
              id
              image
            }
            profileImage
            followers {
              followerId
              id
            }
            id
            postsCount: posts_aggregate {
              aggregate {
                count
              }
            }
          }
          currentUsersTotalReactionsCount: reactions_aggregate(
            where: { userId: { _eq: ${currentUserIdInput} } }
          ) {
            aggregate {
              count
            }
          }
        }
      }
    }
  `;
};

export const postsQuery = (where, orderBy, currentUserId, limit, offset) => {
  const whereInput = objectToGraphql(where || {});
  const orderByInput = orderBy || '{ createdAt: desc }';
  const currentUserIdInput = objectToGraphql(currentUserId);

  return gql`
  query posts {
    posts(where: ${whereInput}, order_by:${orderByInput}, limit:${limit}, offset: ${offset} ) {
      createdAt,
      id,
      image,
      thumbnail,
      video
      postType {name, id},
    location,
    userId,
    createdBy{
      id
      email
      username
      postsCount: posts_aggregate {
        aggregate {
          count
        }
      }
      profileImage
    }
    countryCode
    reactions {
        reactionType {name}
    },
    notification {
      id
    }
    currentUsersTotalReactionsCount:reactions_aggregate(where:{userId:{_eq:${currentUserIdInput}}}) {
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
      image
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
