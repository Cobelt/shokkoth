import { useContext } from 'react';
import memoize from 'lodash.memoize';

import * as actions from '../store/actions/user';
import * as selectors from '../store/selectors/user';

export const hasRoles = memoize((roles, needRoles = [], needEvery = true) => {
  if (needRoles.length <= 0) return true;
  if (!roles || roles === []) return null; // not logged
  if (needEvery && needRoles.some(role => !roles.includes(role))) return false; // doesnt have every roles
  if (!needEvery && needRoles.every(role => !roles.includes(role))) return false; // doesnt have any role
  return true;
}, (...args) => JSON.stringify(args));


export const useUser = memoize(([store, dispatch] = []) => {
  if (!store || !dispatch) return {};

  const user = selectors.getJWTDecoded(store);

  return {
    user,
    token: selectors.getJWT(store),

    signin: ({ username, password }) => actions.signin({ username, password }, [store, dispatch]),
    login:  ({ username, password }) => actions.login({ username, password }, [store, dispatch]),
    logout: () => actions.logout([store, dispatch]),


    hasRoles: ({ needRoles = [], needEvery = true }) => user ? hasRoles(user.roles, needRoles, needEvery) : null,
    isLogged: !!user,
  };
}, ([store]) => JSON.stringify(store));

export default useUser;
