import React from 'react';
import get from 'lodash.get';
import { Row } from 'muejs';

import Characteristic from './Characteristic';

const Characteristics = ({ keyPrefix, characteristics, className, ...otherProps }) => {
  if (!get(characteristics, 'length')) return null;
  return (
    <Row className={["justify-evenly", className].filter(e => !!e).join(' ').trim()} {...otherProps}>
      { characteristics.map((stat, index) => (
        <Characteristic key={`${keyPrefix}#characteristic#${stat.name}#${index}`} index={index} stat={stat} />
      )) }
    </Row>
  );
}

export default Characteristics;
