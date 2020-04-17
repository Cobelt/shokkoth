import get from 'lodash.get';
import { createSelector } from 'reselect';


export const getUser = (store) => get(store, 'user');
export const isLogged = createSelector(getUser, user => Date.now() < get(user, 'exp') * 1000)

export const getJWT = (store) => get(store, 'jwt');
