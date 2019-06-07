import React, { useState } from 'react';
import { Element } from 'muejs';

import { generateImageLink } from '../../utils/hexGenerator';

import './stylesheet.styl';


const Breed = ({ index, breed, gender, active, onClick }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={['breed', loading && 'loading', active && 'active'].filter(e => !!e).join(' ').trim()}
      style={{ '--delay': index ? `${(index+1)*150}ms` : undefined }}
    >
      <img
        src={generateImageLink({ mode: 'head', head: breed[gender].head || breed[gender].heads[0], defaultColors: breed[gender].defaultColors })}
        onClick={onClick}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

export default Breed;
