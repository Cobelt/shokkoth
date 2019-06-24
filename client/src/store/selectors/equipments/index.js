import get from 'lodash.get';
import pickBy from 'lodash.pickby';
import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';

import { createKey } from '../../utils/equipments';

import { ALL } from '../../../constants/equipments';


export const getStepSore = (store) => get(store, 'step');
export const getEquipmentsStore = (store) => get(store, 'equipments');



export const getActiveStep = createSelector(getStepSore, store => get(store, 'active') || '');
export const getActiveTypes = createSelector(getStepSore, store => get(store, 'types') || ALL);



export const areEquipmentsLoading = createSelector(getEquipmentsStore, store => get(store, 'loading'));
export const getAllEquipments = createSelector(getEquipmentsStore, store => get(store, 'data'));
export const getAllEquipmentsLength = createSelector(getAllEquipments, allEquipments => allEquipments && Object.keys(allEquipments).length);



export const getEquipmentsIds = (store, { page = 0, perPage = 100, types, order, lvlMin, lvlMax } = {}) => {
  const equipments = get(store, `search.${createKey({ types, order, lvlMin, lvlMax })}.data`) || [];
  if (equipments.length <= 0) return equipments;

  const offset = Math.max(0, page * perPage - 1);
  return equipments.slice(offset, offset+perPage);
}
export const areEquipmentsIdsLoading = (store, { types, order, lvlMin, lvlMax } = {}) => get(store, `search.${createKey({ types, order, lvlMin, lvlMax })}.loading`)


// Get populated equip
export const getEquipment = (store, id) => get(getAllEquipments(store), id);
export const getEquipments = (store, params) => {
  const ids = getEquipmentsIds(store, params);
  const equipments = [];
  for (let id of ids) {
    const equipment = getEquipment(store, id)
    equipments.push(equipment);
  }
  return equipments;
}

// get displayed equip
export const getDisplayedEquipment = createSelector(getEquipmentsStore, store => get(store, 'displayed'));



export const getStuffStore = store => get(store, 'stuff');
export const getStuffActive = createSelector(getStuffStore, stuff => get(stuff, 'active'));

export const getStuff = memoize((store) => {
  const stuff = getStuffActive(store);
  const populatedStuff = {};
  for (let [key, object] of Object.entries(stuff)) {
    populatedStuff[key] = getEquipment(store, object._id) || undefined;
  }
  return populatedStuff;
});

export const isStuffFullyFetched = createSelector(
  getStuffActive,
  getStuff,
  (stuffIds, populatedStuff) => {
    if (!pickBy(stuffIds) || !pickBy(populatedStuff)) return;
    return Object.keys(pickBy(stuffIds)).length === Object.keys(pickBy(populatedStuff)).length
  }
);

export const getStuffEquipment = (store, category) => {
  const stuff = getStuff(store);
  if (!stuff || stuff === {}) return;
  return stuff[category];
}


export const getRingToAdd = createSelector(getStuffStore, stuff => get(stuff, 'ringToAdd') || 'Left');
export const getDofusToAdd = createSelector(getStuffStore, stuff => get(stuff, 'dofusToAdd') || 1);
