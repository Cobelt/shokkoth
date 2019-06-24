import React, { useState, useContext } from 'react';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import { Grid, Element, Icon } from 'muejs';
import { withRouter } from "react-router";

import EquipmentsContext from '../../store/context/equipments';

import * as service from '../../services/equipments';
import * as selectors from '../../store/selectors/equipments';


import Stuff from '../../components/Stuff';
// import ItemDetails from '../../components/Equipment/Detailled';

import EquipmentsList from '../../components/EquipmentsList';
import BreedsList from '../../components/BreedsList';
import CharacterStats from '../../components/CharacterStats';



import { BREEDS } from '../../constants/breeds';

import './stylesheet.styl';


const Home = ({ idgrid, history: { push } = {} }) => {
  const [shouldShow, showLogin] = useState(false);
  const [store, dispatch] = useContext(EquipmentsContext);

  const [gender, setGender] = useState('m');
  const [selectedBreed, setBreed] = useState(BREEDS.find(i => i.name === 'eliotrope'));

  const itemDisplayed = selectors.getDisplayedEquipment(store);

  return (
    <Grid className="home-container" gap="3rem" rowsTemplate="2.5rem 2.5rem repeat(3, fit-content(100%))" columnsTemplate={`10vw max-content 1fr 10vw`}>

      <Element className="nav-icons" row={1} col={1} height={2}>
        <Icon icon="supervisor_account" onClick={() => push('/characters')} />
        <Icon icon="save" />
      </Element>

      <Element row={1} col={1} width={5} height={2} type="h2" className="brand font-primary" style={{ margin: 0 }}>Shokkoth.tk</Element>


      <Element row={3} col={2} width={2} className="bg-primary player-stats collapsable">
        <CharacterStats />
      </Element>

      <Element row={4} col={2} className="stuff-preview align-start">
        <Stuff character={{ pseudo: 'Shokkoht', level: '200+', breed: selectedBreed, gender }} className="marg-b-2-rem" />
      </Element>


      <Element className="equipments-search" row={4} col={3}>
        <div className="bg-primary pad-1-rem">Liste des équipments. Ce titre deviendra une liste d'onglet ainsi que tout le nécessaire à une recherche</div>

        <EquipmentsList />
      </Element>


      <Element className="items-details-container" row={4} col={4}>
        {/* <ItemDetails className="pad-1-rem" style={{ maxWidth: '100%' }} /> */}
      </Element>

    </Grid>
  );
}
export default withRouter(Home);
