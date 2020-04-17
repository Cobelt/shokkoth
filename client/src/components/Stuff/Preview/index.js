import React, { useContext, useEffect } from 'react'

import EquipmentsContext from '../../../store/context/equipments'

import * as selectors from '../../../store/selectors/equipments'
import * as actions from '../../../store/actions/equipments'

import StuffSmall from './SmallView'
import StuffFull from './FullView'

import './stylesheet.styl'


const Stuff = ({ small = false, stuff, refetch, setActiveAtMount = false, ...otherProps }) => {
  const [store, dispatch] = useContext(EquipmentsContext)

  useEffect(() => {
    if (setActiveAtMount) {
      actions.setActiveStuff({ stuff }, [store, dispatch])
    }
  }, [stuff])

  let stuffToDisplay = stuff
  if (setActiveAtMount) {
    stuffToDisplay = selectors.getActiveStuff(store)
  }

  const StuffTag = small ? StuffSmall : StuffFull
  return <StuffTag stuff={stuffToDisplay} {...otherProps} />
}

export default Stuff
