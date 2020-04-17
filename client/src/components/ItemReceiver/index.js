import React, { useContext } from 'react'
import isEqual from 'lodash.isequal'
import { Element } from 'muejs'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import EquipmentsContext from '../../store/context/equipments'
import * as selectors from '../../store/selectors/equipments'
import * as actions from '../../store/actions/equipments'

import Equipment from '../Equipment/Preview'

import { arrayToClassName } from '../../utils/common'

import './stylesheet.styl'


const ItemReceiver = ({ icon: SVGIcon, index = 0, category, editable = true, className, ...otherProps }) => {
  const [store, dispatch] = useContext(EquipmentsContext)
  const equipment = selectors.getStuffEquipment(store, { category, index })
  
  const currentStep = selectors.getActiveStep(store) || {}
  const changeStep = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!editable) return false
    actions.changeStep({ category: currentStep.category === category && currentStep.index === index ? '' : category, index }, [store, dispatch])
    return false
  }

  return (
    <Element
      className={arrayToClassName(['equipment-input', equipment && 'filled', category, currentStep.category === category && currentStep.index === index && 'active', className])}
      onClick={changeStep}
      {...otherProps}
    >
      {
        equipment ?
        <Equipment equipment={equipment} unequipOnDoubleClick /> :
        <SVGIcon />
      }
    </Element>
  )
}

export default ItemReceiver
