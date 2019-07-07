import React, { useState, useContext, useEffect, useMemo } from 'react';
import get from 'lodash.get';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import { Grid, Element, Column } from 'muejs';
import { withRouter } from "react-router";
import { DragDropContext } from 'react-beautiful-dnd';

import EquipmentsContext from '../../store/context/equipments';

import * as service from '../../services/equipments';
import * as actions from '../../store/actions/equipments';
import * as selectors from '../../store/selectors/equipments';

import StatsColumn from '../CharacterStats/StatsColumn';
import EquipmentDetails from '../EquipmentDetails';
import EquipmentsSearch from '../EquipmentsSearch';
import Stuff from '../Stuff';

// import './stylesheet.styl';

// const handleSearch = debounce(async (params, context) => {
//   console.log('handle')
//   actions.fetchEquipments(params, context);
// }, 400);

import {
  PRIMARY_STATS,
  SECONDARY_STATS,
  DAMAGES_STATS,
  RESISTANCES_STATS,

  ESCAPE_STATS,
  AP_MP_PARRY,
  AP_MP_REDUCTION,
  OTHERS_SECONDARY,

  ELEMENTS_DAMAGES,
  OTHERS_DAMAGES,

  PERCENTS_RES_STATS,
  STATIC_RES_STATS,
  OTHERS_RES,


  STATS,

  AP,
  MP,
  SUMMONS,
  VITALITY
} from '../../constants/stats';

import './stylesheet.styl';



const StuffCreator = ({ character = {}, ...otherProps }) => {
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
  const select = equipment => actions.display({ equipment }, [store, dispatch]);


  return (
    <Element className="stuff-creator-container" {...otherProps}>
      <DragDropContext>
        <Grid className="stuff-creator" columnsTemplate="fit-content(100%) minmax(30rem, min-content) fit-content(100%) auto" rowsTemplate="it-content(100%) fit-content(100%)" colGap="3rem">
          <Column className="pad pad-1-rem bg-primary" col={1} row={1} height={2}>
            <StatsColumn className="primary-stats" style={{ flex: Object.keys(PRIMARY_STATS).length }} statsData={PRIMARY_STATS} statsValues={stats} data-title="Stats primaires" />
            <StatsColumn className="secondary-stats" style={{ flex: Object.keys(SECONDARY_STATS).length }} statsData={SECONDARY_STATS} statsValues={stats} data-title="Stats secondaires" />
          </Column>

          <Column className="stuff-and-equipment-details" row={1} col={2} height={2}>
            <Stuff elementClassName="stuff-preview align-start" character={character} stats={stats} />
            <EquipmentDetails equipment={equipmentToDetail} onClose={() => select()} />
          </Column>

          <Column className="pad pad-1-rem bg-primary" col={3} row={1} height={2}>
            <StatsColumn className="damages-stats" style={{ flex: Object.keys(DAMAGES_STATS).length }} statsData={DAMAGES_STATS} statsValues={stats} data-title="Dommages" />
            <StatsColumn className="resistances-stats" style={{ flex: Object.keys(RESISTANCES_STATS).length }} statsData={RESISTANCES_STATS} statsValues={stats} data-title="Résistances" />
          </Column>

          <EquipmentsSearch row={1} col={4} height={2} select={select} />
        </Grid>
      </DragDropContext>
    </Element>
  );
}
export default StuffCreator;
