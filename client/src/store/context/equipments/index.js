import React, { createContext, useReducer } from 'react';
import get from 'lodash.get';
import set from 'lodash.set';

import { EquipmentsReducer } from '../../reducers/equipments';


const EquipmentsContext = createContext();
export default EquipmentsContext;

export const EquipmentsConsumer = EquipmentsContext.Consumer;

export const getInitialState = () => {
  const initialState = {};

  const cookies = {};
  document.cookie.split(';').forEach(cookie => {
    const [key, value] = cookie.split('=');
    cookies[key] = value;
  })

  let draft;
  try {
    const unParsedDraft = get(cookies, 'STUFF_DRAFT');
    if (unParsedDraft) {
      draft = JSON.parse(unParsedDraft);
    }
  }
  catch (e) {
    console.error(e);
  }

  if (draft) {
    set(initialState, 'stuff.active', draft);
  }
  else {
    set(initialState, 'stuff.active', {
      hat: { _id: 18031 },
      amulet: { _id: 20924 },
      ringLeft: { _id: 19985 },
      ringRight: { _id: 12113 },
      cloak: { _id: 20361 },
      boots: { _id: 20364 },
      belt: { _id: 15750 },
      shield: { _id: 20926 },
      pet: { _id: 11955 },
      weapon: { _id: 20353 },
      "dofus#1": { _id: 20286 },
      "dofus#2": { _id: 18043 },
      "dofus#3": { _id: 8698 },
      "dofus#4": { _id: 16332 },
      "dofus#5": { _id: 7754 },
      "dofus#6": { _id: 6980 },
    })
  }

  return initialState;
}

export const EquipmentsProvider = ({ initialState = getInitialState(), children }) => (
  <EquipmentsContext.Provider value={useReducer(EquipmentsReducer, initialState)}>
    { children }
  </EquipmentsContext.Provider>
);
