import React, { useState } from 'react';
import get from 'lodash.get';
import { Element, Icon } from 'muejs';

import Avatar from '../Avatar';

import './stylesheet.styl';


const AvatarWithArrows = ({ breed, gender = 'male', ...otherProps }) => {
  const [rotation, setRotation] = useState(1)
  if (!breed) return null;

  return (
    <Element className="avatar-with-arrows relative" {...otherProps}>
      <Icon className="rotation-arrow left" size="md" icon="keyboard_arrow_left" onClick={() => setRotation((rotation+1)%8)} />
      <Avatar breed={breed} gender={gender} rotation={rotation} />
      <Icon className="rotation-arrow right" size="md" icon="keyboard_arrow_right" onClick={() => setRotation(rotation <= 0 ? 7 : rotation-1)} />
    </Element>
  );
};

export default AvatarWithArrows;
