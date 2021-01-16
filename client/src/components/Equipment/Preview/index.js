import React, { useState, useContext, useEffect } from 'react'
import isEqual from 'lodash.isequal'
import { Element, Tooltip, Column } from 'muejs'

import MainStatsIcons from './MainStatsIcons'

import { arrayToClassName } from '../../../utils/common'
import { EQUIPMENTS_IMG_URI } from '../../../constants/URIs'

import EquipmentsContext from '../../../store/context/equipments'
import * as actions from '../../../store/actions/equipments'
import * as selectors from '../../../store/selectors/equipments'

import './stylesheet.styl'


const Equipment = ({ 
  index,
  className,
  style,
  editable = true,
  equipment,
  displayMainStats = false,
  doubleClick,
  fireDoubleClick = () => undefined,
  onDoubleClick = () => undefined,
  unequipOnDoubleClick = false,
  ...otherProps
}) => { 
  const [isBroken, setBroken] = useState(false)

  function handleError(e) {
    e.target.onerror = null;
    e.target.src = EQUIPMENTS_IMG_URI + '/broken.png'
    setBroken(true)
  }

  const [store, dispatch] = useContext(EquipmentsContext)
  const selected = selectors.getDisplayedEquipment(store)
  const isSelected = isEqual(equipment, selected)

  useEffect(() => {
    if (doubleClick && editable) {
      if (unequipOnDoubleClick) {
        actions.unequip({ equipment }, [store, dispatch])   
      }
      else {
        actions.equip({ equipment }, [store, dispatch])
      }

      fireDoubleClick(false)
    }
  }, [doubleClick])


  return (
    <Column
      className={arrayToClassName(['equipment', isBroken && 'broken', isSelected && 'isSelected', className])}
      onDoubleClick={onDoubleClick}
      style={{ ...style }}
    >
      <img alt={equipment.name} src={`${EQUIPMENTS_IMG_URI}/${equipment.ankamaId}.png`} onError={handleError} />

      { displayMainStats && <MainStatsIcons equipment={equipment} /> }
    </Column>
  )
}

export default Equipment
