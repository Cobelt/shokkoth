import produce  from 'immer';
import set from 'lodash.set';

import { SAVE_USER, SAVE_JWT } from '../../constants/user';


function getInitialState() {
  return {};
}

export const UserReducer = (store = getInitialState(), { type, payload } = {}) => {
	if (!type || !payload) return;

	return produce(store, (draft) => {
    switch (type) {

      case SAVE_USER: {
        const { user, data } = payload;

        set(draft, `${user}`, data);

        break;
      }

      case SAVE_JWT: {

        break;
      }

    }
    return draft;
  })
};
