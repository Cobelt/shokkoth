import React, { useState, useContext } from 'react'
import isEqual from 'lodash.isequal'
import { Element } from 'muejs'

import { arrayToClassName } from '../../../utils/common'
import { EQUIPMENTS_IMG_URI } from '../../../constants/URIs'

import EquipmentsContext from '../../../store/context/equipments'
import * as actions from '../../../store/actions/equipments'
import * as selectors from '../../../store/selectors/equipments'

import './stylesheet.styl'


const Equipment = ({ index, className, style, equipment, unequipOnDoubleClick = false, ...otherProps }) => {
  const [loading, setLoading] = useState(true)

  const [store, dispatch] = useContext(EquipmentsContext)
  const selected = selectors.getDisplayedEquipment(store)
  const isSelected = isEqual(equipment, selected)

  return (
    <Element
      className={arrayToClassName(['equipment', loading && 'loading', isSelected && 'isSelected', className])}
      // onClick={() => actions.display(isSelected ? undefined : { equipment }, [store, dispatch])}
      onDoubleClick={() => unequipOnDoubleClick ? actions.unequip({ equipment }, [store, dispatch]) : actions.equip({ equipment }, [store, dispatch])}
      style={{ ...style }}
    >
      <img alt={equipment.name} src={`${EQUIPMENTS_IMG_URI}/${equipment.ankamaId}.png`} onLoad={() => setLoading(false)} />
    </Element>
  )
}

export default Equipment
