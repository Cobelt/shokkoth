import produce  from 'immer';
import set from 'lodash.set';

import { CREATE_USER, UPDATE_USER } from '../../actions/user';


function getInitialState() {
  return {};
}

export const UserReducer = (store = getInitialState(), { type, payload } = {}) => {
	if (!type || !payload) return;

	return produce(store, (draft) => {
        switch (type) {

            case CREATE_USER:
            case UPDATE_USER: {
                const { user, data } = payload;

                set(draft, `${user}`, data);

                break;
            }

        }
        return draft;
    })
};
