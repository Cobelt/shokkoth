import React, { useState } from 'react';

import { arrayToClassName } from '../../../utils/common';


const Stat = ({ index, statType, stat, children, gender, onClick, className, ...otherProps }) => {
  const [loading, setLoading] = useState(true);

  const imgProps = { onClick, onLoad: () => setLoading(false) };

  return (
    <div
      className={arrayToClassName(['stat-label', loading && 'loading', className])}
      style={{ '--delay': index ? `${(index+1)*150}ms` : undefined }}
      {...otherProps}
    >
      <img src={`//img.shokkoth.fr/assets/stats/${stat.imgUrl}`} alt={stat.name} title={statType === 'passive' ? 'Passif' : stat.name} {...imgProps} />
    </div>
  );
}

export default Stat;
