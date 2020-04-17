import { findKey, translateType, validate } from './utils';

// PRIMARY
export const AP             = 'PA';
export const MP             = 'PM';
export const RANGE          = 'Portée';

export const SUMMONS        = 'Invocations';
export const CRITICAL       = '% Critique';
export const INITIATIVE     = 'Initiative';

export const VITALITY       = 'Vitalité';
export const STRENGTH       = 'Force';
export const AGILITY        = 'Agilité';
export const INTELLIGENCE   = 'Intelligence';
export const CHANCE         = 'Chance';
export const WISDOM         = 'Sagesse';
export const PUISSANCE      = 'Puissance';



// DAMAGES
export const DAMAGE           = 'Dommages';
export const NEUTRAL_DAMAGE   = 'Dommages Neutre';
export const EARTH_DAMAGE     = 'Dommages Terre';
export const AIR_DAMAGE       = 'Dommages Air';
export const FIRE_DAMAGE      = 'Dommages Feu';
export const WATER_DAMAGE     = 'Dommages Eau';

export const MELEE_DAMAGE     = '% Dommages mêlée';
export const RANGED_DAMAGE    = '% Dommages distance';

export const CRITICAL_DAMAGE  = 'Dommages Critiques';
export const PUSHBACK_DAMAGE  = 'Dommages Poussée';



// RESISTANCES
export const NEUTRAL_RESISTANCE   = '% Résistance Neutre';
export const EARTH_RESISTANCE     = '% Résistance Terre';
export const FIRE_RESISTANCE      = '% Résistance Feu';
export const WATER_RESISTANCE     = '% Résistance Eau';
export const AIR_RESISTANCE       = '% Résistance Air';

export const NEUTRAL_STATIC_RESISTANCE   = 'Résistance Neutre';
export const EARTH_STATIC_RESISTANCE     = 'Résistance Terre';
export const FIRE_STATIC_RESISTANCE      = 'Résistance Feu';
export const WATER_STATIC_RESISTANCE     = 'Résistance Eau';
export const AIR_STATIC_RESISTANCE       = 'Résistance Air';

export const MELEE_RESISTANCE     = '% Résistance mêlée';
export const RANGED_RESISTANCE    = '% Résistance distance';

export const CRITICAL_RESISTANCE  = 'Résistance Critiques';
export const PUSHBACK_RESISTANCE  = 'Résistance Poussée';



// SECONDARY
export const AP_PARRY             = 'Esquive PA';
export const MP_PARRY             = 'Esquive PM';

export const AP_REDUCTION         = 'Retrait PA';
export const MP_REDUCTION         = 'Retrait PM';

export const DODGE                = 'Fuite';
export const LOCK                 = 'Tacle';

export const PROSPECTING          = 'Prospection';

export const HEALS                = 'Soins';



// WEAPONS DAMAGES
export const WEAPONS_NEUTRAL_DAMAGES  = 'dommages Neutre';
export const WEAPONS_EARTH_DAMAGES    = 'dommages Terre';
export const WEAPONS_AIR_DAMAGES      = 'dommages Air';
export const WEAPONS_FIRE_DAMAGES     = 'dommages Feu';
export const WEAPONS_WATER_DAMAGES    = 'dommages Eau';

export const WEAPONS_NEUTRAL_STEAL    = 'vol Neutre';
export const WEAPONS_EARTH_STEAL      = 'vol Terre';
export const WEAPONS_AIR_STEAL        = 'vol Air';
export const WEAPONS_FIRE_STEAL       = 'vol Feu';
export const WEAPONS_WATER_STEAL      = 'vol Eau';

export const WEAPONS_HEAL             = 'PV rendus';

export const WEAPONS_CRITICAL         = '% Critique (base)';
export const WEAPONS_NO_CRITICAL      = 'Pas de critique possible';
export const WEAPONS_CRIT_DAMAGES     = 'Dommages bonus (CC)';

export const translations = {
  AP: {
    fr: AP,
    short: AP,
    imgUrl: '.png',
  },
  MP: {
    fr: MP,
    short: MP,
    imgUrl: '.png',
  },
  RANGE: {
    fr: RANGE,
    short: 'PO',
    imgUrl: '.png',
  },
  SUMMONS: {
    fr: SUMMONS,
    short: 'Invo',
    imgUrl: '.png',
  },
  CRITICAL: {
    fr: CRITICAL,
    short: 'CC',
    imgUrl: '.png',
  },
  INITIATIVE: {
    fr: INITIATIVE,
    short: 'Ini',
    imgUrl: '.png',
  },
  VITALITY: {
    fr: VITALITY,
    short: 'PV',
    imgUrl: '.png',
  },
  STRENGTH: {
    fr: STRENGTH,
    short: STRENGTH,
    imgUrl: '.png',
  },
  AGILITY: {
    fr: AGILITY,
    short: 'Agi',
    imgUrl: '.png',
  },
  INTELLIGENCE: {
    fr: INTELLIGENCE,
    short: 'Intel',
    imgUrl: '.png',
  },
  CHANCE: {
    fr: CHANCE,
    short: CHANCE,
    imgUrl: '.png',
  },
  WISDOM: {
    fr: WISDOM,
    short: 'Sasa',
    imgUrl: '.png',
  },
  PUISSANCE: {
    fr: PUISSANCE,
    short: 'puiss',
    imgUrl: '.png',
  },
  DAMAGE: {
    fr: DAMAGE,
    short: 'Do',
    imgUrl: '.png',
  },
  NEUTRAL_DAMAGE: {
    fr: NEUTRAL_DAMAGE,
    short: 'Do neutre',
    imgUrl: '.png',
  },
  EARTH_DAMAGE: {
    fr: EARTH_DAMAGE,
    short: 'Do terre',
    imgUrl: '.png',
  },
  AIR_DAMAGE: {
    fr: AIR_DAMAGE,
    short: 'Do air',
    imgUrl: '.png',
  },
  FIRE_DAMAGE: {
    fr: FIRE_DAMAGE,
    short: 'Do feu',
    imgUrl: '.png',
  },
  WATER_DAMAGE: {
    fr: WATER_DAMAGE,
    short: 'Do eau',
    imgUrl: '.png',
  },
  MELEE_DAMAGE: {
    fr: MELEE_DAMAGE,
    short: '% Do mêlée',
    imgUrl: '.png',
  },
  RANGED_DAMAGE: {
    fr: RANGED_DAMAGE,
    short: '% Do dist',
    imgUrl: '.png',
  },
  CRITICAL_DAMAGE: {
    fr: CRITICAL_DAMAGE,
    short: 'Do crit',
    imgUrl: '.png',
  },
  PUSHBACK_DAMAGE: {
    fr: PUSHBACK_DAMAGE,
    short: 'Do pou',
    imgUrl: '.png',
  },
  NEUTRAL_RESISTANCE: {
    fr: NEUTRAL_RESISTANCE,
    short: '% Res neutre',
    imgUrl: '.png',
  },
  EARTH_RESISTANCE: {
    fr: EARTH_RESISTANCE,
    short: '% Res terre',
    imgUrl: '.png',
  },
  FIRE_RESISTANCE: {
    fr: FIRE_RESISTANCE,
    short: '% Res feu',
    imgUrl: '.png',
  },
  WATER_RESISTANCE: {
    fr: WATER_RESISTANCE,
    short: '% Res eau',
    imgUrl: '.png',
  },
  AIR_RESISTANCE: {
    fr: AIR_RESISTANCE,
    short: '% Res air',
    imgUrl: '.png',
  },
  NEUTRAL_STATIC_RESISTANCE: {
    fr: NEUTRAL_STATIC_RESISTANCE,
    short: 'Ré neutre',
    imgUrl: '.png',
  },
  EARTH_STATIC_RESISTANCE: {
    fr: EARTH_STATIC_RESISTANCE,
    short: 'Ré terre',
    imgUrl: '.png',
  },
  FIRE_STATIC_RESISTANCE: {
    fr: FIRE_STATIC_RESISTANCE,
    short: 'Ré feu',
    imgUrl: '.png',
  },
  WATER_STATIC_RESISTANCE: {
    fr: WATER_STATIC_RESISTANCE,
    short: 'Ré eau',
    imgUrl: '.png',
  },
  AIR_STATIC_RESISTANCE: {
    fr: AIR_STATIC_RESISTANCE,
    short: 'Ré air',
    imgUrl: '.png',
  },
  MELEE_RESISTANCE: {
    fr: MELEE_RESISTANCE,
    short: '% Res mélée',
    imgUrl: '.png',
  },
  RANGED_RESISTANCE: {
    fr: RANGED_RESISTANCE,
    short: '% Res dist',
    imgUrl: '.png',
  },
  CRITICAL_RESISTANCE: {
    fr: CRITICAL_RESISTANCE,
    short: 'Ré crit',
    imgUrl: '.png',
  },
  PUSHBACK_RESISTANCE: {
    fr: PUSHBACK_RESISTANCE,
    short: 'Ré pou',
    imgUrl: '.png',
  },
  AP_PARRY: {
    fr: AP_PARRY,
    short: AP_PARRY,
    imgUrl: '.png',
  },
  MP_PARRY: {
    fr: MP_PARRY,
    short: MP_PARRY,
    imgUrl: '.png',
  },
  AP_REDUCTION: {
    fr: AP_REDUCTION,
    short: 'Ret PA',
    imgUrl: '.png',
  },
  MP_REDUCTION: {
    fr: MP_REDUCTION,
    short: 'Ret PM',
    imgUrl: '.png',
  },
  DODGE: {
    fr: DODGE,
    short: DODGE,
    imgUrl: '.png',
  },
  LOCK: {
    fr: LOCK,
    short: LOCK,
    imgUrl: '.png',
  },
  PROSPECTING: {
    fr: PROSPECTING,
    short: 'PP',
    imgUrl: '.png',
  },
  HEALS: {
    fr: HEALS,
    short: HEALS,
    imgUrl: '.png',
  },
  WEAPONS_NEUTRAL_DAMAGES: {
    fr: WEAPONS_NEUTRAL_DAMAGES,
    short: '(Do neutre)',
    imgUrl: '.png',
  },
  WEAPONS_EARTH_DAMAGES: {
    fr: WEAPONS_EARTH_DAMAGES,
    short: '(Do terre)',
    imgUrl: '.png',
  },
  WEAPONS_AIR_DAMAGES: {
    fr: WEAPONS_AIR_DAMAGES,
    short: '(Do air)',
    imgUrl: '.png',
  },
  WEAPONS_FIRE_DAMAGES: {
    fr: WEAPONS_FIRE_DAMAGES,
    short: '(Do feu)',
    imgUrl: '.png',
  },
  WEAPONS_WATER_DAMAGES: {
    fr: WEAPONS_WATER_DAMAGES,
    short: '(Do eau)',
    imgUrl: '.png',
  },
  WEAPONS_NEUTRAL_STEAL: {
    fr: WEAPONS_NEUTRAL_STEAL,
    short: '(Vol neutre)',
    imgUrl: '.png',
  },
  WEAPONS_EARTH_STEAL: {
    fr: WEAPONS_EARTH_STEAL,
    short: '(Vol terre)',
    imgUrl: '.png',
  },
  WEAPONS_AIR_STEAL: {
    fr: WEAPONS_AIR_STEAL,
    short: '(Vol air)',
    imgUrl: '.png',
  },
  WEAPONS_FIRE_STEAL: {
    fr: WEAPONS_FIRE_STEAL,
    short: '(Vol feu)',
    imgUrl: '.png',
  },
  WEAPONS_WATER_STEAL: {
    fr: WEAPONS_WATER_STEAL,
    short: '(Vol eau)',
    imgUrl: '.png',
  },
  WEAPONS_HEAL: {
    fr: WEAPONS_HEAL,
    short: '(PV rendus)',
    imgUrl: '.png',
  },
  WEAPONS_CRITICAL: {
    fr: WEAPONS_CRITICAL,
    short: '%CC (base)',
    imgUrl: '.png',
  },
  WEAPONS_NO_CRITICAL: {
    fr: WEAPONS_NO_CRITICAL,
    short: 'Pas de crit',
    imgUrl: '.png',
  },
  WEAPONS_CRIT_DAMAGES: {
    fr: WEAPONS_CRIT_DAMAGES,
    short: 'Do bonus (CC)',
    imgUrl: '.png',
  },
}


// PRIMARY
export const ESSENTIAL_STATS = {
  [AP]:           'PA.png',
  [MP]:           'PM.png',
  [RANGE]:        'PO.png',
}

export const ELEMENTS_STATS = {
  [STRENGTH]:     'terre.png',
  [INTELLIGENCE]: 'feu.png',
  [CHANCE]:       'eau.png',
  [AGILITY]:      'air.png',
}

export const OTHERS_ELEMENTS_STATS = {
  [VITALITY]:     'vitalite.png',
  [PUISSANCE]:    'puissance.png',
  [WISDOM]:       'sagesse.png',
}

export const OTHERS_PRIMARY_STATS = {
  [SUMMONS]:      'invocation.png',
  [CRITICAL]:     'crit.png',
  [INITIATIVE]:   'initiative.png',
}


// DAMAGES
export const ELEMENTS_DAMAGES = {
  [NEUTRAL_DAMAGE]:   'neutre.png',
  [EARTH_DAMAGE]:     'terre.png',
  [FIRE_DAMAGE]:      'feu.png',
  [WATER_DAMAGE]:     'eau.png',
  [AIR_DAMAGE]:       'air.png',
}

export const MELEE_RANGED_DAMAGES = {
  [MELEE_DAMAGE]:     'arme.png',
  [RANGED_DAMAGE]:    'arme.png',
}

export const OTHERS_DAMAGES = {
  [DAMAGE]:           'dommage.png',
  [CRITICAL_DAMAGE]:  'dommage-crit.png',
  [PUSHBACK_DAMAGE]:  'dommage-poussee.png',
  ...MELEE_RANGED_DAMAGES
}


// RESISTANCES
export const PERCENTS_RES_STATS = {
  [NEUTRAL_RESISTANCE]:   'neutre.png',
  [EARTH_RESISTANCE]:     'terre.png',
  [FIRE_RESISTANCE]:      'feu.png',
  [WATER_RESISTANCE]:     'eau.png',
  [AIR_RESISTANCE]:       'air.png',
}


export const STATIC_RES_STATS = {
  [NEUTRAL_STATIC_RESISTANCE]:   'neutre.png',
  [EARTH_STATIC_RESISTANCE]:     'terre.png',
  [FIRE_STATIC_RESISTANCE]:      'feu.png',
  [WATER_STATIC_RESISTANCE]:     'eau.png',
  [AIR_STATIC_RESISTANCE]:       'air.png',
}

export const RES_STATS = {
  NEUTRAL: {
    PERCENT: NEUTRAL_RESISTANCE,  
    STATIC: NEUTRAL_STATIC_RESISTANCE,
  },
  EARTH: {
    PERCENT: EARTH_RESISTANCE,
    STATIC: EARTH_STATIC_RESISTANCE,
  },
  FIRE: {
    PERCENT: FIRE_RESISTANCE,
    STATIC: FIRE_STATIC_RESISTANCE,
  },
  WATER: {
    PERCENT: WATER_RESISTANCE,
    STATIC: WATER_STATIC_RESISTANCE,
  },
  AIR: {
    PERCENT: AIR_RESISTANCE,
    STATIC: AIR_STATIC_RESISTANCE,
  }
}

export const MELEE_RANGED_RES = {
  [MELEE_RESISTANCE]:     'passif.png',
  [RANGED_RESISTANCE]:    'passif.png',
}

export const OTHERS_RES = {
  [CRITICAL_RESISTANCE]:  'resistance-crit.png',
  [PUSHBACK_RESISTANCE]:  'resistance-poussee.png',
  ...MELEE_RANGED_RES
}




// SECONDARY
export const ESCAPE_STATS = {
  [DODGE]:          'fuite.png',
  [LOCK]:           'tacle.png',
}

export const AP_MP_PARRY = {
  [AP_PARRY]:       'esquive-pa.png',
  [MP_PARRY]:       'esquive-pm.png',
}

export const AP_MP_REDUCTION = {
  [AP_REDUCTION]:   'retrait-pa.png',
  [MP_REDUCTION]:   'retrait-pm.png',
}

export const OTHERS_SECONDARY = {
  [PROSPECTING]:    'prospection.png',
  [HEALS]:          'soin.png',
}





export const BOOSTABLE_STATS = {
  [VITALITY]: OTHERS_ELEMENTS_STATS[VITALITY],
  [WISDOM]: OTHERS_ELEMENTS_STATS[WISDOM],
  ...ELEMENTS_STATS,
}

export const PRIMARY_STATS = {
  ...ESSENTIAL_STATS,
  ...ELEMENTS_STATS,
  ...OTHERS_ELEMENTS_STATS,
  ...OTHERS_PRIMARY_STATS,
}


export const DAMAGES_STATS = {
  ...ELEMENTS_DAMAGES,
  ...OTHERS_DAMAGES,
}


export const RESISTANCES_STATS = {
  ...PERCENTS_RES_STATS,
  ...STATIC_RES_STATS,
  ...OTHERS_RES,
}

export const SECONDARY_STATS = {
  ...ESCAPE_STATS,
  ...AP_MP_PARRY,
  ...AP_MP_REDUCTION,
  ...OTHERS_SECONDARY,
}



export const STATS = {
  ...PRIMARY_STATS,
  ...DAMAGES_STATS,
  ...RESISTANCES_STATS,
  ...SECONDARY_STATS,
}



export const WEAPONS_CHARACTERISTICS = {
  [WEAPONS_NEUTRAL_DAMAGES]: {
    imgUrl: 'neutre.png',
    shortType: 'do',
  },
  [WEAPONS_EARTH_DAMAGES]: {
    imgUrl: 'terre.png',
    shortType: 'do',
  },
  [WEAPONS_AIR_DAMAGES]: {
    imgUrl: 'air.png',
    shortType: 'do',
  },
  [WEAPONS_FIRE_DAMAGES]: {
    imgUrl: 'feu.png',
    shortType: 'do',
  },
  [WEAPONS_WATER_DAMAGES]: {
    imgUrl: 'eau.png',
    shortType: 'do',
  },

  [WEAPONS_NEUTRAL_STEAL]: {
    imgUrl: 'neutre.png',
    shortType: 'vol',
  },
  [WEAPONS_EARTH_STEAL]: {
    imgUrl: 'terre.png',
    shortType: 'vol',
  },
  [WEAPONS_AIR_STEAL]: {
    imgUrl: 'air.png',
    shortType: 'vol',
  },
  [WEAPONS_FIRE_STEAL]: {
    imgUrl: 'feu.png',
    shortType: 'vol',
  },
  [WEAPONS_WATER_STEAL]: {
    imgUrl: 'eau.png',
    shortType: 'vol',
  },

  [WEAPONS_HEAL]: {
    imgUrl: 'pv-rendus.png',
    shortType: 'heal',
  },

  [WEAPONS_CRITICAL]: {
    imgUrl: 'crit.png',
    shortType: '%CC',
  },
  [WEAPONS_NO_CRITICAL]: {
    imgUrl: 'crit.png',
    shortType: 'No CC',
  },
  [WEAPONS_CRIT_DAMAGES]: {
    imgUrl: 'dommage-crit.png',
    shortType: 'do',
  },
}

export const SHIELD_CHARACTERISTICS = {
  [RANGE]:        'PO.png',
  [CRITICAL]:     'crit.png',
  [PUISSANCE]:    'puissance.png',
  [CRITICAL_DAMAGE]:  'dommage-crit.png',
  [PUSHBACK_DAMAGE]:  'dommage-poussee.png',
  ...MELEE_RANGED_DAMAGES,
  ...OTHERS_RES,
  ...PERCENTS_RES_STATS
}

export const STATS_TYPE = {
  BASE: 'baseStat.png',
  PARCHO: {
    'all': 'parchoStat.png',
    [VITALITY]: 'parchoVitality.png',
    [AGILITY]: 'parchoAgility.png',
    [CHANCE]: 'parchoChance.png',
    [STRENGTH]: 'parchoStrength.png',
    [INTELLIGENCE]: 'parchoIntelligence.png',
    [WISDOM]: 'parchoWisdom.png',
  },
  EQUIPMENT: 'equipmentStat.png',
}

export const DEFAULT_STATE = 'DEFAULT'
export const WEAPON_STATE = 'WEAPON'
export const SHIELD_STATE = 'SHIELD'
export const DOFUS_STATE = 'DOFUS'

export const SEARCH_BUTTONS = {
  [DEFAULT_STATE]: {
    ...PRIMARY_STATS,
  },
  [WEAPON_STATE]: {
    ...WEAPONS_CHARACTERISTICS,
  },
  [SHIELD_STATE]: {
    ...SHIELD_CHARACTERISTICS,
  },
  [DOFUS_STATE]: {
    ...PRIMARY_STATS,
  },
}


export const ENUM = Object.keys(translations);

export const getKey = (stat) => findKey(stat, translations);
export const translate = (stat, lang) => translateType(stat, translations, lang);

export const validateType = (stat, translationName) => validate(stat, translationName, translations);
