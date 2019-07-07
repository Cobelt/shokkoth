import React, { Fragment } from 'react';
import { Column } from 'muejs';

import '../stylesheet.styl';

const StatsColumn = ({ className, statsData, statsValues, postValueLabel = '', ...otherProps }) => (
  <Column className={["stats-column", className].filter(e => !!e).join(' ').trim()} {...otherProps}>
    { Object.entries(statsData).map(([stat, imgUrl], index) => (
      <span key={stat} className="character-stat-info" title={stat}>
        <img src={`//img.shokkoth.tk/assets/stats/${imgUrl}`} />
        <span>
          { statsValues[stat] }
          { postValueLabel }
        </span>
      </span>
    )) }
  </Column>
);

export default StatsColumn;
