import { useEffect } from 'react';
import memoize from 'lodash.memoize';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import get from 'lodash.get';
import jwt from 'jsonwebtoken';

import * as actions from '../store/actions/user';
import * as selectors from '../store/selectors/user';

import { getDecodedToken } from '../queries';
import * as mutations from '../queries/mutations';


export const hasRoles = memoize((roles, needRoles = [], needEvery = true) => {
  if (needRoles.length <= 0) return true;
  if (!roles || roles === []) return null; // not logged
  if (needEvery && needRoles.some(role => !roles.includes(role))) return false; // doesnt have every roles
  if (!needEvery && needRoles.every(role => !roles.includes(role))) return false; // doesnt have any role
  return true;
}, (...args) => JSON.stringify(args));


export const useUser = ([store, dispatch] = []) => {
  try {
    if (!store || !dispatch) return {};

    const token = selectors.getJWT(store);
    const user = selectors.getUser(store);

    let decoded;
    let isLogged = false;
    if (token) {
      decoded = jwt.decode(token);
      if (Date.now() < get(decoded, 'exp') * 1000) {
        isLogged = true;
      }
      else {
        // remove token
        actions.saveJWT({ token: null }, [store, dispatch])
      }
    }

    const [signin, { data: { signin: tokenFromSignin } = {}, error: signinError }] = useMutation(gql(mutations.signin));
    const [login, { data: { login: tokenFromLogin } = {}, error: loginError }] = useMutation(gql(mutations.login));

    useEffect(() => {
      if (token && !user && decoded && isLogged) {
        actions.saveUser({ user: decoded }, [store, dispatch]);
      }
    }, [token, decoded, isLogged]);

    useEffect(() => {
      if (tokenFromLogin || tokenFromSignin) {
        actions.saveJWT({ token: tokenFromLogin || tokenFromSignin }, [store, dispatch]);
      }
    }, [tokenFromLogin, tokenFromSignin])

    return {
      user,
      token,

      signin: ({ username, password }) => signin({ variables: { username, password } }),
      login:  ({ username, password }) => login({ variables: { username, email: username, password } }),
      logout: () => actions.logout([store, dispatch]),

      signinError,
      loginError,

      hasRoles: ({ needRoles = [], needEvery = true }) => user ? hasRoles(user.roles, needRoles, needEvery) : null,
      isLogged,
    };
  }
  catch (error) {
    return { error };
  }
};

export default useUser;
