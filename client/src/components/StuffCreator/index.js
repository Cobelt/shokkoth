import React, { useState, useContext, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import { Grid, Element, Column } from 'muejs';
import { withRouter } from "react-router";

import EquipmentsContext from '../../store/context/equipments';

import * as service from '../../services/equipments';
import * as actions from '../../store/actions/equipments';
import * as selectors from '../../store/selectors/equipments';

import StatsRow from '../CharacterStats/StatsLine';
import ShowDetails from '../ShowDetails';
import EquipmentsSearch from '../EquipmentsSearch';
import Stuff from '../Stuff';

import { BREEDS } from '../../constants/breeds';

import {
  PRIMARY_STATS,
  SECONDARY_STATS,
  DAMAGES_STATS,
  RESISTANCES_STATS,

  PERCENTS_RES_STATS,

  MELEE_DAMAGE,
  MELEE_RESISTANCE,

  RANGED_DAMAGE,
  RANGED_RESISTANCE,

  STATS
} from '../../constants/stats';

import { calculateStats } from './static.js';

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

const StuffCreator = (otherProps) => {
  const [store, dispatch] = useContext(EquipmentsContext);

  const initStats = useMemo(() => {
    const toReturn = {};
    for (let stat of Object.keys(STATS)) {
      toReturn[stat] = 0;
    }
    return toReturn;
  });

  const [stats, setStats] = useState(initStats);

  const [gender, setGender] = useState('m');
  const [selectedBreed, setBreed] = useState(BREEDS.find(i => i.name === 'eliotrope'));
  const character = { pseudo: 'Shokkoht', level: '200+', breed: selectedBreed, gender };


  const characterStats = selectors.getCharacterStats(store);
  const stuff = selectors.getStuff(store);
  const setsBonuses = stuff && selectors.getCurrentSetsBonus(store);


  useEffect(() => {
    setStats(calculateStats(initStats, stuff, setsBonuses));
  }, [JSON.stringify(stuff)])

  // custom hook useParams?
  // const [searchText, setSearchText] = useState('');
  // const [page, setPage] = useState(0);
  // const [perPage, setPerPage] = useState(80);
  // const [levelMin, setLevelMin] = useState(1);
  // const [levelMax, setLevelMax] = useState(200);
  // const types = selectors.getActiveTypes(store);
  // const order = types.split(',').length > 1 ? { type: 1, level: -1, _id: -1 } : undefined;

  // const equipments = selectors.getEquipments(store, { types, order, searchText, levelMin, levelMax, page, perPage });
  // if (get(equipments, 'length') > 0) console.log('equipments =', equipments)


  // useEffect(() => {
  //   console.log('useEffect hook');
  //   handleSearch({ types, order, searchText, levelMin, levelMax, page, perPage }, [store, dispatch])
  // }, [types, order, searchText, levelMin, levelMax, page, perPage]);

  const equipmentToDetail = selectors.getDisplayedEquipment(store);
  const select = props => actions.display(props, [store, dispatch]);
  const equip = props => actions.equip(props, [store, dispatch])

  const setParchoStat = ({ name, value }) => actions.setParchoStat({ name, value }, [store, dispatch]);

  return (
    <Element className="stuff-creator-container" {...otherProps}>
      <Grid className="stuff-creator" columnsTemplate="minmax(30rem, min-content) auto" rowsTemplate="max-content repeat(2, fit-content(100%))" gap="3rem">

        <Stuff elementClassName="stuff-preview align-start" character={character} stats={stats} row={1} col={1} characterStats={characterStats} setParchoStat={setParchoStat} />
        <ShowDetails equipment={equipmentToDetail} selectEquipment={select} equip={equip} row={2} col={1} height={{ lg: 2 }} />

        <EquipmentsSearch row={{ xs: 3, sm: 1 }} col={{ xs: 1, sm: 2 }} height={{ sm: 2 }} select={select} equip={equip} itemDisplayed={equipmentToDetail} />

        <Column className="stats" col={{ xs: 1, lg: 2 }} row={{ xs: 4, sm: 3 }} width={{ sm: 2, lg: 1 }}>
          <StatsRow className="primary-stats pad pad-1-rem bg-primary" style={{ flex: Object.keys(PRIMARY_STATS).length }} statsData={PRIMARY_STATS} statsValues={stats} data-title="Stats primaires" />
          <StatsRow className="secondary-stats pad pad-1-rem bg-primary" style={{ flex: Object.keys(SECONDARY_STATS).length }} statsData={SECONDARY_STATS} statsValues={stats} data-title="Stats secondaires" />
          <StatsRow className="damages-stats pad pad-1-rem bg-primary" style={{ flex: Object.keys(DAMAGES_STATS).length }} statsData={DAMAGES_STATS} statsValues={stats} suffix={suffixForDamages} data-title="Dommages" />
          <StatsRow className="resistances-stats pad pad-1-rem bg-primary" style={{ flex: Object.keys(RESISTANCES_STATS).length }} statsData={RESISTANCES_STATS} statsValues={stats} suffix={suffixForResistance} data-title="Résistances" />
        </Column>
      </Grid>
    </Element>
  );
}
export default StuffCreator;
