import React, { Fragment } from 'react';
import { Column } from 'muejs';

import { arrayToClassName } from '../../../utils/common';
import '../stylesheet.styl';

const StatsColumn = ({ className, statsData, statsValues, suffix, ...otherProps }) => (
  <Column className={arrayToClassName(["stats-column", className])} {...otherProps}>
    { Object.entries(statsData).map(([stat, imgUrl], index) => (
      <span key={stat} className="character-stat-info" title={stat}>
        <img src={`//img.shokkoth.fr/assets/stats/${imgUrl}`} />
        <span>
          { statsValues[stat] }
          { typeof suffix === 'function' ? suffix(stat) : suffix }
        </span>
      </span>
    )) }
  </Column>
);

export default StatsColumn;
