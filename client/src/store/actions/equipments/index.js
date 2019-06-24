import deepEqual from 'lodash.isequal';
import get from 'lodash.get';

import { action } from '../../utils';
import { setDefaultStuffValues } from '../../utils/equipments';

import {
  SAVE_SOME,
  SAVE_IDS,
  SAVE_ACTIVE,
  SAVE_STEP,
  SAVE_DISPLAYED,
  SAVE_LAST_RING_ADDED,
  SAVE_LAST_DOFUS_ADDED
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
    if (currentData) return console.log('i already have it', currentData.name);

    try {
      dispatch(action({ type: SAVE_SOME, loading: true }));

      const equipment = await services.fetchOne({ id });
      if (!equipment) return;


      const data = { [equipment._id]: equipment }

      dispatch(action({ type: SAVE_SOME, loading: false, payload: { data } }));
    }
    catch (error) {
      console.error('Error when fetching and saving item #', id, error);
      return;
    }
}


export async function fetchSome({ ids }, [store, dispatch]) {
    if (selectors.areEquipmentsLoading(store)) return;
    const needed = ids.filter(id => !selectors.getEquipment(store, id)).length > 0
    if (!needed) return console.log('i already have all of it');

    try {
      dispatch(action({ type: SAVE_SOME, loading: true }));

      const data = {};
      const equipments = await services.fetchSome({ ids });

      for (let equipment of equipments) {
        data[equipment._id] = equipment;
      }

      dispatch(action({ type: SAVE_SOME, loading: false, payload: { data } }));
    }
    catch (error) {
      console.error('Error when fetching and saving item #', id, error);
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


export async function equip(equipment, [store, dispatch]) {
    if (!equipment) return;

    const stuff = selectors.getStuffActive(store);
    if (!stuff) return;

    const { _id, name: equipName, category: equipmentCategory } = equipment;
    const category = selectors.getActiveStep(store) || equipmentCategory;
    if (!category) return console.warn('No category found');
    if (get(stuff, `${[category]}._id`) === _id) return;

    try {

      console.log('EQUIP');

      const equipementToAdd = setDefaultStuffValues(equipment);

      // if (category === 'ring') {
      //   const ringToAdd = selectors.getRingToAdd(store);
      //   console.log(`ring${ringToAdd}`);
      //   stuff[`ring${ringToAdd}`] = equipementToAdd;
      //   dispatch(action({ type: SAVE_LAST_RING_ADDED }));
      // }
      //
      // else if (category === 'dofus' || category === 'trophy') {
      //   const dofusToAdd = selectors.getDofusToAdd(store);
      //   stuff[`dofus#${dofusToAdd}`] = equipementToAdd;
      //   dispatch(action({ type: SAVE_LAST_DOFUS_ADDED }));
      // }

      // else {
      stuff[category] = equipementToAdd;
      // }


      dispatch(action({ type: SAVE_ACTIVE, payload: { data: stuff } }));
    }
    catch (error) {
      dispatch(action({ type: SAVE_ACTIVE, payload: { error } }));
    }
};



export async function changeStep({ step, types = step }, [store, dispatch]) {
  if (!step) return;
  console.log('CHANGE STEP')

  dispatch(action({ type: SAVE_STEP, payload: { step, types } }));
}


export async function display({ equipment }, [store, dispatch]) {
  console.log('CHANGE DISPLAY', equipment)
  if (!equipment) return;

  dispatch(action({ type: SAVE_DISPLAYED, payload: { equipment } }));
}
