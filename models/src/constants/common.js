import { findKey, translateType, validate } from '../utils';
import * as EQUIPMENTS from './equipments';
import * as MOUNTS from './mounts';
import * as PETS from './pets';
import * as WEAPONS from './weapons';


export const translations = {
  ...EQUIPMENTS.translations,
  ...MOUNTS.translations,
  ...PETS.translations,
  ...WEAPONS.translations,
};

export const ENUM = Object.keys(translations);

export const getKey = (type) => findKey(type, translations);
export const translate = (type, lang) => translateType(type, translations, lang);

export const validateType = (type, translationName) => validate(type, translationName, translations);
