import React, { createContext, useReducer } from 'react'

import { EquipmentsReducer } from '../../reducers/equipments'



const EquipmentsContext = createContext()
export default EquipmentsContext

export const EquipmentsConsumer = EquipmentsContext.Consumer

export const EquipmentsProvider = ({ initialState = {}, children }) => {
  const reducer = useReducer(EquipmentsReducer, initialState)
  return (
    <EquipmentsContext.Provider value={reducer}>
      { children }
    </EquipmentsContext.Provider>
  )
}
