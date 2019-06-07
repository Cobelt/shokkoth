import React, { createContext, useReducer } from 'react';
import get from 'lodash.get';

import { StuffReducer } from '../../reducers/stuff';


const StuffContext = React.createContext();
export default StuffContext;

export const StuffConsumer = StuffContext.Consumer;

export const getInitialState = () => {
  const initialState = {};

  const cookies = {};
  document.cookie.split(';').forEach(cookie => {
    const [key, value] = cookie.split('=');
    cookies[key] = value;
  })

  const draft = get(cookies, 'stuff#draft')
  const active = get(cookies, 'stuff#active')
  if (draft) initialState.draft = draft;
  if (active) initialState.active = active;

  return initialState;
}

export const StuffProvider = ({ initialState = getInitialState(), children }) => (
  <StuffContext.Provider value={useReducer(StuffReducer, initialState)}>
    { children }
  </StuffContext.Provider>
);
