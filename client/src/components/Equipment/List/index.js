import React from 'react'
import get from 'lodash.get'
import { Grid, Spinner } from 'muejs'

import Equipment from '../Preview'

import { arrayToClassName } from '../../../utils/common'
import { EQUIPMENTS_IMG_URI } from '../../../constants/URIs'

import './stylesheet.styl'

const EquipmentsList = ({ equipments = [], className, loading, ...otherProps }) => {
  return (
    <Grid
      columnsTemplate={'repeat(auto-fit, calc(72px + 0.5vw))'}
      className={arrayToClassName(["equipments-list bg-input no-scrollbar justify-space-evenly align-start", className])}
      style={{ '--broken-img-link': `url(${EQUIPMENTS_IMG_URI}/broken.png)` }}
      gap='calc(8px + 0.25vw)'
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
              displayMainStats
            />
          )) }
          { loading && <Spinner style={{ gridColumn: '1 / -1', gridRow: '1 / 1', margin: 'auto' }} /> }
        </>
      ) }
    </Grid>
  )
}

export default EquipmentsList
