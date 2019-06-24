import React, { useState } from 'react';
import { Element } from 'muejs';

import StatLabel from './Label';

import './stylesheet.styl';


const Stat = ({ index, statType, stat, className, ...otherProps }) => {
  const text = (stat.stuffValue ? [stat.stuffValue, stat.name] : [
    stat.min,
    stat.min && stat.max && stat.min !== stat.max && 'à',
    stat.max !== stat.min && stat.max,
    stat.name
  ]).filter(e => !!e).join(' ').trim();

  return (
    <Element className={["stat", className].filter(e => !!e).join(' ')} {...otherProps}>
      <StatLabel statType={statType} index={index} stat={stat} className="marg-r-5" />
      { statType === 'passive' ? stat.name : text }
    </Element>
  );
}

export default Stat;
