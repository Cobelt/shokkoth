import React, { useState, useEffect } from 'react'
import get from 'lodash.get'
import { Spinner, Icon, Row, Dropdown, Column, Grid } from 'muejs'
import { CHARACTERS } from 'shokkoth-constants'

import useBreeds from '../../hooks/useBreeds'

import { MaleGenderIcon, FemaleGenderIcon } from '../../assets/svg/genders'

import { BREEDS_IMG_URI } from '../../constants/URIs'

import './stylesheet.styl'


const Avatar = ({ breed, setBreed = () => undefined, gender = 'male', setGender = () => undefined, withArrows = false, ...otherProps }) => {
  const { breeds, loading: loadingBreeds } = useBreeds()
  
  const [rotation, setRotation] = useState(1)

  if (!breed) return null

  return (
      <Row className="align-items-center justify-center relative" {...otherProps}>
        { withArrows && <Icon className="text-primary absolute left-0" size="md" icon="keyboard_arrow_left" onClick={() => setRotation((rotation+1)%8)} />}

        <Dropdown
            side='center'
            trigger={(
              <img className="pointer" alt={`Avatar ${breed.name} (${gender})`} src={`${BREEDS_IMG_URI}/${breed.name.toLowerCase()}/full/${gender.toLowerCase()}/${isNaN(rotation) || rotation < 0 || rotation > 8 ? 1 : rotation}.png`} />
            )}
            contentStyle={{ minWidth: 'calc(6 * 48px + 5 * 6px + 2 * 20px)', padding: 18 }}
          >
            { (
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
                        onClick={() => setBreed(breed)}
                      /> 
                    )) }
                  </Grid>
                </Column>
            ) }
          </Dropdown>        
        

        { withArrows && <Icon className="text-primary absolute right-0" size="md" icon="keyboard_arrow_right" onClick={() => setRotation(rotation <= 0 ? 7 : rotation-1)} /> }
      </Row>
  )
}

export default Avatar
