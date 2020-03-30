import React, { Fragment } from 'react';
import { Row } from 'muejs';
import { arrayToClassName } from '../../../utils/common';

import '../stylesheet.styl';

const StatsLine = ({ className, statsData, statsValues, suffix = '', ...otherProps }) => (
  <Row className={arrayToClassName(["stats-line", className])} {...otherProps}>
    { Object.entries(statsData).map(([stat, imgUrl], index) => (
      <span key={stat} className="character-stat-info" title={stat}>
        <img src={`//img.shokkoth.fr/assets/stats/${imgUrl}`} />
        <span>
          { statsValues[stat] }
          { typeof suffix === 'function' ? suffix(stat) : suffix }
        </span>
      </span>
    )) }
  </Row>
);

export default StatsLine;
