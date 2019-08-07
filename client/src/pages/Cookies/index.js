import React, { useContext, useState } from 'react';

import { Grid, Element } from 'muejs';
import { withRouter, Redirect } from 'react-router-dom';
import get from 'lodash.get';

import Links from '../../components/LinksSwitch';
import Brand from '../../components/Brand';


const Cookies = () => (
  <Grid gap="3rem" rowsTemplate="2.5rem 2.5rem repeat(3, fit-content(100%))" columnsTemplate={`10vw 1fr 10vw`}>

    <Links className="nav-icons" row={1} col={1} height={{ xs: 1, sm: 2 }} width={{ xs: 2, sm: 1 }} />

    <Brand row={1} col={1} width={3} height={2} className="align-stretch" />

    <Element type="span" row={3} col={2} className="font-primary">
      <h4>Les cookies nous permettent entre autre de :</h4>
      <ul style={{ fontSize: '1.5rem' }}>
        <li>Vous maintenir connecté</li>
        <li>Sauvegarder vos préférences (thème sombre)</li>
        <li>Sauvegarder le brouillon d'un stuff</li>
      </ul>
      <h5>
        Si vous acceptez nos cookies merci de cliquer sur accepter lorsquee la pop-up en bas d'écran est affichée.
      </h5>
      <h5>
        Nous enregistrons votre réponse en sessionStore, ainsi si vous fermez votre navigateur, votre réponse est oubliée et la pop-up réaparaitra. (Comme en navigation privée)
      </h5>
    </Element>

  </Grid>
);

export default Cookies;
