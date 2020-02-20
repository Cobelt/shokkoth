import get from 'lodash.get';
import pick from 'lodash.pick';
import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';

import { createKey } from '../../../utils';


export const getAllCharacters = store => get(store, 'characters.all.data');
export const getAllStuffs = store => get(store, 'stuffs.all.data');
export const getAllEquipments = store => get(store, 'equipments.all.data');

export const getMyCharactersIds = store => get(store, 'characters.mines');

export const getMyCharacters = createSelector(
  getAllCharacters,
  getMyCharactersIds,
  (allCharacters, myCharacterIds) => console.log(allCharacters, myCharacterIds) || pick(allCharacters, myCharacterIds) || [],
);
