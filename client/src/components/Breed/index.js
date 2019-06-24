import React, { useState } from 'react';

import { generateImageLink } from '../../utils/hexGenerator';

import './stylesheet.styl';


const Breed = ({ index, breed, gender, active, onClick, ...otherProps }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={['breed', loading && 'loading', active && 'active'].filter(e => !!e).join(' ').trim()}
      style={{ '--delay': index ? `${(index+1)*150}ms` : undefined }}
      {...otherProps}
    >
      <img
        src={`//img.shokkoth.tk/assets/breeds/heads/${breed.name}/${gender}-1.png`}
        onClick={onClick}
        onLoad={() => setLoading(false)}
        onError={(e)=>{ e.target.onerror = null; e.target.src = generateImageLink({ mode: 'head', head: breed[gender].head || breed[gender].heads[0], defaultColors: breed[gender].defaultColors }) }}
      />
    </div>
  );
}

export default Breed;
//generateImageLink({ mode: 'head', head: breed[gender].heads[0], defaultColors: breed[gender].defaultColors })
//`//img.shokkoth.tk/assets/breeds/heads/${breed.name}/${gender}-1.png`
