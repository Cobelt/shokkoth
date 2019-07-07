import produce  from 'immer';
import set from 'lodash.set';
import setWith from 'lodash.setwith';
import get from 'lodash.get';

import {
  SAVE_SOME,
  SAVE_IDS,
  SAVE_ACTIVE,
  SAVE_STEP,
  SAVE_DISPLAYED,
  SAVE_SEARCH_PARAMS,
  SAVE_LAST_RING_ADDED,
  SAVE_LAST_DOFUS_ADDED
} from '../../constants/equipments';

import * as selectors from '../../selectors/equipments';

import { createKey } from '../../utils/equipments';


export const EquipmentsReducer = (store, { type, payload = {} } = {}) => {
    if (!type || !payload) return store;

    return produce(store, (draft) => {
      switch (type) {
        case SAVE_SOME: {
          const { data, loading } = payload;
          if (loading !== undefined) {
            // console.log('Loading is', loading, 'for new equipments objects');
            set(draft, 'equipments.loading', loading);
          }
          if (data !== undefined) {
            console.log('Stored', Object.keys(data).length, 'new equipments objects');
            // save existing value
            const knownEquipments = selectors.getAllEquipments(store) || {};
            setWith(draft, 'equipments.data', { ...knownEquipments, ...data }, Object);
          }
          break;
        }

        case SAVE_IDS: {
          const { params, data = [], loading } = payload;
          const paramKey = createKey(params)
          if (loading !== undefined) {
            // console.log('Loading is', loading, 'for new ids (with params', paramKey, ')');
            set(draft, `search.${paramKey}.loading`, loading);
          }
          if (data !== undefined) {
            // save existing value
            console.log('Stored', data.length, 'new ids for the params', paramKey);
            const knownIds = selectors.getEquipmentsIds(store) || [];
            set(draft, `search.${paramKey}.data`, [...knownIds, ...data]);
          }
          break;
        }

        case SAVE_SEARCH_PARAMS: {
          break;
        }

        case SAVE_ACTIVE: {
          const { data } = payload;
          // console.log('Stored active stuff');
          set(draft, 'active', { data });
          break;
        }

        case SAVE_STEP: {
          const { step, types } = payload;
          // console.log('Stored active step and types');
          set(draft, 'step.active', step);
          set(draft, 'step.types', types);
          break;
        }

        case SAVE_DISPLAYED: {
          const { equipment } = payload;
          // console.log('Stored displayed equipment', equipment.name);
          set(draft, 'equipments.displayed', equipment);
          break;
        }


        case SAVE_LAST_RING_ADDED: {
          const ringToAdd = selectors.getRingToAdd(store);
          const nextRingToAdd = ringToAdd === 'Left' ? 'Right' : 'Left';
          // console.log('Stored next ring to add', nextRingToAdd);
          set(draft, 'stuff.ringToAdd', nextRingToAdd);
          break;
        }

        case SAVE_LAST_DOFUS_ADDED: {
          const dofusToAdd = selectors.getDofusToAdd(store);
          const nextDofusToAdd = dofusToAdd ? (dofusToAdd % 6) + 1 : 1;
          // console.log('Stored next dofus to add', nextDofusToAdd);
          set(draft, 'stuff.dofusToAdd', nextDofusToAdd);
          break;
        }

    }
    return draft;
  });
};
