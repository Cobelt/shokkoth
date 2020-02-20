import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash.get';
import gql from 'graphql-tag';
import { withRouter, Redirect } from 'react-router-dom';
import { Element, Grid, FullPageSpinner } from 'muejs';

import EquipmentsContext from '../../../store/context/equipments';
import * as actions from '../../../store/actions/equipments';
import * as selectors from '../../../store/selectors/equipments';

import { getStuff } from '../../../queries';

import Brand from '../../../components/Brand';
import Stuff from '../../../components/Stuff';
import ShowDetails from '../../../components/ShowDetails';
import CharacterStats from '../../../components/CharacterStats';

import './stylesheet.styl';


const PublicStuff = ({ match: { params: { _id } = {} } = {}, location, staticContext }) => {
  const [store, dispatch] = useContext(EquipmentsContext);
  const { data: { stuffOne: stuff = {} } = {}, error, loading } = useQuery(gql(getStuff), { variables: { id: _id }});

  const equipmentToDetail = selectors.getDisplayedEquipment(store);
  const select = props => actions.display(props, [store, dispatch]);

  if (loading) return <FullPageSpinner />;

  const { character } = stuff || {};
  if (!character) return <Redirect to='/stuffs/404' />

  const title = error ? `Erreur! ${error.message}` : `[Publique] Stuffs "${get(stuff, 'name')}" de ${get(character, 'name')}`

  return (
    <Grid className="stuff-watcher marg-b-3rem" rowGap="3em" colGap={{ sm: '3em' }} rowsTemplate={{ xs: 'auto auto 1fr', md: 'auto auto 1fr' }} columnsTemplate={{ md: '6vw 1fr 6vw', lg: '30em 1fr 1fr' }}>

      <Element type="h3" row={1} col={1} width={{ md: 3, lg: 3 }} className="main-title text-center font-primary">{ title }</Element>

      <Stuff character={character} stuff={stuff} row={2} col={{ md: 1 }} editable={false} />
      <ShowDetails equipment={equipmentToDetail} selectEquipment={select} row={{ xs: 2, md: 1, lg: 2 }} col={{ sm: 2, md: 3, lg: 3 }} height={{ md: 2, lg: 1 }} width={{ md: 2, lg: 1 }}/>

      <Element className="stats-container" row={{ xs: 3, lg: 2 }} col={{ md: 2, lg: 3 }} width={{ md: 3, lg: 2 }} height={{ md: 2, lg: 1 }}>
        <Grid columnsTemplate={{ xs: '1fr', sm: '1fr 1fr' }} colGap="5em">
          <CharacterStats />
        </Grid>
      </Element>
    </Grid>
  );
}
export default withRouter(PublicStuff);
