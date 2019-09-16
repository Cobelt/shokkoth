import React from 'react';
import get from 'lodash.get';

import Condition from './Condition';

  const Conditions = ({ keyPrefix, conditions, ...otherProps }) => !!get(conditions, 'length') && conditions.map(
  (condition, index) => (
    <Condition
      key={`${keyPrefix}#condition#${condition}#${index}`}
      index={index}
      condition={condition}
      {...otherProps}
    />
  )
);

export default Conditions;
