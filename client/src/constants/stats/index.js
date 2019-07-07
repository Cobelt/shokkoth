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

export const OTHERS_PRIMARY_STATS = {
  [VITALITY]:     'vitalite.png',
  [SUMMONS]:      'invocation.png',
  [CRITICAL]:     'crit.png',
  [INITIATIVE]:   'initiative.png',
  [PUISSANCE]:    'puissance.png',
  [WISDOM]:       'sagesse.png',
}


// DAMAGES
export const ELEMENTS_DAMAGES = {
  [NEUTRAL_DAMAGE]:   'neutre.png',
  [EARTH_DAMAGE]:     'terre.png',
  [FIRE_DAMAGE]:      'feu.png',
  [WATER_DAMAGE]:     'eau.png',
  [AIR_DAMAGE]:       'air.png',
}

export const OTHERS_DAMAGES = {
  [DAMAGE]:           'dommage.png',
  [CRITICAL_DAMAGE]:  'dommage-crit.png',
  [PUSHBACK_DAMAGE]:  'dommage-poussee.png',
  [MELEE_DAMAGE]:     'arme.png',
  [RANGED_DAMAGE]:    'arme.png',
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


export const OTHERS_RES = {
  [CRITICAL_RESISTANCE]:  'resistance-crit.png',
  [PUSHBACK_RESISTANCE]:  'resistance-poussee.png',
  [MELEE_RESISTANCE]:     'passif.png',
  [RANGED_RESISTANCE]:    'passif.png',
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





export const PRIMARY_STATS = {
  ...ESSENTIAL_STATS,
  ...OTHERS_PRIMARY_STATS,
  ...ELEMENTS_STATS,
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
