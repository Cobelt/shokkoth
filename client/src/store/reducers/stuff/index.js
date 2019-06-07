import produce  from 'immer';
import set from 'lodash.set';
import get from 'lodash.get';

import { SAVE_USER, SAVE_JWT } from '../../../constants/user';


function getInitialState() {
  return {};
}

export const UserReducer = (store = getInitialState(), { type, payload } = {}) => {
    if (!type || !payload) return store;

    return produce(store, (draft) => {
      switch (type) {

        case SAVE_DRAFT: {
          const { stuff } = payload;
          set(draft, 'draft', { stuff } );
          break;
        }

        case SAVE_ACTIVE: {
          const { idstuff } = payload;
          console.log(payload)
          set(draft, 'active', { idstuff });
          break;
        }

    }
    return draft;
  });
};
