import React from 'react';
import isEqual from 'lodash.isequal';
import { Grid, Spinner } from 'muejs';

import Equipment from '../Equipment';

import { arrayToClassName } from '../../utils/common';
import './stylesheet.styl';

const EquipmentsList = ({ equipments = [], select, selected, equip, className, ...otherProps }) => {

  return (
    <Grid
      columnsTemplate={'repeat(auto-fit, minmax(2vw, 4.5rem))'}
      rowsTemplate={'repeat(auto-fit, 1fr)'}
      className={arrayToClassName(["equipments-list", "no-scrollbar", "justify-space-evenly", "align-start", className])}
      {...otherProps}
    >
      { equipments.map((equipment, index) => (
        <Equipment
          key={`equipment-list#${equipment._id}`}
          index={index}
          equipment={equipment}
          equip={equip}
          select={select}
          isSelected={isEqual(equipment, selected)}
        />
      )) }
    </Grid>
  );
}

export default EquipmentsList;
