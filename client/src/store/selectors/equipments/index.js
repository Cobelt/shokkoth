import get from 'lodash.get';
import pickBy from 'lodash.pickby';
import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';

import { createKey } from '../../utils/equipments';

import { ALL } from '../../../constants/equipments';
import { VITALITY, WISDOM, STRENGTH, INTELLIGENCE, CHANCE, AGILITY } from '../../../constants/stats';


export const getStepSore = (store) => get(store, 'step');
export const getEquipmentsStore = (store) => get(store, 'equipments');
export const getStuffStore = store => get(store, 'stuff');
export const getStatStore = store => get(store, 'stat');


export const getRingToAdd = createSelector(getStuffStore, stuff => get(stuff, 'ringToAdd') || 'Left');
export const getDofusToAdd = createSelector(getStuffStore, stuff => get(stuff, 'dofusToAdd') || 1);


export const getActiveStep = createSelector(getStepSore, store => get(store, 'active') || '');
export const getActiveTypes = createSelector(getStepSore, store => get(store, 'types') || ALL);


export const getStuffActive = createSelector(getStuffStore, stuff => get(stuff, 'active'));


export const getDisplayedEquipment = createSelector(getEquipmentsStore, store => get(store, 'displayed'));


export const getCharacterStatsBase = createSelector(getStatStore, stat => get(stat, 'base') || { [VITALITY]: 0, [WISDOM]: 0, [STRENGTH]: 0, [INTELLIGENCE]: 0, [CHANCE]: 0, [AGILITY]: 0 });
export const getCharacterStatsParcho = createSelector(getStatStore, stat => get(stat, 'parcho') || { [VITALITY]: 100, [WISDOM]: 100, [STRENGTH]: 100, [INTELLIGENCE]: 100, [CHANCE]: 100, [AGILITY]: 100 });


export const areEquipmentsLoading = createSelector(getEquipmentsStore, store => get(store, 'loading'));
export const getAllEquipments = createSelector(getEquipmentsStore, store => get(store, 'data'));
export const getAllEquipmentsLength = createSelector(getAllEquipments, allEquipments => allEquipments && Object.keys(allEquipments).length);



export const getEquipmentsIds = (store, { page = 0, perPage = 100, ...params } = {}) => {
  const equipments = get(store, `search.${createKey(params)}.data`) || [];
  if (equipments.length <= 0) return equipments;

  const offset = Math.max(0, page * perPage - 1);
  return equipments.slice(offset, offset+perPage);
}
export const areEquipmentsIdsLoading = (store, params) => get(store, `search.${createKey(params)}.loading`)


// Get populated equip
export const getEquipment = (store, id) => get(getAllEquipments(store), id);
export const getEquipments = (store, params) => {
  const ids = getEquipmentsIds(store, params);
  const equipments = [];
  for (let id of ids) {
    const equipment = getEquipment(store, id);
    equipments.push(equipment);
  }
  return equipments;
}




// STUFF
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


// BONUSES
export const getCurrentSetsBonus = createSelector(getStuff, stuff => {
  const itemsPerSet = {};
  const sets = Object.values(stuff).map(equipment => ({ equipmentId: get(equipment, '_id'), set: get(equipment, 'set') })).filter(e => !!get(e, 'set'));
  sets.forEach(({ equipmentId, set }) => {
    const id = get(set, '_id');
    if (id) {
      if (!itemsPerSet[id]) {
        itemsPerSet[id] = { nbItems: 1, equiped: [equipmentId], set };
      }
      else {
        itemsPerSet[id].nbItems++;
        itemsPerSet[id].equiped.push(equipmentId);
      }
    }
  })
  return Object.values(itemsPerSet).filter(i => i.nbItems > 1);
});



// STATS
export const getCharacterStats = createSelector(getCharacterStatsBase, getCharacterStatsParcho, (base, parcho) => {
  const stats = {};
  Object.entries(base).forEach(([name, value]) => stats[name] = { base: value || 0, parcho: parcho[name] || 0 });
  return stats;
});
