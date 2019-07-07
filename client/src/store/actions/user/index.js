import React from 'react';
import deepEqual from 'lodash.isequal';
import { DateTime } from 'luxon';

import { action } from '../../utils';

import { SAVE_USER, SAVE_JWT } from '../../../constants/user';
import { getUser } from '../../selectors/user';


import * as services from '../../../services';



export const saveUser = ({ user }) => {
  return (store, dispatch) => {
    if (!user) return;

    const type = SAVE_USER;

    const actualUser = getUser(store);
    if (actualUser && deepEqual(user, actualUser)) return;

    dispatch(action({ type, loading: false, payload: { user } }));
  };
};


export function login({ username, password } = {}, [store, dispatch]) {
    if (!username || !password) return;

    const type = SAVE_JWT;

    try {
      dispatch(action({ type, loading: true }))

      const token = services.login({ username, password })
                          	.then(token => {
                              dispatch(action({ type, loading: false, payload: { token } }))
                              document.cookie = `jwt=${token}; expires=${DateTime.local().plus({ weeks: 1 }).toHTTP()}; domain=*.shokkoth.tk; path=/`;
                            })
                          	.catch(error => dispatch(action({ type, loading: false, payload: { error } })));

    }
    catch (error) {
      dispatch(action({ type, loading: false, payload: { error } }));
    }
};

export function logout([store, dispatch]) {
    if (!username || !password) return;

    const type = SAVE_JWT;
    dispatch(action({ type, loading: false, token: undefined }))

};
