import { client } from './client';
import { createUserMutation } from './mutations';
import { userQuery } from './queries';
import { createUserResult, getUserResult } from './responeParsers';

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
