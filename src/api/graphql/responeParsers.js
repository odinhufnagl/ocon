import { EMPTY } from './constants';

export const getUserResult = (res) =>
  res.data && res.data.users.length > 0 ? res.data.users[0] : EMPTY;

export const createUserResult = (res) =>
  res.data &&
  res.data.insert_users.returning.length > 0 &&
  res.data.insert_users.returning[0];

export const createPostResult = (res) =>
  res.data &&
  res.data.insert_posts.returning.length > 0 &&
  res.data.insert_posts.returning[0];

export const getNotificationResult = (res) =>
  res.data && res.data.notifications.length > 0 && res.data.notifications[0];

export const getNotificationsResult = (res) =>
  res.data && res.data.notification.length > 0 && res.data.notifications;
