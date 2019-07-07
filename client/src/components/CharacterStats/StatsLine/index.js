import React, { Fragment } from 'react';
import { Row } from 'muejs';

import '../stylesheet.styl';

const StatsLine = ({ className, statsData, statsValues, postValueLabel = '', ...otherProps }) => (
  <Row className={["stats-line", className].filter(e => !!e).join(' ').trim()} {...otherProps}>
    { Object.entries(statsData).map(([stat, imgUrl], index) => (
      <span key={stat} className="character-stat-info" title={stat}>
        <img src={`//img.shokkoth.tk/assets/stats/${imgUrl}`} />
        <span>
          { statsValues[stat] }
          { postValueLabel }
        </span>
      </span>
    )) }
  </Row>
);

export default StatsLine;
