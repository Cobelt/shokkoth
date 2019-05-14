import React, { createContext, useReducer } from 'react';
import { UserReducer } from '../../reducers/user';


const UserContext = React.createContext();
export default UserContext;

export const UserConsumer = UserContext.Consumer;

export const UserProvider = ({ initialState = {}, children }) => (
  <UserContext.Provider value={useReducer(UserReducer, initialState)}>
    { children }
  </UserContext.Provider>
);
