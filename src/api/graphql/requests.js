import { COUNTRIES } from '../../constants';
import { client } from './client';
import {
  createPostMutation,
  createReactionMutation,
  createUserMutation,
  updateUserMutation
} from './mutations';
import {
  avatarsQuery,
  countriesQuery,
  latestNotificationQuery,
  latestPostsWithoutCurrentUserQuery,
  notificationQuery,
  postsQuery,
  userQuery,
  yesterdaysNotificationQuery
} from './queries';
import {
  createPostResult,
  createReactionResult,
  createUserResult,
  getAvatarsResult,
  getCountriesResult,
  getLatestPostsResult,
  getNotificationResult,
  getPostsResult,
  getUserResult,
  getYesterdaysNotificationResult,
  updateUserResult
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
    console.log('res', res);
    return getNotificationResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const getLatestPostsWithoutCurrentUser = async (
  currentUserId,
  limit,
  offset
) => {
  try {
    console.log('fetchedddddddd in request');
    const res = await client.query({
      query: latestPostsWithoutCurrentUserQuery,
      variables: { currentUserId, limit, offset }
    });

    return getLatestPostsResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const getPosts = async (
  where,
  currentUserId,
  orderBy,
  limit,
  offset
) => {
  try {
    const res = await client.query({
      query: postsQuery(
        where,
        orderBy,
        currentUserId,
        limit || 9999999,
        offset || 0
      )
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

export const getYesterdaysNotification = async () => {
  try {
    const res = await client.query({
      query: yesterdaysNotificationQuery
    });
    return getYesterdaysNotificationResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const getPostsYesterday = async (
  country,
  currentUserId,
  limit,
  offset
) => {
  /* const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const beforeYesterday = new Date();
  beforeYesterday.setDate(beforeYesterday.getDate() - 2);*/
  const yesterdaysNotification = await getYesterdaysNotification();

  const res = await getPosts(
    {
      countryCode:
        country.code === COUNTRIES.WORLD ? {} : { _eq: country.code },
      notificationId: { _eq: yesterdaysNotification?.id }
    },
    currentUserId,
    '{ reactions_aggregate: { count: desc } }',
    limit,
    offset
  );
  return res;
};

export const getPostsLiked = async (currentUserId, limit, offset) => {
  const res = await getPosts(
    { reactions: { userId: { _eq: currentUserId } } },
    currentUserId,
    undefined,
    limit,
    offset
  );
  return res;
};

export const updateUser = async (id, set) => {
  try {
    const res = await client.mutate({ mutation: updateUserMutation(id, set) });
    return updateUserResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const getCountries = async () => {
  try {
    const res = await client.query({
      query: countriesQuery()
    });
    return getCountriesResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const getAvatars = async () => {
  try {
    const res = await client.query({
      query: avatarsQuery
    });
    return getAvatarsResult(res);
  } catch (e) {
    console.log(e);
  }
};
