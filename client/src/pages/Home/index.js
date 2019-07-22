import React, { useState, useContext } from 'react';
import get from 'lodash.get';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import { Grid, Element, Icon, Column } from 'muejs';
import { withRouter, Link } from "react-router-dom";

import Links from '../../components/LinksSwitch';
import StuffCreator from '../../components/StuffCreator';

import EquipmentsSearch from '../../components/EquipmentsSearch';
import BreedsList from '../../components/BreedsList';
import CharacterStats from '../../components/CharacterStats';


import './stylesheet.styl';


const Home = ({ history: { push } = {} }) => {
  const [shouldShow, showLogin] = useState(false);

  return (
    <Grid className="home-container" gap="3rem" rowsTemplate="2.5rem 2.5rem repeat(3, fit-content(100%))" columnsTemplate={`10vw 1fr 10vw`}>

      <Links className="nav-icons" row={1} col={1} height={{ xs: 1, sm: 2 }} width={{ xs: 2, sm: 1 }} />

      <Element row={1} col={1} width={3} height={2} className="brand align-stretch">
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

      <StuffCreator row={3} col={2} />

    </Grid>
  );
}
export default withRouter(Home);
