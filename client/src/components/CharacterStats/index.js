import React, { useState, useMemo, useReducer, useContext, useEffect } from 'react';
import get from 'lodash.get';
import { Grid, Row, Element } from 'muejs';

import EquipmentsContext from '../../store/context/equipments';

import * as selectors from '../../store/selectors/equipments';
import * as actions from '../../store/actions/equipments';

import {
  ESSENTIAL_STATS,
  ELEMENTS_STATS,
  OTHERS_PRIMARY_STATS,

  ESCAPE_STATS,
  AP_MP_PARRY,
  AP_MP_REDUCTION,
  OTHERS_SECONDARY,

  ELEMENTS_DAMAGES,
  OTHERS_DAMAGES,

  PERCENTS_RES_STATS,
  STATIC_RES_STATS,
  OTHERS_RES,

  SECONDARY_STATS,
  DAMAGES_STATS,
  RESISTANCES_STATS,

  STATS,
  AP,
  MP,
  SUMMONS,
  VITALITY
} from '../../constants/stats';

import StatsLine from './StatsLine';

import './stylesheet.styl';


const CharacterStats = ({ className, ...otherProps }) => {
    const [store, dispatch] = useContext(EquipmentsContext);
    const initStats = useMemo(() => {
      const toReturn = {};
      for (let stat of Object.keys(STATS)) {
        toReturn[stat] = 0;
      }
      return toReturn;
    });
    const [stats, setStats] = useState(initStats);


    const stuff = selectors.getStuff(store);
    // const [stats, dispatchStats] = useReducer(StatsReducer, )

    useEffect(() => {
      const newStats = initStats;
      newStats[AP] = stuff.lvl && stuff.lvl < 100 ? 6 : 7;
      newStats[MP] = 3;
      newStats[SUMMONS] = 1;
      newStats[VITALITY] = 55 + (stuff.lvl || 200) * 5;

      if (stuff) {
        for (let [category, equipment] of Object.entries(stuff)) {
          if (get(equipment, 'statistics.length') > 0)
          for (let stat of equipment.statistics) {
            if (stat && Object.keys(STATS).includes(stat.name)) {
              newStats[stat.name] += parseInt(stat.value || stat.max || stat.min, 10);
            }
          }
        }
      }
      setStats(newStats);
    }, [JSON.stringify(stuff)])

    return (
      <Grid colGap="3rem" className="character-stats pad-1-rem">
        <Element col={1} style={{ textAlign: 'center', padding: '1rem' }}>
          Primaires
        </Element>
        <Element col={1} row={2}>
          <StatsLine statsData={ESSENTIAL_STATS} statsValues={stats} />
        </Element>
        <Element col={1} row={3}>
          <StatsLine statsData={ELEMENTS_STATS} statsValues={stats} />
        </Element>
        <Element col={1} row={4}>
          <StatsLine statsData={OTHERS_PRIMARY_STATS} statsValues={stats} />
        </Element>

        <Element col={2} style={{ textAlign: 'center', padding: '1rem' }}>
          Dommages
        </Element>
        <Element col={2} row={2}>
          <StatsLine statsData={ELEMENTS_DAMAGES} statsValues={stats} />
        </Element>
        <Element col={2} row={3}>
          <StatsLine statsData={OTHERS_DAMAGES} statsValues={stats} />
        </Element>

        <Element col={3} style={{ textAlign: 'center', padding: '1rem' }}>
          Résistances
        </Element>
        <Element col={3} row={2}>
          <StatsLine statsData={PERCENTS_RES_STATS} statsValues={stats} postValueLabel="%" />
        </Element>
        <Element col={3} row={3}>
          <StatsLine statsData={STATIC_RES_STATS} statsValues={stats} />
        </Element>
        <Element col={3} row={4}>
          <StatsLine statsData={OTHERS_RES} statsValues={stats} />
        </Element>

        <Element col={4} style={{ textAlign: 'center', padding: '1rem' }}>
          Autres
        </Element>
        <Row className="reverse-on-mobile" style={{ flexWrap: 'wrap', justifyContent: 'space-around' }} col={4} row={2}>
          <StatsLine statsData={ESCAPE_STATS} statsValues={stats} />

          <StatsLine statsData={AP_MP_PARRY} statsValues={stats} />

          <StatsLine statsData={AP_MP_REDUCTION} statsValues={stats} />

          <StatsLine statsData={OTHERS_SECONDARY} statsValues={stats} />
        </Row>
      </Grid>
    );
}

export default CharacterStats;
