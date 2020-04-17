import React, { useState, useContext, useEffect } from 'react'
import { FullPageSpinner } from 'muejs'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { CHARACTERS, STATS } from 'shokkoth-constants'

import StuffForm from '../../../components/Stuff/Form'

import EquipmentsContext from '../../../store/context/equipments'
import * as actions from '../../../store/actions/equipments'
import * as selectors from '../../../store/selectors/equipments'

import * as mutations from '../../../queries/mutations'


import './stylesheet.styl'

const { VITALITY, WISDOM, STRENGTH, INTELLIGENCE, CHANCE, AGILITY } = STATS


const New = () => {
  const [store, dispatch] = useContext(EquipmentsContext)

  useEffect(() => {
    actions.setActiveStuff({
      stuff: {
        name: 'Nouvel équipement',
        public: true,
        equipments: [],
        level: 200,
        gender: CHARACTERS.MALE,
        stats: {
          [VITALITY]: {
            base: 0, parcho: 100
          },
          [WISDOM]: {
            base: 0, parcho: 100
          },
          [STRENGTH]: {
            base: 0, parcho: 100
          },
          [INTELLIGENCE]: {
            base: 0, parcho: 100
          },
          [CHANCE]: {
            base: 0, parcho: 100
          },
          [AGILITY]: {
            base: 0, parcho: 100
          },
        }
      }
    }, [store, dispatch])
  }, [])
  
  const stuff = selectors.getActiveStuff(store)

  const [createStuff] = useMutation(gql(mutations.createStuff))


  if (!stuff) return <FullPageSpinner />

  return (
    <div className="stuff-editor">
      <StuffForm stuff={stuff} beforeSave={createStuff} />
    </div>
  )
}

export default New
