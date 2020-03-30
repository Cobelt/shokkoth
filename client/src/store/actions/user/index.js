import React from 'react';
import deepEqual from 'lodash.isequal';
import jwt from 'jsonwebtoken';
import get from 'lodash.get';
import { DateTime } from 'luxon';

import { action } from '../../utils';
import * as cookies from '../../../utils/cookies';
import { TOKEN } from '../../../constants/cookies';

import { SAVE_USER, SAVE_JWT, SAVE_CHARACTERS } from '../../constants/user';
import * as selectors from '../../selectors/user';
import * as services from '../../../services/user';



export async function decodeUser([store, dispatch]) {
  const token = selectors.getJWT(store);
  if (!token) return null

  try {
    const decoded = jwt.decode(token);

    if (Date.now() < get(decoded, 'exp') * 1000) {
      console.log('you are logged')
      if (!deepEqual(selectors.getUser(store), user)) {
        dispatch(action({ type: SAVE_USER, payload: { user: decoded } }));
      }
    }
    else {
      saveJWT({ token: null }, [store, dispatch])
    }

  } catch (e) {
    return e;
  }
};

export async function saveJWT({ token }, [store, dispatch]) {
  try {
    if (selectors.getJWT(store) === token) return;
    dispatch(action({ type: SAVE_JWT, payload: { token } }));
    cookies.set(TOKEN, token, '.shokkoth.fr');
    return true;
  } catch (e) {
    return e;
  }
};

export async function logout([store, dispatch]) {
  try {
    dispatch(action({ type: SAVE_JWT, payload: { token: undefined } }));
    dispatch(action({ type: SAVE_USER, payload: { user: undefined } }));
    cookies.delete(TOKEN, '.shokkoth.fr');
    return true;
  } catch (e) {
    return e;
  }
};
