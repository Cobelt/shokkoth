import { findKey, translatetype, validate } from '../utils';

export const MOUNT = 'Montures';

export const translations = {
  MOUNT: {
    fr: 'montures',
    en: 'mount',
  },
}

export const ENUM = Object.keys(translations);

export const getKey = (type) => findKey(type, translations);
export const translate = (type, lang) => translatetype(type, translations, lang);

export const validateType = (type, translationName) => validate(type, translationName, translations);
