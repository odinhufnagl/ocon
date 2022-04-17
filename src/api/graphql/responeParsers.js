import { EMOJI_NAMES } from '../../constants';
import { EMPTY } from './constants';

export const getUserResult = (res) =>
  res.data && res.data.users.length > 0
    ? {
        ...res.data.users[0],
        postsCount: res.data.users[0].posts_aggregate.aggregate.count,
        reactionsCount: res.data.users[0].reactions_aggregate.aggregate.count
      }
    : EMPTY;

export const createUserResult = (res) =>
  res.data &&
  res.data.insert_users.returning.length > 0 &&
  res.data.insert_users.returning[0];

export const createPostResult = (res) =>
  res.data &&
  res.data.insert_posts.returning.length > 0 &&
  res.data.insert_posts.returning[0];

export const createReactionResult = (res) =>
  res.data &&
  res.data.insert_reactions.returning.length > 0 &&
  res.data.insert_reactions.returning[0];

export const getNotificationResult = (res) =>
  res.data && res.data.notifications.length > 0 && res.data.notifications[0];

export const getNotificationsResult = (res) =>
  res.data && res.data.notifications.length > 0 && res.data.notifications;

export const getPostsResult = (res) => {
  if (!res.data || !res.data.posts) {
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
      reactionsTotalCount: post.reactions.length,
      reactionsCount,
      currentUsersTotalReactionsCount:
        post.currentUsersTotalReactionsCount.aggregate.count
    });
  });
  return postsToReturn;
};
