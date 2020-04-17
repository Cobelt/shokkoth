import React, { useState, useContext, useEffect } from 'react'
import { Grid, Row, Column, Input, Spinner, Dropdown } from 'muejs'
import get from 'lodash.get'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { CHARACTERS } from 'shokkoth-constants'

import useDebounce from '../../../hooks/useDebounce'
import useBreeds from '../../../hooks/useBreeds'

import EquipmentsContext from '../../../store/context/equipments'
import * as actions from '../../../store/actions/equipments'
import * as selectors from '../../../store/selectors/equipments'

import { BREEDS_IMG_URI } from '../../../constants/URIs'
import { MaleGenderIcon, FemaleGenderIcon } from '../../../assets/svg/genders'


import NameAndLevel from './Header'
import Stuff from '../Preview'
import Boostable from '../../Stats/Boostable'
import Primary from '../../Stats/Primary'
import Secondary from '../../Stats/Secondary'
import StaticDamages from '../../Stats/StaticDamages'
import Resistances from '../../Stats/Resistances'

// import ShowDetails from '../../ShowDetails'
import EquipmentsSearch from '../../Equipment/Search'

import * as mutations from '../../../queries/mutations'
import { getItemOfCategory } from '../../../utils/equipments'

import './stylesheet.styl'


const StuffForm = ({ stuff, beforeSave = () => undefined, refetch = () => undefined, ...otherProps}) => {
  const [store, dispatch] = useContext(EquipmentsContext)
  
  const { breeds, loading: loadingBreeds } = useBreeds()

  useEffect(() => {
      if (get(breeds, 'length') > 0) {
        actions.changeStuffBreed(breeds[0], [store, dispatch])
      }
  }, [breeds])

  // const [updateStuff] = useMutation(gql(mutations.updateStuff))
  // const [equipMutation] = useMutation(gql(mutations.equip))

  const updateAndRefetchStuff = ({ variables }) => {
  //   updateStuff({ variables })
  //   refetch()
  }

  


  return (
    <Column className="stuff-form-container ph-10vw" {...otherProps}>
      <NameAndLevel />

      <Row className="nowrap justify-center">

        <Column className="stuff-form mr-5vw">

          <Stuff
            elementClassName="stuff-preview align-start"
            stuff={stuff}
            updateStuff={updateAndRefetchStuff}
            setBreed={breed => actions.changeStuffBreed(breed, [store, dispatch])}
            setGender={gender => actions.changeStuffGender(gender, [store, dispatch])}
          />

          <Boostable stuff={stuff} />
          <Primary stuff={stuff} />
          
          <StaticDamages stuff={stuff} />
          <Resistances stuff={stuff} />
          
          <Secondary stuff={stuff} />
          
        </Column>

        <EquipmentsSearch className="lg-fixed left-0 right-0 bottom-0 flex-1 z-index-25" />
      </Row>
    </Column>
  )
}

export default StuffForm
