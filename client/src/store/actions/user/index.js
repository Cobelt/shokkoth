import React from 'react';
import deepEqual from 'lodash.isequal';
import { DateTime } from 'luxon';

import { action } from '../../utils';
import * as cookies from '../../../utils/cookies';

import { SAVE_USER, SAVE_JWT, SAVE_CHARACTERS } from '../../constants/user';
import * as selectors from '../../selectors/user';
import * as services from '../../../services/user';



export const saveUser = async ({ user }) => {
  return (store, dispatch) => {
    if (!user) return;

    const type = SAVE_USER;

    const actualUser = selectors.getUser(store);
    if (actualUser && deepEqual(user, actualUser)) return;

    dispatch(action({ type, loading: false, payload: { user } }));
  };
};


export async function login({ username, password } = {}, [store, dispatch]) {
    if (!username || !password) return;

    const type = SAVE_JWT;

    try {
      dispatch(action({ type, loading: true }))

      const token = await services.login({ username, password });
      dispatch(action({ type, loading: false, payload: { token } }))
      cookies.set('shokkothJWT', token, '.shokkoth.tk');
    }
    catch (error) {
      dispatch(action({ type, loading: false, payload: { error } }));
    }
};


export async function signin({ username, password } = {}, [store, dispatch]) {
    if (!username || !password) return;

    const type = SAVE_JWT;

    try {
      dispatch(action({ type, loading: true }))

      const token = await services.signin({ username, password });

      dispatch(action({ type, loading: false, payload: { token } }))
      cookies.set('shokkothJWT', token, '.shokkoth.tk');

    }
    catch (error) {
      dispatch(action({ type, loading: false, payload: { error } }));
    }
};


export async function logout([store, dispatch]) {
    dispatch(action({ type: SAVE_JWT, loading: false, payload: { token: undefined } }));
    cookies.delete('shokkothJWT', '.shokkoth.tk');
};

export async function fetchCharacters([store, dispatch]) {
  const jwt = selectors.getJWT(store);
  if (!jwt) return;

  const type = SAVE_CHARACTERS;

  try {
    dispatch(action({ type, loading: true }))

    const data = await services.fetchCharacters({ jwt });
    dispatch(action({ type, loading: false, payload: { data } }))
  }
  catch (error) {
    dispatch(action({ type, loading: false, payload: { error } }));
  }
}
