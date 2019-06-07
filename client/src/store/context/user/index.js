import React, { createContext, useReducer } from 'react';
import get from 'lodash.get';

import { UserReducer } from '../../reducers/user';


const UserContext = React.createContext();
export default UserContext;

export const UserConsumer = UserContext.Consumer;

export const getInitialState = () => {
  const initialState = {};

  const cookies = {};
  document.cookie.split(';').forEach(cookie => {
    const [key, value] = cookie.split('=');
    cookies[key] = value;
  })

  const token = get(cookies, 'jwt')
  if (token) initialState.jwt = { token };

  return initialState;
}

export const UserProvider = ({ initialState = getInitialState(), children }) => (
  <UserContext.Provider value={useReducer(UserReducer, initialState)}>
    { children }
  </UserContext.Provider>
);
