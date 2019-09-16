import React, { useState, useMemo, useReducer, useContext, useEffect } from 'react';
import get from 'lodash.get';

import EquipmentsContext from '../../store/context/equipments';

import * as selectors from '../../store/selectors/equipments';
import * as actions from '../../store/actions/equipments';

import {
  BOOSTABLE_STATS,
  OTHERS_PRIMARY_STATS,

  ELEMENTS_DAMAGES,
  OTHERS_DAMAGES,

  SECONDARY_STATS,
  RESISTANCES_STATS,

  MELEE_DAMAGE,
  MELEE_RESISTANCE,

  RANGED_DAMAGE,
  RANGED_RESISTANCE,

  PERCENTS_RES_STATS,
  STATIC_RES_STATS,
  OTHERS_RES,
} from '../../constants/stats';

import StatsLine from './StatsLine';


import './stylesheet.styl';


const suffixForResistance = currentStat => {
  if ([MELEE_RESISTANCE, RANGED_RESISTANCE, ...Object.keys(PERCENTS_RES_STATS)].includes(currentStat)) {
    return '%';
  }
}

const suffixForDamages = currentStat => {
  if ([MELEE_DAMAGE, RANGED_DAMAGE].includes(currentStat)) {
    return '%';
  }
}



const CharacterStats = (otherProps) => {
    const [store, dispatch] = useContext(EquipmentsContext);
    const stats = selectors.getStats(store);


    return (
      <>
        <StatsLine style={{ flex: Object.keys(BOOSTABLE_STATS).length }} statsData={BOOSTABLE_STATS} statsValues={stats} data-title="Stats élémentaires" {...otherProps} />
        <StatsLine style={{ flex: Object.keys(OTHERS_PRIMARY_STATS).length }} statsData={OTHERS_PRIMARY_STATS} statsValues={stats} data-title="Stats primaires" {...otherProps} />

        <StatsLine style={{ flex: Object.keys(ELEMENTS_DAMAGES).length }} statsData={ELEMENTS_DAMAGES} statsValues={stats} data-title="Dommages élémentaires" {...otherProps} />
        <StatsLine style={{ flex: Object.keys(OTHERS_DAMAGES).length }} statsData={OTHERS_DAMAGES} statsValues={stats} suffix={suffixForDamages} data-title="Dommages autres" {...otherProps} />

        <StatsLine style={{ flex: Object.keys(PERCENTS_RES_STATS).length }} statsData={PERCENTS_RES_STATS} statsValues={stats} suffix={suffixForResistance} data-title="Résistances %" {...otherProps} />
        <StatsLine style={{ flex: Object.keys(STATIC_RES_STATS).length }} statsData={STATIC_RES_STATS} statsValues={stats} data-title="Résistances fixes" {...otherProps} />
        <StatsLine style={{ flex: Object.keys(OTHERS_RES).length }} statsData={OTHERS_RES} statsValues={stats} suffix={suffixForResistance} data-title="Résistances autres" {...otherProps} />

        <StatsLine style={{ flex: Object.keys(SECONDARY_STATS).length }} statsData={SECONDARY_STATS} statsValues={stats} data-title="Stats secondaires" {...otherProps} />
      </>
    );
}

export default CharacterStats;
