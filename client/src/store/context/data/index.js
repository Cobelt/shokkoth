import React, { createContext, useReducer } from 'react';
import get from 'lodash.get';
import set from 'lodash.set';
import memoize from 'lodash.memoize';

import { DataReducer } from '../../reducers/data';

import * as cookies from '../../../utils/cookies';
import { VITALITY, WISDOM, STRENGTH, INTELLIGENCE, CHANCE, AGILITY } from '../../../constants/stats';


const DataContext = createContext();
export default DataContext;

export const DataConsumer = DataContext.Consumer;

export const getInitialState = memoize(() => {});


export const DataProvider = ({ initialState, children }) => {
  const reducer = useReducer(DataReducer, initialState || getInitialState());
  return (
    <DataContext.Provider value={reducer}>
      { children }
    </DataContext.Provider>
  );
};
