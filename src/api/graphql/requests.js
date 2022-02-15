import { client } from './client';
import { createPostMutation, createUserMutation } from './mutations';
import {
  latestNotificationQuery,
  notificationQuery,
  userQuery
} from './queries';
import {
  createPostResult,
  createUserResult,
  getNotificationResult,
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
