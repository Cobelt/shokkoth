import React from 'react';
import isEqual from 'lodash.isequal';

import { Element } from 'muejs';

import Breed from '../Breed';
import { MaleGenderIcon, FemaleGenderIcon } from '../../assets/svg/genders';

import { BREEDS } from '../../constants/breeds';

import './stylesheet.styl';


const BreedsList = ({ select, selected, setGender, gender, className, ...otherProps }) => {
  return (
    <Element className={["breeds", className].filter(e => !!e).join(' ').trim()} {...otherProps}>
      <div>
        <MaleGenderIcon className={`male-icon ${gender === 'm' ? 'active': ''}`} onClick={() => setGender('m')} />
        <FemaleGenderIcon className={`female-icon ${gender === 'f' ? 'active': ''}`} onClick={() => setGender('f')} />
      </div>
      { BREEDS.map((breed, index) => <Breed key={JSON.stringify(breed)} index={index} breed={breed} gender={gender} active={isEqual(breed, selected)} onClick={() => select(breed)} />) }
    </Element>
  );
}

export default BreedsList;
