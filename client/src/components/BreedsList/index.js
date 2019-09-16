import React, { useEffect } from 'react';
import isEqual from 'lodash.isequal';
import get from 'lodash.get';
import { Element } from 'muejs';

import Breed from '../Breed';
import { MaleGenderIcon, FemaleGenderIcon } from '../../assets/svg/genders';

import { arrayToClassName } from '../../utils/common';
import useBreeds from '../../hooks/useBreeds';

import './stylesheet.styl';


const BreedsList = ({ select, selected, className, ...otherProps }) => {
  const { loading, breeds, error } = useBreeds();
  useEffect(() => {
    if (!selected && breeds.length > 0) {
      select(breeds[0]);
    }
  }, [breeds.length > 0])

  if (error) return `Error! ${error.message}`;

  return breeds.map((breed, index) => <Breed key={JSON.stringify(breed)} breed={breed} active={breed._id === get(selected, '_id')} onClick={() => select(breed)} />);
}

export default BreedsList;
