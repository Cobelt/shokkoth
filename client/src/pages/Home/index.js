import React, { useState, useContext } from 'react';
import get from 'lodash.get';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import { Grid, Element, Icon, Column } from 'muejs';
import { withRouter, Link } from "react-router-dom";

// import EquipmentsContext from '../../store/context/equipments';

// import * as service from '../../services/equipments';
// import * as selectors from '../../store/selectors/equipments';


import StuffCreator from '../../components/StuffCreator';
// import ItemDetails from '../../components/Equipment/Detailled';

import EquipmentsSearch from '../../components/EquipmentsSearch';
import BreedsList from '../../components/BreedsList';
import CharacterStats from '../../components/CharacterStats';



import { BREEDS } from '../../constants/breeds';

import './stylesheet.styl';

const Home = ({ history: { push } = {} }) => {
  const [shouldShow, showLogin] = useState(false);

  const [gender, setGender] = useState('m');
  const [selectedBreed, setBreed] = useState(BREEDS.find(i => i.name === 'eliotrope'));

  return (
    <Grid className="home-container" gap="3rem" rowsTemplate="2.5rem 2.5rem repeat(3, fit-content(100%))" columnsTemplate={`10vw 1fr 10vw`}>

      <Element className="nav-icons" row={1} col={1} height={2}>
        <Icon className="font-primary" icon="supervisor_account" onClick={() => push('/characters')} />
        <Icon className="font-primary" icon="save" />
      </Element>

      <Element row={1} col={1} width={3} height={2} className="brand align-stretch" style={{ margin: 0 }}>
        <Link to="/" className="font-primary">
          <h2 id="shok">
            <span id="sh">sh</span>
            <span id="o">o</span>
            k
          </h2>
          <h2 id="koth">koth</h2>
          <h2 id="dot-tk">.tk</h2>
        </Link>
      </Element>

      <StuffCreator row={3} col={2} character={{ pseudo: 'Shokkoht', level: '200+', breed: selectedBreed, gender }} />

    </Grid>
  );
}
export default withRouter(Home);
