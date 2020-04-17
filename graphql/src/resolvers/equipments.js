import set from 'lodash.set';
import get from 'lodash.get';
import { WEAPONS } from 'shokkoth-constants';

import { Equipments } from '../models';
import { getLocale } from '../utils';
import { adminAccess, generateHash, comparePassword } from '../utils/auth';


export const setFilterType = (rp, type) => {
  return set(rp, 'args.filter.type', type);
}

export const setFilterTypes = (rp, types) => {
  return set(rp, 'args.filter.type', { $in: [types].flat() });
}

export const hatOnly = next => rp => next(setFilterType(rp, 'HAT'));
export const amuletOnly = next => rp => next(setFilterType(rp, 'AMULET'));
export const beltOnly = next => rp => next(setFilterType(rp, 'BELT'));
export const bootsOnly = next => rp => next(setFilterType(rp, 'BOOTS'));
export const ringOnly = next => rp => next(setFilterType(rp, 'RING'));
export const shieldOnly = next => rp => next(setFilterType(rp, 'SHIELD'));
export const cloakOnly = next => rp => next(setFilterType(rp, 'CLOAK'));
export const backpackOnly = next => rp => next(setFilterType(rp, 'BACKPACK'));
export const dofusOnly = next => rp => next(setFilterType(rp, 'DOFUS'));
export const trophyOnly = next => rp => next(setFilterType(rp, 'TROPHY'));
export const petOnly = next => rp => next(setFilterType(rp, 'PET'));
export const petsmountOnly = next => rp => next(setFilterType(rp, 'PETSMOUNT'));
export const mountOnly = next => rp => next(setFilterType(rp, 'MOUNT'));

export const dofusAndTrophies = next => rp => next(setFilterTypes(rp, ['DOFUS', 'TROPHY']));
export const backOnly = next => rp => next(setFilterTypes(rp, ['CLOAK', 'BACKPACK']));
export const weaponsOnly = next => rp => next(setFilterTypes(rp, WEAPONS.ENUM));
