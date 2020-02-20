import React, { createContext, useReducer } from 'react';

import { DataReducer } from '../../reducers/data';


const DataContext = createContext();
export default DataContext;

export const DataConsumer = DataContext.Consumer;


export const DataProvider = ({ initialState, children }) => {
  const reducer = useReducer(DataReducer, initialState);
  return (
    <DataContext.Provider value={reducer}>
      { children }
    </DataContext.Provider>
  );
};
