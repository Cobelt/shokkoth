import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Element, Icon } from 'muejs';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

import { getMyCharacters } from '../../../queries';
import Stuff from '../../../components/Stuff';

import './stylesheet.styl';


const CharacterDetails = ({ match, location, }) => {
  const { params: { _id } = {} } = match || {};
  const { data: { myCharacters: character } = {}, error, loading } = useQuery(gql(getMyCharacters), { variables: { filter: { _id } }});

  return (
    <Element col={2} height={3} width={6} className="character-details">
      Hello world
    </Element>
  );
}

export default withRouter(CharacterDetails);
