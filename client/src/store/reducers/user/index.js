import produce  from 'immer';
import set from 'lodash.set';
import get from 'lodash.get';

import { SAVE_USER, SAVE_JWT, SAVE_CHARACTERS } from '../../constants/user';


function getInitialState() {
  return {};
}

export const UserReducer = (store = getInitialState(), { type, payload } = {}) => {
    if (!type || !payload) return store;

    return produce(store, (draft) => {
      switch (type) {

        case SAVE_USER: {
          const { user, error, loading } = payload;
          const currentData = get(store, 'user');
          set(draft, 'user', { ...currentData, user, loading, error } );
          break;
        }

        case SAVE_JWT: {
          const { token, error, loading } = payload;
          const currentData = get(store, 'jwt');
          set(draft, 'jwt', { ...currentData, token, loading, error });
          break;
        }

        case SAVE_CHARACTERS: {
          const { data, error, loading } = payload;
          const currentData = get(store, 'characters');
          set(draft, 'characters', { ...currentData, data, loading, error });
          break;
        }

    }
    return draft;
  });
};
