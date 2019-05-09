import React from 'react';
import deepEqual from 'lodash.isequal';

import { SAVE_USER, SAVE_JWT } from '../../../constants/user';
import { getUser } from '../../selectors/user';

import * as services from '../../../services';

// Give it some utility please
export const action = ({ loading, payload, type }) => ({ type, loading, payload });


export const saveUser = ({ user }) => {
  return (store, dispatch) => {
    if (!user) return;

    const type = SAVE_USER;

    const actualUser = getUser(store);
    if (actualUser && deepEqual(user, actualUser)) return;

    dispatch(action({ type, loading: false, payload: { user } }));
  };
};


export const login = ({ username, password }, [store, dispatch]) => {

    if (!username || !password) return;

    const type = SAVE_JWT;

    try {
      dispatch(action({ type, loading: true }))

      const token = services.login({ username, password })

      dispatch(action({ type, loading: false, payload: { token } }));
    }
    catch (error) {
      dispatch(action({ type, loading: false, payload: { error } })); 
    }
};
