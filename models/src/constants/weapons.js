import { findKey, translateType, validate } from '../utils';

export const SWORD = 'Épée';
export const HAMMER = 'Marteau';
export const SCYTHE = 'Faux';
export const BOW = 'Arc';
export const AXE = 'Hache';
export const DAGGER = 'Dague';
export const PICKAXE = 'Pioche';
export const WAND = 'Baguette';
export const STAFF = 'Bâton';
export const SHOVEL = 'Pelle';
export const TOOL = 'Outil';
export const SOUL_STONE = 'Pierre d\'âme';

export const translations = {
  SWORD: {
    fr: 'épée',
    en: 'sword',
  },
  HAMMER: {
    fr: 'marteau',
    en: 'hammer',
  },
  SCYTHE: {
    fr: 'faux',
    en: 'scythe',
  },
  BOW: {
    fr: 'arc',
    en: 'bow',
  },
  AXE: {
    fr: 'hache',
    en: 'axe',
  },
  DAGGER: {
    fr: 'dague',
    en: 'dagger',
  },
  PICKAXE: {
    fr: 'pioche',
    en: 'pickaxe',
  },
  WAND: {
    fr: 'baguette',
    en: 'wand',
  },
  STAFF: {
    fr: 'bâton',
    en: 'staff',
  },
  SHOVEL: {
    fr: 'pelle',
    en: 'shovel',
  },
  TOOL: {
    fr: 'outil',
    en: 'tool',
  },
  SOUL_STONE: {
    fr: "pierre d'âme",
    en: 'soul stone',
  },
};

export const ENUM = Object.keys(translations);

export const getKey = (type) => findKey(type, translations);
export const translate = (type, lang) => translateType(type, translations, lang);

export const validateType = (type, translationName) => validate(type, translationName, translations);
