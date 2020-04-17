import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withRouter, Redirect } from 'react-router-dom';
import { Grid, FullPageSpinner } from 'muejs';
import { USERS } from 'shokkoth-constants';

import { getMyStuffs } from '../../../queries';

import Brand from '../../../components/Brand';
import StuffForm from '../../../components/Stuff/Form';

import UserContext from '../../../store/context/user';
import { useUser } from '../../../hooks/useUser';

import './stylesheet.styl';


const Edit = ({ match: { params: { _id } = {} } = {}, location, staticContext, showLogin }) => {
  const context = useContext(UserContext);
  const { user, hasRoles, loading: userLoading } = useUser(context);


  const { data: { myStuffs: stuffs = [] } = {}, error, loading, refetch } = useQuery(gql(getMyStuffs), { variables: { filter: { _id } }});

  if (userLoading || loading) return <FullPageSpinner />;

  const isAuthorized = hasRoles({ needRoles: [USERS.ROLES.USER] });
  if (isAuthorized === null) showLogin(true);
  if (!isAuthorized) return <Redirect to={`/stuffs/${_id}`} />

  const stuff = stuffs[0] || {};

  if (error) return <h3 className="main-title">Erreur ! { error.message }</h3>


  const { character } = stuff;
  if (!character) return <Redirect to='/stuffs/new' />

  return (
    <Grid className="stuff-editor" gap="3rem" rowsTemplate="2.5rem 2.5rem repeat(3, fit-content(100%))" columnsTemplate={`10vw 1fr 10vw`}>

      <Brand row={1} col={1} width={3} height={2} className="align-stretch" />

      <StuffForm character={character} stuff={stuff} refetch={refetch} row={3} col={2} />

    </Grid>
  );
}
export default withRouter(Edit);
