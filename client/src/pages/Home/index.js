import React from 'react';
import { Grid, Element } from 'muejs';
import gql from 'graphql-tag';
import get from 'lodash.get';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom'

import { getStuffs } from '../../queries';

import Brand from '../../components/Brand';
import StuffsSearch from '../../components/Stuff/Search';

import './stylesheet.styl';


const Home = () => {
  const variables = { filter: { notDraft: true, notEmpty: true } };
  const { data: { stuffMany: stuffs = [] } = {}, error, loading, fetchMore, refetch } = useQuery(gql(getStuffs), { variables });

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
          Créer un nouveau stuff
        </div>
      </Element>


      <StuffsSearch
        searchBarPosition={{ row: 2, width: { md: 2, xl: 3, xxxl: 4 } }}
        spinnerPosition={{ row: 3, width: { md: 2, xl: 3, xxxl: 4 } }}
        stuffs={stuffs}
        refetch={refetch}
        variables={variables}
        error={error}
        loading={loading}
        defaultSmall={true}
      />

    </Grid>
  );
};

export default Home;
