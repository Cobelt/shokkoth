import get from 'lodash.get';

export const getUser = (store) => get(store, `user`);
export const isLogged = (store) => get(getUser(store), 'logged');