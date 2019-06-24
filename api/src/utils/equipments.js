import memoize from 'lodash.memoize'

import { EquipmentsTypes, translateEquipmentsTypes } from '../constants/equipments';
import { PetsTypes } from '../constants/pets';
import { MountsTypes } from '../constants/mounts';
import { WeaponsTypes } from '../constants/weapons';

import { WEAPON, PET } from '../constants/categories';


export const toCategory = memoize((type) => {
  let toReturn;
  if (WeaponsTypes.includes(type)) {
    toReturn = WEAPON;
  }
  else if (MountsTypes.includes(type) || PetsTypes.includes(type)) {
    toReturn = PET;
  }
  else if (EquipmentsTypes.includes(type)) {
    const [key, value] = Object.entries(translateEquipmentsTypes).find(([key, value]) => type === value)
    if (key || value) toReturn = key;
  }
  return toReturn;
});
