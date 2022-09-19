import { EMOJI_NAMES } from '../../constants';
import { EMPTY } from './constants';

export const getUserResult = (res) =>
  res.data && res.data.users.length > 0
    ? {
        ...res.data.users[0],
        followersCount: res.data.users[0].followersCount.aggregate.count,
        followingCount: res.data.users[0].followingCount.aggregate.count,
        isAlreadyFollowing:
          res.data.users[0].isAlreadyFollowing.aggregate.count > 0
      }
    : EMPTY;

export const getUsersResult = (res) => res.data && res.data.users;

export const getSearchUsersResult = (res) => res.data && res.data.search_users;

export const createUserResult = (res) =>
  res.data &&
  res.data.insert_users.returning.length > 0 &&
  res.data.insert_users.returning[0];

export const createPostResult = (res) =>
  res.data && res.data.insert_posts.returning[0];

export const createReactionResult = (res) =>
  res.data &&
  res.data.insert_reactions.returning.length > 0 &&
  res.data.insert_reactions.returning[0];

export const getNotificationResult = (res) =>
  res.data && res.data.notifications.length > 0 && res.data.notifications[0];

export const getYesterdaysNotificationResult = (res) =>
  res.data && res.data.notifications
    ? res.data.notifications.length > 0 && res.data.notifications[1]
    : {};

export const getNotificationsResult = (res) =>
  res.data && res.data.notifications;

export const getLatestPostsResult = (res) => {
  if (!res.data || !res.data.notifications) {
    return;
  }
  if (res.data.notifications.length === 0) {
    return [];
  }
  const postsToReturn = [];

  res.data.notifications[0].posts.forEach((post) => {
    let reactionsCount = {
      [EMOJI_NAMES.GRINNING]: 0,
      [EMOJI_NAMES.HEART_EYES]: 0
    };
    post.reactions?.forEach((reaction) => {
      reactionsCount[reaction.reactionType.name] += 1;
    });
    postsToReturn.push({
      ...post,
      reactionsTotalCount: post.reactions.length,
      reactionsCount,
      currentUsersTotalReactionsCount:
        post.currentUsersTotalReactionsCount.aggregate.count
    });
  });
  return postsToReturn;
};

export const getPostsResult = (res, todaysNotificationIds) => {
  if (!res.data || !res.data.posts || !todaysNotificationIds) {
    return;
  }
  const postsToReturn = [];

  res.data.posts.forEach((post) => {
    let reactionsCount = {
      [EMOJI_NAMES.GRINNING]: 0,
      [EMOJI_NAMES.HEART_EYES]: 0
    };
    post.reactions?.forEach((reaction) => {
      reactionsCount[reaction.reactionType.name] += 1;
    });
    postsToReturn.push({
      ...post,
      belongsToTodaysNotifications: todaysNotificationIds.includes(
        post.notification.id
      ),
      reactionsTotalCount: post.reactions.length,
      reactionsCount,
      currentUsersTotalReactionsCount:
        post.currentUsersTotalReactionsCount.aggregate.count
    });
  });
  return postsToReturn;
};

export const updateUserResult = (res) =>
  res.data && res.data.update_users_by_pk;

export const getCountriesResult = (res) => res.data && res.data.countries;

export const getAvatarsResult = (res) => res.data && res.data.avatars;
