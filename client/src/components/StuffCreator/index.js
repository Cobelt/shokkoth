import React, { useState, useContext, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withRouter } from "react-router";
import { Grid, Element, Column } from 'muejs';

import EquipmentsContext from '../../store/context/equipments';

import * as service from '../../services/equipments';
import * as actions from '../../store/actions/equipments';
import * as selectors from '../../store/selectors/equipments';

import Stuff from '../Stuff';
import ShowDetails from '../ShowDetails';
import EquipmentsSearch from '../EquipmentsSearch';
import CharacterStats from '../CharacterStats';

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

import { getCharacter } from '../../queries';

import './stylesheet.styl';



const StuffCreator = (otherProps) => {
  const [store, dispatch] = useContext(EquipmentsContext);

  const equipmentToDetail = selectors.getDisplayedEquipment(store);
  const select = props => actions.display(props, [store, dispatch]);
  const equip = props => actions.equip(props, [store, dispatch])


  return (
    <Query query={gql(getCharacter)} variables={{ id: '5d40c007d4005e7f119f37db' }}>
      {({ loading, error, data: { characterOne: character } = {} }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const { stuffs = [] } = character;
        console.log(stuffs);

        return (
          <Element className="stuff-creator-container" {...otherProps}>
            <Grid className="stuff-creator" columnsTemplate="minmax(30rem, min-content) auto" rowsTemplate="max-content repeat(2, fit-content(100%))" gap="3rem">

              <Stuff elementClassName="stuff-preview align-start" character={character} stuff={stuffs[0]} row={1} col={1} />
              <ShowDetails equipment={equipmentToDetail} selectEquipment={select} equip={equip} row={2} col={1} height={{ lg: 2 }} />

              <EquipmentsSearch row={{ xs: 3, md: 1 }} col={{ xs: 1, md: 2 }} height={{ md: 2 }} select={select} equip={equip} itemDisplayed={equipmentToDetail} />

              <CharacterStats row={{ xs: 4, md: 3 }} col={{ xs: 1, lg: 2 }} width={{ md: 2, lg: 1 }} />
            </Grid>
          </Element>
        );
      }}
    </Query>
  );
}
export default StuffCreator;
