import React, { useEffect } from 'react';
import isEqual from 'lodash.isequal';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

import { Element } from 'muejs';

import Breed from '../Breed';
import { MaleGenderIcon, FemaleGenderIcon } from '../../assets/svg/genders';

import { arrayToClassName } from '../../utils/common';
import { getBreeds } from '../../queries';

import './stylesheet.styl';


const BreedsList = ({ select, selected, className, ...otherProps }) => {
  const { loading, data: { breedMany: breeds = [] } = {}, error } = useQuery(gql(getBreeds));
  useEffect(() => {
    if (!selected && breeds.length > 0) {
      select(breeds[0]);
    }
  }, [breeds.length > 0])

  if (error) return `Error! ${error.message}`;

  return breeds.map((breed, index) => <Breed key={JSON.stringify(breed)} breed={breed} active={isEqual(breed, selected)} onClick={() => select(breed)} />);
}

export default BreedsList;
