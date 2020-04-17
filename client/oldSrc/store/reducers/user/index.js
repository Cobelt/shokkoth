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
          const { user } = payload;
          set(draft, 'user', user);
          break;
        }

        case SAVE_JWT: {
          const { token, error, loading } = payload;
          set(draft, 'jwt', token);
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
