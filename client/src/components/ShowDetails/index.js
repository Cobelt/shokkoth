import React, { useState, useEffect } from 'react';
import { Grid, Element, Icon, Row } from 'muejs';
import get from 'lodash.get';

import EquipmentDetails from './EquipmentDetails';
import SetDetails from './SetDetails';

import { DETAIL_EQUIPMENT, DETAIL_SET } from '../../constants/equipments';

import { arrayToClassName } from '../../utils/common';
import './stylesheet.styl';

const ShowDetails = ({ equipment, selectEquipment, equip, className, ...otherProps }) => {
  const [display, setDisplay] = useState(DETAIL_EQUIPMENT);
  // const [lastEquipment, setLastEquipment] = useState(equipment);

  // when changing item, return to item and not set
  useEffect(() => {
    setDisplay(DETAIL_EQUIPMENT)
    // setLastEquipment(equipment);
  }, [equipment]);

  // if (!lastEquipment) return null;

  return (
    <Element className={arrayToClassName(['show-details', display === DETAIL_EQUIPMENT ? 'equipments-details' : 'set-details', 'align-start', 'bg-primary', 'relative', 'pad-1-rem', equipment ? 'show' : 'hide', className])} {...otherProps}>
      <Grid columnsTemplate="4rem 1fr 2.5rem" colGap="1rem">
        <Icon col={3} row={1} className="align-start" style={{ margin: 0, justifySelf: 'right' }} icon="close" size="xs" onClick={() => selectEquipment()} />

        <EquipmentDetails
          active={display === DETAIL_EQUIPMENT}
          equipment={equipment}
          displaySet={() => setDisplay(DETAIL_SET)}
          equip={equip}
        />

        <SetDetails
          active={display === DETAIL_SET}
          set={get(equipment, 'set')}
          displayEquipment={() => setDisplay(DETAIL_EQUIPMENT)}
          selectEquipment={selectEquipment}
          equip={equip}
        />

      </Grid>
    </Element>
  );
};

export default ShowDetails;
