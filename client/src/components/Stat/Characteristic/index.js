import React from 'react';
import { Element } from 'muejs';

import StatLabel from '../Label';

import '../stylesheet.styl';


const Characteristic = ({ index, stat, className, ...otherProps }) => {
  const text = [
    stat.min,
    stat.min && stat.max && stat.min !== stat.max && 'à',
    stat.max !== stat.min && stat.max,
    stat.shortType
  ].filter(e => !!e).join(' ').trim();

  return (
    <Element className={["stat", className].filter(e => !!e).join(' ')} {...otherProps}>
      <StatLabel index={index} stat={stat} className="marg-r-5" />
      { text }
    </Element>
  );
}

export default Characteristic;
