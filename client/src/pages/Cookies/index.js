import React, { useContext, useState } from 'react';

import { Grid, Element } from 'muejs';
import { withRouter, Redirect } from 'react-router-dom';
import get from 'lodash.get';

import UserContext from '../../store/context/user';
import useUser from '../../hooks/useUser';


const Cookies = () => {
  const context = useContext(UserContext);
  const { user, token } = useUser(context);

  const { acceptCookie } = user || {};

  return (
    <Grid gap="3rem" rowsTemplate="2.5rem 2.5rem repeat(3, fit-content(100%))" columnsTemplate={`10vw 1fr 10vw`}>

      <Element type="span" row={3} col={2} className="font-primary">
        <h4>Les cookies sont une forme de stockage qui permettent d'enregistrer vos préférences afin de garder une exploration agréable de notre site.</h4>
        <h5>Voici les cookies qui nous créons ainsi que leurs utilités :</h5>
        <ul style={{ fontSize: '1.5rem' }}>
          <li>login/TOKEN vous maintient connecté</li>
          <li>preferences/DARK_MODE sauvegarde vos préférences de thème sombre</li>
          {/* <li>stuffs/DRAFT sauvegarde le brouillon d'un stuff</li> */}
        </ul>
        <h5>
          Vous pouvez changer votre décision ci-dessous
        </h5>
        { !token && 'vous netes pas loggé'}
        {acceptCookie && 'Vous avez accepté les cookies'}
        {!acceptCookie && 'Vous navez pas accepté les cookies'}

      </Element>

    </Grid>
  );
};

export default Cookies;
