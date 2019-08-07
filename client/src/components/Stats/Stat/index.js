import React, { useState } from 'react';
import { Element } from 'muejs';

import StatLabel from '../Label';

import { arrayToClassName } from '../../../utils/common';
import './stylesheet.styl';


const Stat = ({ index, statType, stat, className, ...otherProps }) => {
  const text = (stat.value ? [stat.value, stat.name] : [
    stat.min,
    stat.min && stat.max && stat.min !== stat.max && 'à',
    stat.max !== stat.min && stat.max,
    stat.name
  ]).filter(e => !!e).join(' ').trim();

  return (
    <Element className={arrayToClassName([statType ? statType : 'stat', className])} {...otherProps}>
      <StatLabel statType={statType} index={index} stat={stat} className="marg-r-5" />
      { statType === 'passive' ? stat.name : text }
    </Element>
  );
}

export default Stat;
