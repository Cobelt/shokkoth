import React, { useState } from 'react';


const Stat = ({ index, statType, stat, children, gender, onClick, className, ...otherProps }) => {
  const [loading, setLoading] = useState(true);

  const imgProps = { onClick, onLoad: () => setLoading(false) };

  return (
    <div
      className={['stat-label', loading && 'loading', className].filter(e => !!e).join(' ').trim()}
      style={{ '--delay': index ? `${(index+1)*150}ms` : undefined }}
      {...otherProps}
    >
      <img src={stat.imgUrl} alt={stat.name} title={statType === 'passive' ? 'Passif' : stat.name} {...imgProps} />
    </div>
  );
}

export default Stat;
