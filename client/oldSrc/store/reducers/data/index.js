import produce  from 'immer';
import set from 'lodash.set';
import setWith from 'lodash.setwith';
import get from 'lodash.get';
import { createKey } from '../../utils';

import {
  SAVE_MY_CHARACTERS,
  SAVE_CHARACTERS,
} from '../../constants/data';

import * as selectors from '../../selectors/data/characters';


export const DataReducer = (store, { type, payload = {} } = {}) => {
    if (!type || !payload) return store;

    return produce(store, (draft) => {
      switch (type) {

        case SAVE_CHARACTERS: {
          const { data = {}, loading, error } = payload;
          const current = selectors.getAllCharacters(store) || {};
          set(draft, 'characters.all', { data: { ...current, ...data }, loading, error });
          break;
        }

        case SAVE_MY_CHARACTERS: {
          const { ids = [], params } = payload;
          const current = selectors.getMyCharactersIds(store, { params }) || [];
          set(draft, `characters.mines`, [...current, ...ids]);
          break;
        }

    }
    return draft;
  });
};
