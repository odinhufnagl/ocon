import moment from 'moment';
import { COUNTRIES } from '../../constants';
import {
  getCurrentDate,
  getTommorowsDate,
  getYesterdaysDate
} from '../../utils';
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
  notificationsQuery,
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
  getNotificationsResult,
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

export const getNotifications = async (where) => {
  try {
    const res = await client.query({
      query: notificationsQuery(where)
    });
    return getNotificationsResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const getTodaysNotificationIds = async () => {
  const currentDate = getCurrentDate();
  const tomorrowsDate = getTommorowsDate();
  const res = await getNotifications({
    createdAt: { _gte: currentDate, _lt: tomorrowsDate }
  });
  if (!res) {
    return;
  }
  return res.map(({ id }) => id);
};

export const getYesterdaysNotificationIds = async () => {
  const yesterdaysDate = getYesterdaysDate();
  const currentDate = getCurrentDate();
  const res = await getNotifications({
    createdAt: { _gte: yesterdaysDate, _lt: currentDate }
  });
  if (!res) {
    return;
  }
  return res.map(({ id }) => id);
};

export const getLatestNotification = async (currentUserId) => {
  try {
    const currentDate = getCurrentDate();
    const tomorrowsDate = getTommorowsDate();
    //TODO: this quering atm is fetching the notification from today, altough what could be used
    //in the future is to find the latest one where current timezone is in the notifications timeZones
    //which will allow us to use multiple notifications per day
    const res = await client.query({
      query: latestNotificationQuery({
        createdAt: { _gte: currentDate, _lt: tomorrowsDate }
      }),
      variables: { currentUserId }
    });
    return getNotificationsResult(res)[0];
  } catch {
    console.log(e);
  }
};

export const getTodaysPostsWithoutCurrentUser = async (
  currentUserId,
  country = COUNTRIES.WORLD,
  limit,
  offset
) => {
  try {
    const todaysNotificationIds = await getTodaysNotificationIds();
    if (!todaysNotificationIds) {
      return;
    }
    const res = await getPosts(
      {
        countryCode:
          country.code === COUNTRIES.WORLD ? {} : { _eq: country.code },
        userId: { _neq: currentUserId },
        notificationId: { _in: todaysNotificationIds }
      },
      '{ reactions_aggregate: { count: desc } }',
      currentUserId,
      limit || 999999,
      offset || 0
    );
    if (!res) {
      return;
    }
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const getPosts = async (
  where,
  orderBy,
  currentUserId,
  limit,
  offset
) => {
  try {
    const todaysNotificationIds = await getTodaysNotificationIds();
    const res = await client.query({
      query: postsQuery(
        where,
        orderBy,
        currentUserId,
        limit || 9999999,
        offset || 0
      )
    });
    return getPostsResult(res, todaysNotificationIds);
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

export const getPostsYesterday = async (
  country,
  currentUserId,
  limit,
  offset
) => {
  const yesterdaysNotificationIds = await getYesterdaysNotificationIds();

  const res = await getPosts(
    {
      countryCode:
        country.code === COUNTRIES.WORLD ? {} : { _eq: country.code },
      notificationId: { _in: yesterdaysNotificationIds }
    },
    '{ reactions_aggregate: { count: desc } }',
    currentUserId,
    limit,
    offset
  );
  return res;
};

export const getPostsLiked = async (
  currentUserId,
  limit,
  offset,
  isCurrentUser
) => {
  const res = await getPosts(
    { reactions: { userId: { _eq: currentUserId } } },
    undefined,
    currentUserId,
    limit,
    offset,
    isCurrentUser
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
