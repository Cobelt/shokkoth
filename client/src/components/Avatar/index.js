import React from 'react';
import get from 'lodash.get';
import { Element } from 'muejs';

import { generateImageLink } from '../../utils/hexGenerator';

import './stylesheet.styl';


const Avatar = ({ breed, gender = 'male', rotation = 1, head = 0, ...otherProps }) => {
  if (!breed) return null;

  const avatarLink = get(breed, `skins.${gender.toLowerCase()}`) && generateImageLink({ ...get(breed, `skins[${gender.toLowerCase()}]`), head: get(breed, `skins[${gender.toLowerCase()}].heads[${head}]`), rotation, padding: 10 });
  return (
    <Element className="avatar" {...otherProps}>
      <img alt="avatar" src={avatarLink} />
    </Element>
  );
};

export default Avatar;
