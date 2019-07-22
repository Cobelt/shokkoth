import React from 'react';
import get from 'lodash.get';

import Stat from './Stat';

const Stats = ({ keyPrefix, statistics, ...otherProps }) => !!get(statistics, 'length') && statistics.map(
  (stat, index) => (
    <Stat
      key={`${keyPrefix}#stat#${stat.name}#${index}`}
      index={index}
      stat={stat}
      {...otherProps}
    />
  )
);

export default Stats;
