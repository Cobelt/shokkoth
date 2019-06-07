import get from 'lodash.get';
import { createSelector } from 'reselect';
import jwt from 'jsonwebtoken';

export const getUser = (store) => get(store, 'user');
const getJWTData = (store) => get(store, 'jwt');

export const getJWT = createSelector(getJWTData, jwt => get(jwt, 'token'));
export const isJWTLoading = createSelector(getJWTData, jwt => get(jwt, 'loading'));
export const getJWTError = createSelector(getJWTData, jwt => get(jwt, 'error'));

export const getJWTDecoded = createSelector(getJWT, token => jwt.decode(token));
