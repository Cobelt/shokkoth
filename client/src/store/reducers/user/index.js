import produce  from 'immer';
import set from 'lodash.set';

import { SAVE_USER, SAVE_JWT } from '../../../constants/user';


function getInitialState() {
  return {};
}

export const UserReducer = (store = getInitialState(), { type, payload } = {}) => {
    if (!type || !payload) return store;

    return produce(store, (draft) => {
      switch (type) {

        case SAVE_USER: {
          const { user, error, loading } = payload;
          set(draft, 'user', { user, loading, error } );
          break;
        }

        case SAVE_JWT: {
          const { token, error, loading } = payload;
	  set(draft, 'jwt', { token, loading, error });
          break;
      }

    }
    return draft;
  });
};
