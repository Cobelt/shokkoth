import React, { useState, useEffect } from 'react'
import get from 'lodash.get'
import { Spinner, Icon, Row, Dropdown, Column, Grid } from 'muejs'
import { CHARACTERS } from 'shokkoth-constants'

import useBreeds from '../../hooks/useBreeds'

import { MaleGenderIcon, FemaleGenderIcon } from '../../assets/svg/genders'

import { BREEDS_IMG_URI } from '../../constants/URIs'

import './stylesheet.styl'


const Avatar = ({ small, breed, setBreed = () => undefined, gender = 'male', setGender = () => undefined, withArrows = false, ...otherProps }) => {
  const { breeds, loading: loadingBreeds } = useBreeds()
  
  const [rotation, setRotation] = useState(1)

  if (!breed) return null

  const triggerImg = small ? 
    `${BREEDS_IMG_URI}/${breed.name.toLowerCase()}/heads/${gender.toLowerCase()}.png` :
    `${BREEDS_IMG_URI}/${breed.name.toLowerCase()}/full/${gender.toLowerCase()}/${isNaN(rotation) || rotation < 0 || rotation > 8 ? 1 : rotation}.png`

  return (
      <Row className="align-items-center justify-center relative" {...otherProps}>
        { withArrows && !small && <Icon className="text-primary absolute left-0 z-index-5" size="md" icon="keyboard_arrow_left" onClick={() => setRotation((rotation+1)%8)} />}

        <Dropdown
          detached={small}
          side={'center'}
          trigger={(
            <img className="pointer" alt={`Avatar ${breed.name} (${gender})`} src={triggerImg} />
          )}
          contentStyle={{ top: small && '26%', minWidth: 'calc(6 * 48px + 5 * 6px + 2 * 20px)', padding: 18 }}
          renderChildren={({ close }) => (
              <Column>
                <Row className="justify-center mb-15">
                  <MaleGenderIcon className="mr-10" onClick={() => setGender(CHARACTERS.MALE)} />
                  <FemaleGenderIcon onClick={() => setGender(CHARACTERS.FEMALE)} />
                </Row>
              
                <Grid columnsTemplate="repeat(auto-fit, 48px)" gap="6px" className="justify-center">
                  { get(breeds, 'length') > 0 && breeds.map(breed => (
                    <img
                      key={breed._id}
                      src={`${BREEDS_IMG_URI}/${get(breed, 'name').toLowerCase() }/heads/${gender}.png`} 
                      style={{ maxHeight: 56, objectFit: 'contain' }}
                      alt={breed.name}
                      title={breed.name}
                      onClick={() => { setBreed(breed); close() }}
                    /> 
                  )) }
                </Grid>
              </Column>
          ) }
        />
        

        { withArrows && !small && <Icon className="text-primary absolute right-0 z-index-5" size="md" icon="keyboard_arrow_right" onClick={() => setRotation(rotation <= 0 ? 7 : rotation-1)} /> }
      </Row>
  )
}

export default Avatar
