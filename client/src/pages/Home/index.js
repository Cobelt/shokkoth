import React, { useState, useContext } from 'react';
import get from 'lodash.get';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import { Grid, Element, Icon, Column } from 'muejs';
import { withRouter, Link } from "react-router-dom";

import StuffCreator from '../../components/StuffCreator';

import EquipmentsSearch from '../../components/EquipmentsSearch';
import BreedsList from '../../components/BreedsList';
import CharacterStats from '../../components/CharacterStats';
import Brand from '../../components/Brand';

import './stylesheet.styl';


const Home = () => {
  const [shouldShow, showLogin] = useState(false);

  return (
    <Grid className="home-container" gap="3rem" rowsTemplate="2.5rem 2.5rem repeat(3, fit-content(100%))" columnsTemplate={`10vw 1fr 10vw`}>

      <Brand row={1} col={1} width={3} height={2} className="align-stretch" />

      <StuffCreator row={3} col={2} />

    </Grid>
  );
}
export default Home;
