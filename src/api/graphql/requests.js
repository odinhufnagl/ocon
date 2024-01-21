import moment from "moment";
import { COUNTRIES } from "../../constants";
import {
  getCurrentDate,
  getTommorowsDate,
  getYesterdaysDate,
} from "../../utils";
import { client } from "./client";
import {
  createFollowingMutation,
  createPostMutation,
  createReactionMutation,
  createUserMutation,
  createUserReportMutation,
  deleteFollowingsMutation,
  updateUserMutation,
} from "./mutations";
import {
  avatarsQuery,
  countriesQuery,
  latestNotificationQuery,
  notificationsQuery,
  postsQuery,
  searchUsersQuery,
  usersQuery,
} from "./queries";
import {
  createPostResult,
  createReactionResult,
  createUserResult,
  getAvatarsResult,
  getCountriesResult,
  getNotificationsResult,
  getPostsResult,
  getSearchUsersResult,
  getsearchUsersResult,
  getUserResult,
  getUsersResult,
  updateUserResult,
} from "./responeParsers";

export const getUser = async ({ id, where, currentUserId }) => {
  try {
    const res = await client.query({
      query: usersQuery(
        id ? { id: { _eq: id } } : where,
        currentUserId,
        999999,
        0
      ),
    });
    console.log("res", res);

    return getUserResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const getUserByUsername = async (username) => {
  try {
    const res = await getUser({ where: { username: { _eq: username } } });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const getUsers = async ({
  where = {},
  limit,
  offset,
  currentUserId,
}) => {
  try {
    const res = await client.query({
      query: usersQuery(where, currentUserId, limit || 999999, offset || 0),
    });
    return getUsersResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const getUsersBySearch = async ({ searchPhrase, limit, offset }) => {
  try {
    const res = await client.query({
      query: searchUsersQuery(
        { search: searchPhrase },
        limit || 99999,
        offset || 0
      ),
    });

    console.log(res);
    return getSearchUsersResult(res);
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
      query: notificationsQuery(where),
    });
    return getNotificationsResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const getTodaysNotificationIds = async () => {
  //this should perhaps be fixed because atm you will not be able to see all images for the
  //notification because if you are in the first timeZone, the new day will have already started
  //when there is still people left to post
  //SOLUTION? a new day should start when tha notification timezones list of a notification contains all timezones
  //so todays notification should be the latest notification where notification timezones is not full size
  //yesterday notification is the latest notification where notification timezones is full size
  const currentDate = getCurrentDate();
  const tomorrowsDate = getTommorowsDate();
  const res = await getNotifications({
    createdAt: { _gte: currentDate, _lt: tomorrowsDate },
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
    createdAt: { _gte: yesterdaysDate, _lt: currentDate },
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
    const res = await client.query({
      query: latestNotificationQuery({
        createdAt: { _gte: currentDate, _lt: tomorrowsDate },
      }),
      variables: { currentUserId },
    });
    return getNotificationsResult(res)[0];
  } catch {
    console.log(e);
  }
};

export const getPopularPosts = async ({
  currentUserId,
  country = COUNTRIES.WORLD,
  limit,
  offset,
  following,
}) => {
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
        notificationId: { _in: todaysNotificationIds },
        createdBy: following
          ? {
              followers: { followerId: { _eq: currentUserId } },
            }
          : {},
      },
      "{ reactions_aggregate: { count: desc } }",
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

export const getScoreboardPosts = async ({
  country = COUNTRIES.WORLD,
  currentUserId,
  limit,
  offset,
  following,
}) => {
  const yesterdaysNotificationIds = await getYesterdaysNotificationIds();

  const res = await getPosts(
    {
      countryCode:
        country.code === COUNTRIES.WORLD ? {} : { _eq: country.code },
      notificationId: { _in: yesterdaysNotificationIds },
      createdBy: following
        ? {
            followers: { followerId: { _eq: currentUserId } },
          }
        : {},
    },
    "{ reactions_aggregate: { count: desc } }",
    currentUserId,
    limit,
    offset
  );
  return res;
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
      ),
    });
    return getPostsResult(res, todaysNotificationIds);
  } catch (e) {
    console.log(e);
  }
};

export const getPostsByUserId = async ({
  userId,
  limit,
  offset,
  currentUserId,
}) => {
  console.log("limit", limit, userId);
  try {
    const res = await getPosts(
      { userId: { _eq: userId } },
      undefined,
      currentUserId,
      limit,
      offset
    );
    return res;
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
      query: countriesQuery(),
    });
    return getCountriesResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const getAvatars = async () => {
  try {
    const res = await client.query({
      query: avatarsQuery,
    });
    console.log("avatars", res);
    return getAvatarsResult(res);
  } catch (e) {
    console.log(e);
  }
};

export const createUserReport = async (obj) => {
  try {
    await client.mutate({
      mutation: createUserReportMutation(obj),
    });
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const createFollowing = async (obj) => {
  try {
    await client.mutate({
      mutation: createFollowingMutation(obj),
    });
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const deleteFollowings = async (followedId, followerId) => {
  try {
    await client.mutate({
      mutation: deleteFollowingsMutation({
        followedId: { _eq: followedId },
        followerId: { _eq: followerId },
      }),
    });
    return true;
  } catch (e) {
    console.log(e);
  }
};
