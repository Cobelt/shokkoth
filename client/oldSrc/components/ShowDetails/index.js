import React, { useState, useEffect } from 'react';
import { Grid, Element, Icon, Row } from 'muejs';
import get from 'lodash.get';

import EquipmentDetails from './EquipmentDetails';
import SetDetails from './SetDetails';
import StatsDetails from './StatsDetails';

import { arrayToClassName } from '../../utils/common';
import './stylesheet.styl';

const DETAIL_EQUIPMENT = 'equipments-details';
const DETAIL_SET = 'set-details';
const DETAIL_STATS = 'stats-details';

const ShowDetails = ({
  showStats, setShowStats, stats, setCharacStat, setParchoStat,
  equipment, selectEquipment, equip,
  className,
  ...otherProps
}) => {

  const [display, setDisplay] = useState(DETAIL_EQUIPMENT);
  const [lastEquipment, setLastEquipment] = useState(equipment);

  // when changing item, return to item and not set
  useEffect(() => {
    if (equipment) {
      setDisplay(DETAIL_EQUIPMENT)
      setLastEquipment(equipment);
    }
  }, [get(equipment, '_id')]);

  if (!lastEquipment && !showStats) return null;

  return (
    <Element className={arrayToClassName(['show-details align-start bg-primary relative p-15', display, (equipment || showStats) ? 'show' : 'hide', className])} {...otherProps}>
      <Grid columnsTemplate="20% 1fr 10%" gap="0.5em">
        <Icon col={3} row={1} className="align-start" style={{ margin: 0, justifySelf: 'right' }} icon="close" size="xs" onClick={() => selectEquipment()} />

        { showStats && !lastEquipment && (
          <StatsDetails
            active={display === DETAIL_STATS}
            stats={stats}
            setShowStats={setShowStats}
            setCharacStat={setCharacStat}
            setParchoStat={setParchoStat}
          />
        )}

        <EquipmentDetails
          active={display === DETAIL_EQUIPMENT}
          equipment={lastEquipment}
          displaySet={() => setDisplay(DETAIL_SET)}
          equip={equip}
        />

        <SetDetails
          active={display === DETAIL_SET}
          set={get(lastEquipment, 'set')}
          displayEquipment={() => setDisplay(DETAIL_EQUIPMENT)}
          selectEquipment={selectEquipment}
          equip={equip}
        />

      </Grid>
    </Element>
  );
};

export default ShowDetails;
