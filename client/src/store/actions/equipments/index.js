import deepEqual from 'lodash.isequal';
import get from 'lodash.get';
import { DateTime } from 'luxon';

import { action } from '../../utils';
import { setDefaultStuffValues } from '../../utils/equipments';

import {
  SAVE_SOME,
  SAVE_IDS,

  SAVE_ACTIVE,

  SAVE_STEP,
  SAVE_DISPLAYED,

  SAVE_LAST_RING_ADDED,
  SAVE_LAST_DOFUS_ADDED,

  SAVE_STAT,
  SAVE_PARCHO,
} from '../../constants/equipments';

import * as selectors from '../../selectors/equipments';
import * as services from '../../../services/equipments';



export async function fetchEquipments(params = {}, [store, dispatch]) {
    const currentData = selectors.getEquipmentsIds(store, params);
    if (get(currentData, 'length') > 0) return;
    if (selectors.areEquipmentsIdsLoading(store, params)) return;

    try {
      dispatch(action({ type: SAVE_IDS, loading: true, payload: { params } }));
      dispatch(action({ type: SAVE_SOME, loading: true }));

      // step 1  // fetch from api
      const equipments = await services.fetchEquipments(params);

      const data = {};
      for (let equipment of equipments) {
        data[equipment._id] = equipment;
      }

      // step 2  // save equipments with _id as key
      dispatch(action({ type: SAVE_SOME, loading: false, payload: { data } }));

      // step 3  // save ids for current params
      dispatch(action({ type: SAVE_IDS, loading: false, payload: { params, data: equipments.map(equipment => equipment._id) } }));

    }
    catch (error) {
      dispatch(action({ type: SAVE_IDS, loading: false, payload: { error } }));
    }
};


export async function fetchOne({ id }, [store, dispatch]) {
    if (!id) return;
    const currentData = selectors.getEquipment(store, id);
    if (selectors.areEquipmentsLoading(store)) return;
    if (currentData) return;

    try {
      dispatch(action({ type: SAVE_SOME, loading: true }));

      const equipment = await services.fetchOne({ id });
      if (!equipment) return;


      const data = { [equipment._id]: equipment }

      dispatch(action({ type: SAVE_SOME, loading: false, payload: { data } }));

      return data;
    }
    catch (error) {
      console.error('Error when fetching and saving item #', id, error);
      return;
    }
}


export async function fetchSome({ ids }, [store, dispatch]) {
    if (selectors.areEquipmentsLoading(store)) return;
    const needed = ids.filter(id => !selectors.getEquipment(store, id)).length > 0
    if (!needed) return;

    try {
      dispatch(action({ type: SAVE_SOME, loading: true }));

      const data = {};
      const equipments = await services.fetchSome({ ids });

      for (let equipment of equipments) {
        data[equipment._id] = equipment;
      }

      dispatch(action({ type: SAVE_SOME, loading: false, payload: { data } }));

      return data;
    }
    catch (error) {
      console.error('Error when fetching and saving items', ids, error);
      return;
    }
}



export async function fetchStuffItems([store, dispatch]) {
    if (selectors.areEquipmentsLoading(store) || selectors.isStuffFullyFetched(store)) return;

    // for Each item of the stuff, need to fetch if doesn't have in equipments
    const stuff = selectors.getStuffActive(store);
    if (!stuff) return;

    try {
      const needed = [];
      for (let [key, equipment] of Object.entries(stuff)) {
        const equipId = get(equipment, '_id')
        if (!selectors.getEquipment(store, equipId)) {
          needed.push(equipId);
        }
      }
      if (needed.length > 0) {
        await fetchSome({ ids: needed }, [store, dispatch]);
      }
    }
    catch (error) {
        console.error('Got an error when fetch stuff equipments', error)
    }
}


export async function equip({ id, equipment } = {}, [store, dispatch]) {
    if (!equipment && !id) return;
    const toAddEquipment = equipment || selectors.getEquipment(store, id);

    const stuff = selectors.getStuffActive(store);
    if (!stuff) return;

    try {
      const { _id, name: equipName, category: equipmentCategory } = toAddEquipment;
      const activeStep = selectors.getActiveStep(store);
      const activeTypes = selectors.getActiveTypes(store);
      let category;
      if (!activeStep.match(equipmentCategory) && !activeTypes.match(equipmentCategory)) {
        // todo use "last ring added" and "last dofus added"
        if (equipmentCategory) {
          if (['hat', 'weapon', 'belt', 'amulet', 'boots', 'shield'].includes(equipmentCategory)) {
            category = equipmentCategory;
          }
          else if (['cloak', 'backpack'].includes(equipmentCategory)) {
            category = 'cloak';
          }
          else if (equipmentCategory === 'ring') {
            const ringToAdd = selectors.getRingToAdd(store);
            category = `ring${ringToAdd}`;
            dispatch(action({ type: SAVE_LAST_RING_ADDED }));
          }
          else if (['trophy', 'dofus'].includes(equipmentCategory)) {
            const dofusToAdd = selectors.getDofusToAdd(store);
            category = `dofus#${dofusToAdd}`;
            dispatch(action({ type: SAVE_LAST_DOFUS_ADDED }));
          }
        }
      }
      else {
        category = activeStep;
      }
      if (!category) return console.warn('No category found');
      if (get(stuff, `${[category]}._id`) === _id) return;

      const equipementToAdd = setDefaultStuffValues(equipment);

      stuff[category] = equipementToAdd;

      const idsOfItems = {};
      Object.entries(stuff).forEach(([category, item]) => {
        idsOfItems[category] = { _id: item._id }
      })


      dispatch(action({ type: SAVE_ACTIVE, payload: { data: stuff } }));
      document.cookie = `STUFF_DRAFT=${JSON.stringify(idsOfItems)}; expires=${DateTime.local().plus({ weeks: 1 }).toHTTP()}`;
    }
    catch (error) {
      dispatch(action({ type: SAVE_ACTIVE, payload: { error } }));
    }
};



export async function changeStep({ step, types = step }, [store, dispatch]) {
  console.log('CHANGE STEP', step, 'TYPES', types);
  if (step === undefined) return;
  // console.log('CHANGE STEP')

  dispatch(action({ type: SAVE_STEP, payload: { step, types } }));
}


export async function display({ id, equipment } = {}, [store, dispatch]) {
  let inStore = null;
  if (!equipment && id) {
    inStore = selectors.getEquipment(store, id);
    if (!inStore) {
      const data = await fetchOne({ id }, [store, dispatch]);
      inStore = get(data, id);
    }
  }
  const toAddEquipment = equipment || inStore;

  // console.log('CHANGE DISPLAY', equipment._id)
  dispatch(action({ type: SAVE_DISPLAYED, payload: { equipment: toAddEquipment } }));
}

export function setCharacStat({ name, value }, [store, dispatch]) {
  dispatch(action({ save: SAVE_STAT, payload: { name, value } }));
}

export function setParchoStat({ name, value }, [store, dispatch]) {
  dispatch(action({ save: SAVE_PARCHO, payload: { name, value } }));
}
