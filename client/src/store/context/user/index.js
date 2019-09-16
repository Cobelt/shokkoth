import React, { createContext, useReducer } from 'react';
import get from 'lodash.get';

import * as cookies from '../../../utils/cookies';
import { UserReducer } from '../../reducers/user';


const UserContext = React.createContext();
export default UserContext;

export const UserConsumer = UserContext.Consumer;

export const getInitialState = () => {
  const initialState = {};

  const token = cookies.get('shokkothJWT')
  if (token) initialState.jwt = token;

  return initialState;
}

export const UserProvider = ({ initialState = getInitialState(), children }) => (
  <UserContext.Provider value={useReducer(UserReducer, initialState)}>
    { children }
  </UserContext.Provider>
);
