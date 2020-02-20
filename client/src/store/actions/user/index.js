import React from 'react';
import deepEqual from 'lodash.isequal';
import { DateTime } from 'luxon';

import { action } from '../../utils';
import * as cookies from '../../../utils/cookies';
import { TOKEN } from '../../../constants/cookies';

import { SAVE_USER, SAVE_JWT, SAVE_CHARACTERS } from '../../constants/user';
import * as selectors from '../../selectors/user';
import * as services from '../../../services/user';



export async function saveUser({ user }, [store, dispatch]) {
  try {
    if (deepEqual(selectors.getUser(store), user)) return;
    dispatch(action({ type: SAVE_USER, payload: { user } }));
    return true;
  } catch (e) {
    return e;
  }
};

export async function saveJWT({ token }, [store, dispatch]) {
  try {
    if (selectors.getJWT(store) === token) return;
    dispatch(action({ type: SAVE_JWT, payload: { token } }));
    cookies.set(TOKEN, token, '.shokkoth.tk');
    return true;
  } catch (e) {
    return e;
  }
};

export async function logout([store, dispatch]) {
  try {
    dispatch(action({ type: SAVE_JWT, payload: { token: undefined } }));
    dispatch(action({ type: SAVE_USER, payload: { user: undefined } }));
    cookies.delete(TOKEN, '.shokkoth.tk');
    return true;
  } catch (e) {
    return e;
  }
};
