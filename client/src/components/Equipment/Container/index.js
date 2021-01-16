import React, { useState } from 'react'

import useClickPreventionOnDoubleClick from '../../../hooks/useClickPreventionOnDoubleClick'

import Equipment from '../Preview'

const EquipmentContainer = ({ ...props }) => { 
  const [dblClick, fireDblClick] = useState(false)
  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(() => undefined, () => fireDblClick(true));


  return (
    <Equipment
        doubleClick={dblClick}
        fireDoubleClick={fireDblClick}
        onDoubleClick={handleDoubleClick}
        {...props}
    />
  )
}

export default EquipmentContainer
