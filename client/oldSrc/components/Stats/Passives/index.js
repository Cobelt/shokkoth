import React from 'react';
import get from 'lodash.get';

import Passive from './Passive';

  const Passives = ({ keyPrefix, passives, ...otherProps }) => !!get(passives, 'length') && passives.map(
  (stat, index) => (
    <Passive
      key={`${keyPrefix}#passive#${stat.name}#${index}`}
      index={index}
      stat={stat}
      {...otherProps}
    />
  )
);

export default Passives;
