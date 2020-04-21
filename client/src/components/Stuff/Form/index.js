import React, { useContext, useEffect, useState } from 'react'
import { Row, Column } from 'muejs'
import get from 'lodash.get'

import useMediaQuery from '../../../hooks/useMediaQuery'
import useBreeds from '../../../hooks/useBreeds'

import EquipmentsContext from '../../../store/context/equipments'
import * as actions from '../../../store/actions/equipments'


import NameAndLevel from './Header'
import Stuff from '../Preview'
import Boostable from '../../Stats/Boostable'
import Primary from '../../Stats/Primary'
import Secondary from '../../Stats/Secondary'
import StaticDamages from '../../Stats/StaticDamages'
import Resistances from '../../Stats/Resistances'

// import ShowDetails from '../../ShowDetails'
import EquipmentsSearch from '../../Equipment/Search'

import './stylesheet.styl'


const StuffForm = ({ stuff, beforeSave = () => undefined, refetch = () => undefined, ...otherProps}) => {
  const [store, dispatch] = useContext(EquipmentsContext)
  const [small, setSmall] = useState(false)

  const smallWidth = useMediaQuery('(max-width: 640px)')
  
  const { breeds, loading: loadingBreeds } = useBreeds()

  useEffect(() => {
      if (get(breeds, 'length') > 0) {
        actions.changeStuffBreed(breeds[0], [store, dispatch])
      }
  }, [breeds])  


  return (
    <Column className="stuff-form-container ph-10vw" {...otherProps}>
      <NameAndLevel small={small} setSmall={setSmall} />

      <Row className="nowrap justify-center">

        <Column className="stuff-form min-width-50 mr-5vw">

          <Stuff
            elementClassName="stuff-preview align-start"
            stuff={stuff}
            small={smallWidth || small}
            setBreed={breed => actions.changeStuffBreed(breed, [store, dispatch])}
            setGender={gender => actions.changeStuffGender(gender, [store, dispatch])}
          />

          <Boostable stuff={stuff} small={smallWidth} />
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
