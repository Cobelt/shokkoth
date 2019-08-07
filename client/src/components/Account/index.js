import React, { useState } from 'react';
import get from 'lodash.get';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { Column, Element, Button } from 'muejs';

import { getMyCharacters } from '../../queries';
import { useUser } from '../../hooks/useUser';


const Account = ({ context, className, ...props }) => {
  const { user, logout } = useUser(context);
  const { data, error, loading } = useQuery(gql(getMyCharacters))

  return (
    <Column>
      <Element type="h2" className="marg-0 font-over-primary">Bonjour, { get(user, 'username') }</Element>
      <Button className={'logout bg-primary pad-0 flex-1'} onClick={() => logout(context)}>Se déconnecter</Button>
    </Column>
  );
}


export default Account;
