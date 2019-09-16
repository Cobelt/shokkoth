import get from 'lodash.get';
import { createSelector } from 'reselect';
import jwt from 'jsonwebtoken';

export const getUser = (store) => get(store, 'user');
export const getJWT = (store) => get(store, 'jwt');
