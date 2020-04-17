import React from 'react';
import { Grid, Element } from 'muejs';
import gql from 'graphql-tag';
import get from 'lodash.get';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom'

import { getStuffs } from '../../queries';

import Brand from '../../components/Brand';
import StuffsForm from '../../components/Stuff/Form ';

import { getMyCharacters } from '../../../queries';
import * as mutations from '../../../queries/mutations';
 
import './stylesheet.styl';


const Home = () => {
  const [stuff, setStuff] = useState({
    name: 'Nouvel équipment',
    public: true,
    equipments: [],
  });

  const [character, setCharacter] = useState({
    name: 'Nouveau personnage',
    level: 200,
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
  //console.log('stuff undefined ????', stuff);

  return (
    <Grid className="home-container stuffs-list" gap="3rem" columnsTemplate={{ xs: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)', xxxl: 'repeat(4, 1fr)' }}>

      <Element
        type={Link}
        to="/stuffs/new"
        className='btn filled-primary justify-self-center'
        row="1" col="1"
        width={{ xs: 1, md: 2, xl: 3, xxxl: 4 }}
      >
        <div className="btn-label">
          <i className="material-icons mr-5">add</i>
          Voir les stuffs existants
        </div>
      </Element>

      
      <StuffForm stuff={stuff} row={1} col={2} />
    </Grid>
  );
};

export default Home;
