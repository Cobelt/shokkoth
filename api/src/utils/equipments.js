import memoize from 'lodash.memoize'

import { COMMON, WEAPONS, PETS, MOUNTS, EQUIPMENTS } from 'shokkoth-models';

import { WEAPON, PET } from '../constants/categories';


export const getRealType = memoize((type) => {
  return COMMON.getKey(type)
});


export const toCategory = memoize((type) => {
  let toReturn;
  if (WEAPONS.getKey(type)) {
    toReturn = WEAPON;
  }
  else if (MOUNTS.getKey(type) || PETS.getKey(type)) {
    toReturn = PET;
  }
  else if (EQUIPMENTS.getKey(type) === EQUIPMENTS.getKey('trophy')) {
    toReturn = EQUIPMENTS.translations.DOFUS.en;
  }
  else if (EQUIPMENTS.getKey(type)) {
    toReturn = EQUIPMENTS.translate(type, 'en');
  }
  return toReturn;
});
