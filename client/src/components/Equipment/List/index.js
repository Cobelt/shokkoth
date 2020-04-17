import React from 'react';
import get from 'lodash.get'
import { Grid, Spinner } from 'muejs';

import Equipment from '../Preview';

import { arrayToClassName } from '../../../utils/common';
import './stylesheet.styl';

const EquipmentsList = ({ equipments = [], className, loading, ...otherProps }) => {

  return (
    <Grid
      columnsTemplate={'repeat(auto-fit, calc(64px + 0.5vw))'}
      className={arrayToClassName(["equipments-list bg-input no-scrollbar justify-space-evenly align-start", className])}
      {...otherProps}
    >
      { !get(equipments, 'length') > 0 && (
        loading ? 
        <Spinner style={{ gridColumn: '1 / -1', gridRow: '1 / span 1', margin: 'auto' }} /> : 
        <span className="text-primary text-center font-20" style={{ gridColumn: '1 / -1', gridRow: '-1 / span 1' }}>Aucun équipement correspondant.</span>
      ) }

      { get(equipments, 'length') > 0 && (
        <>
          { equipments.map((equipment, index) => (
            <Equipment
              key={`equipment-list#${equipment._id}`}
              index={index}
              equipment={equipment}
            />
          )) }
          { loading && <Spinner style={{ gridColumn: '1 / -1', gridRow: '1 / 1', margin: 'auto' }} /> }
        </>
      ) }
    </Grid>
  );
}

export default EquipmentsList;
