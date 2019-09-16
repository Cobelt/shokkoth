import React from 'react';
import get from 'lodash.get';

import Characteristic from './Characteristic';

const Characteristics = ({ keyPrefix, characteristics, className, ...otherProps }) => !!get(characteristics, 'length') && characteristics.map(
  (stat, index) => (
    <Characteristic
      key={`${keyPrefix}#characteristic#${stat.name}#${index}`}
      index={index}
      stat={stat}
      {...otherProps}
    />
  )
);

export default Characteristics;
