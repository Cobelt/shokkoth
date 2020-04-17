import React, { useState } from 'react';

import { generateImageLink } from '../../utils/hexGenerator';
import { arrayToClassName } from '../../utils/common';

import './stylesheet.styl';


const Breed = ({ index, breed, active, onClick, ...otherProps }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={arrayToClassName(['breed', loading && 'loading', active && 'active'])}
      style={{ '--delay': index ? `${(index+1)*150}ms` : undefined }}
      onClick={onClick}
      {...otherProps}
    >
      <img
        src={`//img.shokkoth.fr/assets/breeds/heads/${breed.name.toLowerCase()}/avatar.png`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

export default Breed;
//generateImageLink({ mode: 'head', head: breed[gender].heads[0], defaultColors: breed[gender].defaultColors })
//`//img.shokkoth.fr/assets/breeds/heads/${breed.name}/${gender}-1.png`
