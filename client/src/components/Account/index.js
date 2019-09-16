import React, { useState, useEffect } from 'react';
import get from 'lodash.get';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withRouter, Route, Switch, Redirect } from "react-router";
import { Column, Element, Button, Row, Spinner } from 'muejs';

import { getMyCharacters } from '../../queries';
import { useUser } from '../../hooks/useUser';


const Account = ({ context, className, ...props }) => {
  const { user, logout } = useUser(context);
  // const { data: { myCharacters: characters } = {}, error, loading, refetch } = useQuery(gql(getMyCharacters));

  // useEffect(() => {
  //   if (user) refetch();
  // }, [user]);

  // Instead of Switch, just take it from selectors.getCurrentPageDesc(store) and in every page actions.setCUrrentPageDesc with data, a lot less queries
  return (
    <Column>
      <Element type="h2" className="marg-0 font-primary">Bonjour, { get(user, 'username') }</Element>

      <Button className={'logout bg-primary pad-5 flex-1'} onClick={() => logout(context)}>Se déconnecter</Button>
    </Column>
  );
}


export default withRouter(Account);
