import React, { useState } from 'react';
import { Element } from 'muejs';

import { arrayToClassName } from '../../utils/common';
import './stylesheet.styl';


const Equipment = ({ index, className, style, equipment, equip = () => undefined, select = () => undefined, isSelected = false, ...otherProps }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Element
      className={arrayToClassName(['equipment', loading && 'loading', isSelected && 'isSelected', className])}
      onClick={() => select(isSelected ? undefined : { equipment })}
      onDoubleClick={() => equip({ equipment })}
      style={{ ...style, '--delay': index ? `${(index+1)*150}ms` : undefined }}
    >
      <img alt={equipment.name} src={`https://img.shokkoth.fr/assets/equipments/${equipment.ankamaId}.png`} onLoad={() => setLoading(false)} />
    </Element>
  );
}

export default Equipment;
