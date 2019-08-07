import React from 'react';
import get from 'lodash.get';
import { Element } from 'muejs';

import { generateImageLink } from '../../utils/hexGenerator';

import './stylesheet.styl';


const Avatar = ({ breed, gender = 'male', rotation = 1, ...otherProps }) => {
  if (!breed) return null;

  const avatarLink = get(breed, `skins.${gender}`) && generateImageLink({ ...breed.skins[gender], head: breed.skins[gender].heads[0], rotation, padding: 10 });
  return (
    <Element className="avatar" {...otherProps}>
      <img alt="avatar" src={avatarLink} />
    </Element>
  );
};

export default Avatar;
