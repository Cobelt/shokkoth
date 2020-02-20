import React, { useState, useEffect } from 'react';
import { Grid, FullPageSpinner } from 'muejs';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import useBreeds from '../../../hooks/useBreeds';

import Brand from '../../../components/Brand';
import StuffForm from '../../../components/Stuff/Form';

import { getMyCharacters } from '../../../queries';
import * as mutations from '../../../queries/mutations';

import './stylesheet.styl';


const New = ({ match: { params: { characterId } = {} } = {}, location, staticContext }) => {
  const [stuff, setStuff] = useState({
    name: 'Nouvel équipment',
    public: true,
    equipments: [],
  });

  const [character, setCharacter] = useState({
    name: 'Nouveau personnage',
    level: 201,
    gender: 'MALE',
  });

  const { data: { myCharacters: characters = [] } = {}, error, loading, fetchMore, refetch } = useQuery(gql(getMyCharacters), { variables: { filter: { _id: characterId } } });
  const { breeds, loadingBreeds } = useBreeds();

  const [createStuff] = useMutation(gql(mutations.createStuff));

  const characterFromID = characters[0];
  useEffect(() => {
    if (characterFromID) setCharacter(characterFromID);
  }, [JSON.stringify(characterFromID)])


  useEffect(() => {
    if (!characterFromID && !character.breed && breeds.length > 0) {
      const withBreed = stuff;
      withBreed.breed = breeds[0];
      setCharacter(withBreed);
    }
  }, [breeds.length > 0]);


  if (characterId && loading || !characterId && loadingBreeds) return <FullPageSpinner />;
  console.log('stuff undefined ????', stuff);

  return (
    <Grid className="stuff-editor" gap="3rem" rowsTemplate="2.5rem 2.5rem repeat(3, fit-content(100%))" columnsTemplate={`10vw 1fr 10vw`}>

      <Brand row={1} col={1} width={3} height={2} className="align-stretch" />

      <StuffForm character={character} stuff={stuff} row={3} col={2} />

    </Grid>
  );
}

export default New;