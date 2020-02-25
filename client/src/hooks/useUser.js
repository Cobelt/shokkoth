import { useEffect } from 'react';
import memoize from 'lodash.memoize';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import * as actions from '../store/actions/user';
import * as selectors from '../store/selectors/user';

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


    const [signin, { data: { signin: tokenFromSignin } = {}, error: signinError }] = useMutation(gql(mutations.signin));
    const [login, { data: { login: tokenFromLogin } = {}, error: loginError }] = useMutation(gql(mutations.login));

    useEffect(() => {
        actions.decodeUser([store, dispatch])
    }, [token]);

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
      isLogged: selectors.isLogged(store),
    };
  }
  catch (error) {
    return { error };
  }
};

export default useUser;
