import React, { useState, useContext, useEffect } from 'react'
import { Row, Input, Icon } from 'muejs'

import useDebounce from '../../../../hooks/useDebounce'

import EquipmentsContext from '../../../../store/context/equipments'
import * as actions from '../../../../store/actions/equipments'

const Header = ({ small, setSmall, save, canSave }) => {
  const [store, dispatch] = useContext(EquipmentsContext)
  
  const [level, setLevel] = useState(200)
  const [name, setName] = useState('')
  
  const debouncedLevel = useDebounce(level, 250)
  const debouncedName = useDebounce(name, 250)

  useEffect(() => {
    actions.changeStuffLevel(Math.min(parseInt(debouncedLevel, 10), 200), [store, dispatch])
  }, [debouncedLevel])
  
  useEffect(() => {
    actions.changeStuffName(debouncedName, [store, dispatch])
  }, [debouncedName])  

  return (
      <Row className="inputs justify-center mb-40 ph-15vw">
        <Icon className="text-primary hide-until-sm mr-15" icon={small ? "view_array" : "view_module"} size="md" onClick={() => setSmall(!small)} />

        <Input
          className={`text-center ph-24 pv-20 mr-25 level ${parseInt(level, 10) > 200 ? 'over-200' : ''}`.trim()}
          type="text"
          pattern="^\d{1,3}$"
          value={Math.min(parseInt(level, 10), 200)}
          style={{ width: '6rem' }}
          placeholder="Lvl"
          onChange={e => setLevel(e.target.value)}
        />
        
        <Input
          className={`ph-24 pv-20 flex-1 level ${parseInt(level, 10) > 200 ? 'over-200' : ''}`.trim()}
          type="text"
          value={name}
          placeholder="Nom du stuff"
          onChange={e => setName(e.target.value)}
        />

        <Icon className={`text-primary ml-15 ${canSave ? '' : 'disabled'}`} icon="save" size="md" onClick={canSave ? () => undefined : save} />
      </Row>
  )
}

export default Header
