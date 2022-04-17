import { COUNTRIES } from '../../constants';
import { client } from './client';
import {
  createPostMutation,
  createReactionMutation,
  createUserMutation
} from './mutations';
import {
  latestNotificationQuery,
  notificationQuery,
  postsQuery,
  userQuery
} from './queries';
import {
  createPostResult,
  createReactionResult,
  createUserResult,
  getNotificationResult,
  getPostsResult,
  getUserResult
} from './responeParsers';

export const getUser = async (id) => {
  try {
    const res = await client.query({
      query: userQuery,
      variables: { id }
    });

    return getUserResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const createUser = async (obj) => {
  try {
    const res = await client.mutate({ mutation: createUserMutation(obj) });
    return createUserResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const createPost = async (obj) => {
  try {
    const res = await client.mutate({ mutation: createPostMutation(obj) });
    return createPostResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const getNotification = async (id) => {
  try {
    const res = await client.query({
      query: notificationQuery,
      variables: { id }
    });
    return getNotificationResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const getLatestNotification = async (currentUserId) => {
  try {
    const res = await client.query({
      query: latestNotificationQuery,
      variables: { currentUserId }
    });
    return getNotificationResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const getPosts = async (where, currentUserId, orderBy) => {
  try {
    console.log('where', where, orderBy, currentUserId);
    const res = await client.query({
      query: postsQuery(where, orderBy, currentUserId)
    });
    return getPostsResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const createReaction = async (obj) => {
  try {
    const res = await client.mutate({ mutation: createReactionMutation(obj) });
    return createReactionResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const getPostsYesterday = async (country, currentUserId) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const beforeYesterday = new Date();
  beforeYesterday.setDate(beforeYesterday.getDate() - 2);
  console.log(yesterday, beforeYesterday);
  const res = await getPosts(
    {
      country: country === COUNTRIES.WORLD ? {} : { _eq: country },
      createdAt: { _gte: beforeYesterday, _lte: yesterday }
    },
    currentUserId,
    '{ reactions_aggregate: { count: desc } }'
  );
  return res;
};
