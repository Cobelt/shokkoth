import React from 'react';
import isEqual from 'lodash.isequal';
import { Grid } from 'muejs';

import Equipment from '../Equipment';
import './stylesheet.styl';

const EquipmentsList = ({ equipments, select, selected, equip, className, ...otherProps }) => (
  <Grid
    columnsTemplate={'repeat(auto-fit, minmax(2vw, 4.5rem))'}
    rowsTemplate={'repeat(auto-fit, 1fr)'}
    className={["equipments-list", "no-scrollbar", "justify-evenly", "align-start", className].filter(e => !!e).join(' ').trim()}
    {...otherProps}
  >
    { equipments.length > 0 && equipments.map((equipment, index) => (
      <Equipment
        key={equipment._id}
        index={index}
        equipment={equipment}
        equip={() => equip(equipment)}
        select={() => select(equipment)}
        isSelected={isEqual(equipment, selected)}
      />
    )) }
  </Grid>
);

export default EquipmentsList;
