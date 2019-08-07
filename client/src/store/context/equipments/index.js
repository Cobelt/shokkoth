import React, { createContext, useReducer } from 'react';
import get from 'lodash.get';
import set from 'lodash.set';
import memoize from 'lodash.memoize';

import { EquipmentsReducer } from '../../reducers/equipments';

import * as cookies from '../../../utils/cookies';
import { VITALITY, WISDOM, STRENGTH, INTELLIGENCE, CHANCE, AGILITY } from '../../../constants/stats';


const EquipmentsContext = createContext();
export default EquipmentsContext;

export const EquipmentsConsumer = EquipmentsContext.Consumer;

export const getInitialState = memoize(() => {
  const initialState = {};

  let draft;
  try {
    const unParsedDraft = cookies.get('STUFF_DRAFT');
    if (unParsedDraft) {
      draft = JSON.parse(unParsedDraft);
    }
  }
  catch (e) {
    console.error(e);
  }

  set(initialState, 'stats.base', { [VITALITY]: 0, [WISDOM]: 0, [STRENGTH]: 0, [INTELLIGENCE]: 0, [CHANCE]: 0, [AGILITY]: 0 })
  set(initialState, 'stats.parcho', { [VITALITY]: 100, [WISDOM]: 100, [STRENGTH]: 100, [INTELLIGENCE]: 100, [CHANCE]: 100, [AGILITY]: 100 })

  return initialState;
});

export const EquipmentsProvider = ({ initialState, children }) => {
  const reducer = useReducer(EquipmentsReducer, initialState || getInitialState());
  return (
    <EquipmentsContext.Provider value={reducer}>
      { children }
    </EquipmentsContext.Provider>
  );
};
