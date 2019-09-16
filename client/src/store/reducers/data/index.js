import produce  from 'immer';
import set from 'lodash.set';
import setWith from 'lodash.setwith';
import get from 'lodash.get';
import { createKey } from '../../utils';

import {
  SAVE_MY_CHARACTERS,
  SAVE_CHARACTERS,
} from '../../constants/data';

import * as selectors from '../../selectors/data';


export const DataReducer = (store, { type, payload = {} } = {}) => {
    if (!type || !payload) return store;

    return produce(store, (draft) => {
      switch (type) {

        case SAVE_CHARACTERS: {
          const { data, loading, error } = payload;
          set(draft, 'characters.all', { data: { ...selectors.getAllCharacters(store), ...data }, loading, error });
          break;
        }

        case SAVE_MY_CHARACTERS: {
          const { ids, params } = payload;
          set(draft, `characters.mines.${createKey(params)}`, { ...selectors.getMyCharacters(store, { params }), data });
          break;
        }

    }
    return draft;
  });
};
