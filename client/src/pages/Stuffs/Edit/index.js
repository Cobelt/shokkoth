import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withRouter, Redirect } from 'react-router-dom';
import { Grid, FullPageSpinner } from 'muejs';
import { USERS } from 'shokkoth-constants';

import { getMyStuffs } from '../../../queries';

import Brand from '../../../components/Brand';
import StuffForm from '../../../components/Stuff/Form';

import { useUser } from '../../../hooks/useUser';

import './stylesheet.styl';


const Edit = ({ match: { params: { _id } = {} } = {}, location, staticContext, showLogin }) => {
  const { hasRoles, loading: userLoading } = useUser();


  const { data: { myStuffs: stuffs = [] } = {}, error, loading, refetch } = useQuery(gql(getMyStuffs), { variables: { filter: { _id } }});

  if (userLoading || loading) return <FullPageSpinner />;

  const isAuthorized = hasRoles({ needRoles: [USERS.ROLES.USER] });
  if (isAuthorized === null) showLogin(true);
  if (!isAuthorized) return <Redirect to={`/stuffs/${_id}`} />

  const stuff = stuffs[0] || {};

  if (error) return <h3 className="main-title">Erreur ! { error.message }</h3>


  const { character } = stuff;
  if (!stuff) return <Redirect to='/stuffs/new' />

  const equip = async ({ equipment, replaced }) => {
    // actions.equip({ equipment, replaced }, [store, dispatch]); to fix
    await equipMutation({ variables: {
      stuffId: stuff._id,
      equipmentId: get(equipment, '_id'),
      replacedEquipmentId: get(getItemOfCategory(stuff, get(currentStep, 'category') || get(equipment, 'category'), get(currentStep, 'index') || 0), '_id'),
    } })
    refetch();
  };

  return (
    <div className="stuff-editor ph-10vw">

      <StuffForm stuff={stuff} equip={equip} refetch={refetch} />

    </div>
  );
}
export default withRouter(Edit);
