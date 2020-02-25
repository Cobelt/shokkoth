import React, { useState } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { Grid, Element, Icon, FullPageSpinner, Input, Column, Row } from 'muejs';
import gql from 'graphql-tag';
import get from 'lodash.get';
import { useQuery } from '@apollo/react-hooks';

import { getCharacter } from '../../../queries';

import StuffsSearch from '../../../components/Stuff/Search';

import './stylesheet.styl';


const PublicCharacter = ({ match: { params: { _id } = {} } = {}, history: { push } = {}, location }) => {
  const { data: { characterOne: character } = {}, error, loading, fetchMore, refetch } = useQuery(gql(getCharacter), { variables: { id: _id } });

  if (loading) return <FullPageSpinner />;
  if (!character) return <Redirect to={`/characters/404`} />

  const title = error ? `Erreur! ${error.message}` : `[Publique] Stuffs de ${get(character, 'name')}`

  return (
    <Grid className="public-character mb-50" gap="3rem" rowsTemplate="2.5rem 3.5rem" columnsTemplate="1fr 1fr 1fr">

      <Element type="h3" row={1} col={1} width={{ md: 2, lg: 3 }} height={2} className="main-title text-center font-primary">{ title }</Element>

      <StuffsSearch searchBarPosition={{ row: 3, width: { md: 2, lg: 3 } }} stuffs={get(character, 'stuffs')} globalCharacter={character} error={error} />
    </Grid>
  );
}

export default withRouter(PublicCharacter);
