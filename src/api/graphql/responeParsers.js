import { EMPTY } from './constants';

export const getUserResult = (res) =>
  res.data && res.data.users.length > 0 ? res.data.users[0] : EMPTY;

export const createUserResult = (res) =>
  res.data &&
  res.data.insert_users.returning.length > 0 &&
  res.data.insert_users.returning[0];
