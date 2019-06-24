import React, { useState } from 'react';
import { Element } from 'muejs';

import './stylesheet.styl';


const Equipment = ({ index, equipment, select = () => undefined, isSelected = false }) => {
  const [loading, setLoading] = useState(true);

  console.log('OK');

  return (
    <Element
      className={['equipment', loading && 'loading'].filter(e => !!e).join(' ').trim()}
      onClick={() => select(isSelected ? undefined : equipment)}
      style={{ '--delay': index ? `${(index+1)*150}ms` : undefined }}
    >
      <img alt={equipment.name} src={equipment.imgUrl} onLoad={() => setLoading(false)} />
    </Element>
  );
}

export default Equipment;
