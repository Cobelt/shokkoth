import React from 'react';
import { Element } from 'muejs';

import StatLabel from '../../Label';

import { arrayToClassName } from '../../../../utils/common';
import '../../Stat/stylesheet.styl';


const Characteristic = ({ index, stat, className, ...otherProps }) => {
  const text = (stat.value ? [stat.value, stat.name, stat.shortType] : [
    stat.min,
    stat.min && stat.max && stat.min !== stat.max && 'à',
    stat.max !== stat.min && stat.max,
    stat.name
  ]).filter(e => !!e).join(' ').trim();

  return (
    <Element className={arrayToClassName(['characteristic', 'flex', className])} {...otherProps}>
      <StatLabel index={index} stat={stat} className="mr-5" />
      { text }
    </Element>
  );
}

export default Characteristic;
