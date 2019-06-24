// PRIMARY
export const AP             = 'PA';
export const MP             = 'PM';
export const RANGE          = 'Portée';

export const VITALITY       = 'Vitalité';
export const STRENGTH       = 'Force';
export const AGILITY        = 'Agilité';
export const INTELLIGENCE   = 'Intelligence';
export const CHANCE         = 'Chance';
export const WISDOM         = 'Sagesse';
export const PUISSANCE      = 'Puissance';

export const CRITICAL       = '% Critique';
export const SUMMONS        = 'Invocations';


// DAMAGES
export const DAMAGE           = 'Dommages';
export const NEUTRAL_DAMAGE   = 'Dommages Neutre';
export const EARTH_DAMAGE     = 'Dommages Terre';
export const AIR_DAMAGE       = 'Dommages Air';
export const FIRE_DAMAGE      = 'Dommages Feu';
export const WATER_DAMAGE     = 'Dommages Eau';

export const CRITICAL_DAMAGE  = 'Dommages Critiques';
export const PUSHBACK_DAMAGE  = 'Dommages Poussée';


// RESISTANCES
export const NEUTRAL_RESISTANCE   = '% Résistance Neutre';
export const EARTH_RESISTANCE     = '% Résistance Terre';
export const AIR_RESISTANCE       = '% Résistance Air';
export const FIRE_RESISTANCE      = '% Résistance Feu';
export const WATER_RESISTANCE     = '% Résistance Eau';

// TODO: RES FIXES !!



export const CRITICAL_RESISTANCE  = 'Résistance Critiques';
export const PUSHBACK_RESISTANCE  = 'Résistance Poussée';


// SECONDARY
export const INITIATIVE           = 'Initiative';

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



const PRIMARY_STATS = {
  [AP]:           'PA.png',
  [MP]:           'PM.png',
  [RANGE]:        'PO.png',
  [VITALITY]:     'vitalite.png',
  [STRENGTH]:     'terre.png',
  [AGILITY]:      'air.png',
  [INTELLIGENCE]: 'feu.png',
  [CHANCE]:       'eau.png',
  [WISDOM]:       'sagesse.png',
  [PUISSANCE]:    'puissance.png',
  [CRITICAL]:     'crit.png',
  [SUMMONS]:      'invocation.png',
}

const DAMAGES_STATS = {
  [NEUTRAL_DAMAGE]:   'neutre.png',
  [EARTH_DAMAGE]:     'terre.png',
  [AIR_DAMAGE]:       'air.png',
  [FIRE_DAMAGE]:      'feu.png',
  [WATER_DAMAGE]:     'eau.png',
  [CRITICAL_DAMAGE]:  'dommage-crit.png',
  [PUSHBACK_DAMAGE]:  'dommage-poussee.png',
}

const RESISTANCES_STATS = {
  [NEUTRAL_RESISTANCE]:   'neutre.png',
  [EARTH_RESISTANCE]:     'terre.png',
  [AIR_RESISTANCE]:       'air.png',
  [FIRE_RESISTANCE]:      'feu.png',
  [WATER_RESISTANCE]:     'eau.png',
  [CRITICAL_RESISTANCE]:  'resistance-crit.png',
  [PUSHBACK_RESISTANCE]:  'resistance-poussee.png',
}

const SECONDARY_STATS = {
  [INITIATIVE]: 'initiative.png',
  [AP_PARRY]: 'esquive-pa.png',
  [MP_PARRY]: 'esquive-pm.png',
  [AP_REDUCTION]: 'retrait-pa.png',
  [MP_REDUCTION]: 'retrait-pm.png',
  [DODGE]: 'fuite.png',
  [LOCK]: 'tacle.png',
  [PROSPECTING]: 'prospection.png',
  [HEALS]: 'soin.png',
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
