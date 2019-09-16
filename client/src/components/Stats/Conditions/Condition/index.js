import React from 'react';
import { Element, Icon } from 'muejs';

import { arrayToClassName } from '../../../../utils/common';

// TODO verify if condition is respected
const Condition = ({ condition, className, ...otherProps }) => (
  <Element className={arrayToClassName(['condition', 'flex', className])} {...otherProps}>
    <Icon icon="warning" size="sm" className="font-warning" />
    { condition }
  </Element>
);

export default Condition;
