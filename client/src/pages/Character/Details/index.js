import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Element, Icon } from 'muejs';

import './stylesheet.styl';

import Stuff from '../../../components/Stuff';


const CharacterDetails = () => (
  <Element col={2} height={3} width={6} className="character-details">
    <Stuff character={{ pseudo: 'Shokkoht', level: '200', breed: 16 }} />
  </Element>
);

export default withRouter(CharacterDetails);
