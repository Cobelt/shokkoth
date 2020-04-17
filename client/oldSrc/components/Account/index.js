import React, { useState, useContext, useEffect } from 'react';
import get from 'lodash.get';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withRouter, Route, Switch, Redirect } from "react-router";
import { Column, Element, Button, Row, Spinner } from 'muejs';

import { getMyCharacters } from '../../queries';

import UserContext from '../../store/context/user';
import { useUser } from '../../hooks/useUser';


const Account = ({ className, ...props }) => {
  const context = useContext(UserContext);
  const { user, logout } = useUser(context);
  console.log({ context })
  // const { data: { myCharacters: characters } = {}, error, loading, refetch } = useQuery(gql(getMyCharacters));

  // useEffect(() => {
  //   if (user) refetch();
  // }, [user]);
  console.log({ user })

  // Instead of Switch, just take it from selectors.getCurrentPageDesc(store) and in every page actions.setCUrrentPageDesc with data, a lot less queries
  return (
    <Column>
      <Element type="h2" className="m-0 font-primary text-center">Bonjour { get(user, 'username') },</Element>

      <Button aspect='filled-primary' className='logout p-15 flex-1' onClick={() => logout(context)}>Se déconnecter</Button>
    </Column>
  );
}


export default withRouter(Account);
