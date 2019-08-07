import React, { useState, useMemo, useReducer, useContext, useEffect } from 'react';
import get from 'lodash.get';
import { Element, Column } from 'muejs';

import EquipmentsContext from '../../store/context/equipments';

import * as selectors from '../../store/selectors/equipments';
import * as actions from '../../store/actions/equipments';

import {
  PRIMARY_STATS,
  SECONDARY_STATS,
  DAMAGES_STATS,
  RESISTANCES_STATS,

  MELEE_DAMAGE,
  MELEE_RESISTANCE,

  RANGED_DAMAGE,
  RANGED_RESISTANCE,

  PERCENTS_RES_STATS,
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
      <Element {...otherProps}>
        <Column className="stats">
          <StatsLine className="primary-stats pad pad-1-rem bg-primary" style={{ flex: Object.keys(PRIMARY_STATS).length }} statsData={PRIMARY_STATS} statsValues={stats} data-title="Stats primaires" />
          <StatsLine className="secondary-stats pad pad-1-rem bg-primary" style={{ flex: Object.keys(SECONDARY_STATS).length }} statsData={SECONDARY_STATS} statsValues={stats} data-title="Stats secondaires" />
          <StatsLine className="damages-stats pad pad-1-rem bg-primary" style={{ flex: Object.keys(DAMAGES_STATS).length }} statsData={DAMAGES_STATS} statsValues={stats} suffix={suffixForDamages} data-title="Dommages" />
          <StatsLine className="resistances-stats pad pad-1-rem bg-primary" style={{ flex: Object.keys(RESISTANCES_STATS).length }} statsData={RESISTANCES_STATS} statsValues={stats} suffix={suffixForResistance} data-title="Résistances" />
        </Column>
      </Element>
    );
}

export default CharacterStats;
