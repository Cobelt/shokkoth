import React, { useContext, useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import get from 'lodash.get';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Button, Grid, Element, Row, Icon, FullPageSpinner } from 'muejs';
import { USERS } from 'shokkoth-constants';

import UserContext from '../../../store/context/user';
import { useUser } from '../../../hooks/useUser';

import StuffsSearch from '../../../components/Stuff/Search';

import { getMyStuffs } from '../../../queries';

import './stylesheet.styl';


const MyStuffs = ({ showLogin, history: { goBack, push } = {} }) => {
  const [characterByRow, setCharacterByRow] = useState(5);
  const context = useContext(UserContext);

  const { user, token, isLogged } = useUser(context);
  const { data: { myStuffs: stuffs = [] } = {}, loading, error, refetch } = useQuery(gql(getMyStuffs));

  if (token && !isLogged) return <Redirect to="/" />

  return (
    <Grid className="my-stuffs stuffs-list" gap="3rem" columnsTemplate={{ xs: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)', xxxl: 'repeat(4, 1fr)' }}>

      <StuffsSearch
        searchBarPosition={{ row: 1, width: { md: 2, xl: 3, xxxl: 4 } }}
        spinnerPosition={{ row: 2, width: { md: 2, xl: 3, xxxl: 4 } }}
        stuffs={stuffs}
        refetch={refetch}
        error={error}
        loading={loading}
        defaultSmall={true}
      />

    </Grid>
  );
}
export default withRouter(MyStuffs);
