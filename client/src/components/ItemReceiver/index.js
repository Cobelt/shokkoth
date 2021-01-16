import React, { useContext, useState, useEffect } from 'react'
import get from 'lodash.get'
import { Element } from 'muejs'

import useClickPreventionOnDoubleClick from '../../hooks/useClickPreventionOnDoubleClick'
import useDebounce from '../../hooks/useDebounce'

import EquipmentsContext from '../../store/context/equipments'
import * as selectors from '../../store/selectors/equipments'
import * as actions from '../../store/actions/equipments'

import Equipment from '../Equipment/Preview'

import { arrayToClassName } from '../../utils/common'

import './stylesheet.styl'


const ItemReceiver = ({ icon: Icon, index = 0, category, editable = true, className, ...otherProps }) => {
  const [store, dispatch] = useContext(EquipmentsContext)
  
  const [click, fireClick] = useState(false)
  const [dblClick, fireDblClick] = useState(false)
  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(() => fireClick(true), () => fireDblClick(true));
  
  const [newStep, setNewStep] = useState(null)
  const debouncedNewStep = useDebounce(newStep, 150)

  const equipment = selectors.getStuffEquipment(store, { category, index })
  
  const currentStep = selectors.getActiveStep(store) || {}
  
  useEffect(() => {
    setNewStep(currentStep)
  }, [JSON.stringify(currentStep)])
  

  useEffect(() => {
    if (click && editable) {
      setNewStep(get(newStep, 'category') === category && get(newStep, 'index') === index ? {} : { category, index })
      fireClick(false)
    }
  }, [click])

  

  useEffect(() => {
    if (debouncedNewStep !== null && 
      (get(currentStep, 'category') !== get(debouncedNewStep, 'category') ||
      get(currentStep, 'index') !== get(debouncedNewStep, 'index'))
    ) {
      actions.changeStep(debouncedNewStep, [store, dispatch])
    }
  }, [JSON.stringify(debouncedNewStep)])


  return (
    <Element
      className={arrayToClassName(['equipment-input', equipment && 'filled', category, get(newStep, 'category') === category && get(newStep, 'index') === index && 'active', className])}
      onClick={handleClick}
      {...otherProps}
    >
      {
        equipment ?
          <Equipment
            equipment={equipment}
            editable={editable}
            doubleClick={dblClick}
            fireDoubleClick={fireDblClick}
            onDoubleClick={handleDoubleClick}
            unequipOnDoubleClick
          /> :
          <Icon />
      }
    </Element>
  )
}

export default ItemReceiver
