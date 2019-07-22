import React, { useState } from 'react';
import { Element } from 'muejs';
import './stylesheet.styl';


const Equipment = ({ index, className, style, equipment, equip = () => undefined, select = () => undefined, isSelected = false, ...otherProps }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Element
      className={['equipment', loading && 'loading', isSelected && 'isSelected', className].filter(e => !!e).join(' ').trim()}
      onClick={() => select(isSelected ? undefined :  { equipment })}
      onDoubleClick={() => equip({ equipment })}
      style={{ ...style, '--delay': index ? `${(index+1)*150}ms` : undefined }}
    >
      <img alt={equipment.name} src={equipment.imgUrl} onLoad={() => setLoading(false)} />
    </Element>
  );
}

export default Equipment;
