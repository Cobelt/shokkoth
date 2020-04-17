import React, { useState } from 'react';
import get from 'lodash.get';
import { Link } from 'react-router-dom';

import Stuff from '../index.js';

import './stylesheet.styl';

const StuffsList = ({ error, stuffs, globalCharacter, small, delete: DeleteButton, editable = false }) => {
  if (error) return null;
  return !error && stuffs.map(stuff => (
    <Link key={`stuff#${stuff._id}`} className="relative flex justify-center link-to-watch" to={(editable ? '/stuffs/edit/' : '/stuffs/') + stuff._id}>
      <Stuff small={small} elementClassName="stuff-preview align-start" editable={false} setActiveAtMount={false} character={globalCharacter || get(stuff, 'character')} stuff={stuff} />
      { editable && DeleteButton && <DeleteButton stuff={stuff} /> }
    </Link>
  ));
}

export default StuffsList;
