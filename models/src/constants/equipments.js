import { findKey, translatetype, validate } from '../utils';

export const HAT = 'Chapeau';
export const CLOAK = 'Cape';
export const AMULET = 'Amulette';
export const RING = 'Anneau';
export const BELT = 'Ceinture';
export const BOOTS = 'Bottes';
export const SHIELD = 'Bouclier';
export const DOFUS = 'Dofus';
export const TROPHY = 'Trophée';
export const CEREMONIAL = 'Objet d\'apparat';
export const BACKPACK = 'Sac à dos';
export const LIVING_OBJECT = 'Objet vivant';

export const translations = {
    HAT: {
      fr: 'chapeau',
      en: 'hat',
    },
    CLOAK: {
      fr: 'cape',
      en: 'cloak',
    },
    AMULET: {
      fr: 'amulette',
      en: 'amulet',
    },
    RING: {
      fr: 'anneau',
      en: 'ring',
    },
    BELT: {
      fr: 'ceinture',
      en: 'belt',
    },
    BOOTS: {
      fr: 'bottes',
      en: 'boots',
    },
    SHIELD: {
      fr: 'bouclier',
      en: 'shield',
    },
    DOFUS: {
      fr: 'dofus',
      en: 'dofus',
    },
    TROPHY: {
      fr: 'trophée',
      en: 'trophy',
    },
    CEREMONIAL: {
      fr: "objet d'apparat",
      en: 'ceremonial',
    },
    BACKPACK: {
      fr: 'sac à dos',
      en: 'backpack',
    },
    LIVING_OBJECT: {
      fr: 'objet vivant',
      en: 'living object',
    },
};

export const ENUM = Object.keys(translations);

export const getKey = (type) => findKey(type, translations);
export const translate = (type, lang) => translatetype(type, translations, lang);

export const validateType = (type, translationName) => validate(type, translationName, translations);
