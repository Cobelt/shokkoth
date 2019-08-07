import { findKey, translateType, validate } from '../utils';

export const PET = 'Familier';
export const PETSMOUNT = 'Montilier';

export const translations = {
  PET: {
    fr: 'familier',
    en: 'pet',
  },
  PETSMOUNT: {
    fr: 'montilier',
    en: 'petsmount',
  },
};

export const ENUM = Object.keys(translations);

export const getKey = (type) => findKey(type, translations);
export const translate = (type, lang) => translateType(type, translations, lang);

export const validateType = (type, translationName) => validate(type, translationName, translations);
