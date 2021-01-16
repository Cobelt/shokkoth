import React from 'react';
import { Grid, Element } from 'muejs';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { getStuffs } from '../../queries';

import StuffsSearch from '../../components/Stuff/Search';

import './stylesheet.styl';


const Search = () => {
  const { data: { stuffMany: stuffs = [] } = {}, error, loading, fetchMore, refetch } = useQuery(gql(getStuffs));

  return (
    <Grid className="stuffs-list" gap="3rem" columnsTemplate={{ xs: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)', xxxl: 'repeat(4, 1fr)' }}>

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

export default Search;
