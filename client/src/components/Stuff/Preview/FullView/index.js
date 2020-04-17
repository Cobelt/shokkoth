import React, { Fragment, useState, useContext, useEffect } from 'react'
import get from 'lodash.get'
import debounce from 'lodash.debounce'
import { Element, Grid, Input, Icon, Button, Row, Column } from 'muejs'

import {
  Hat,
  Amulet,
  Ring1,
  Ring2,
  Cloak,
  Belt,
  Boots,
  Shield,
  Weapon,
  Dofus,
  Pet,
} from '../../../../assets/equipmentsIcons'

import { HPIcon, APIcon, MPIcon } from '../../../../assets/svg/stats'

import EquipmentsContext from '../../../../store/context/equipments'
import * as selectors from '../../../../store/selectors/equipments'

import ItemReceiver from '../../../ItemReceiver'
import Avatar from '../../../Avatar'

import './stylesheet.styl'

import { STATS } from 'shokkoth-constants'
const { VITALITY, AP, MP } = STATS




const StuffFull = ({ className, elementClassName, stuff = {}, editable = true, updateStuff = () => undefined, refetch, setBreed, setGender, ...otherProps }) => {
  const [store, dispatch] = useContext(EquipmentsContext)
  const ap = selectors.getStat(store, { name: AP }) || 0
  const mp = selectors.getStat(store, { name: MP }) || 0
  const vitality = selectors.getStat(store, { name: VITALITY }) || 0

  const debounceUpdate = () => {
    // updateStuff({ variables: { stuffId: stuff._id, record: { name: currentName, level: currentLevel, public: currentVisibility } } })
  }

  return (
    <Element className={elementClassName} {...otherProps}>
      <Grid
        className={['stuff', 'stuff-full', 'justify-center', 'relative', className].filter(e => !!e).join(' ').trim()}
        columnsTemplate={'repeat(6, 4em)'}
        rowsTemplate={'repeat(6, 4em)'}
        gap="0.5em"
      >

        <Avatar withArrows row={1} col={2} width={4} height={5} breed={stuff.breed} gender={stuff.gender} setBreed={setBreed} setGender={setGender} />

        <Row className="stat" row={5} col={2} width={2} show={ap}>
          <span className="ap">{ ap }</span>
          <APIcon />
        </Row>

        <Row className="stat" row={5} col={4} width={2} show={mp}>
          <span className="mp">{ mp }</span>
          <MPIcon />
        </Row>

        <Element className="life-points relative" row={5} col={3} width={2} show={vitality}>
          <HPIcon />
          <span className="absolute hp">{ vitality }</span>
        </Element>

        {/* Left side */}
        <ItemReceiver col={1} row={1} category={'amulet'} icon={Amulet} editable={editable} />
        <ItemReceiver col={1} row={2} category={'shield'} icon={Shield} editable={editable} />
        <ItemReceiver col={1} row={3} category={'ring'} index={0} icon={Ring1} editable={editable} />
        <ItemReceiver col={1} row={4} category={'belt'}   icon={Belt} editable={editable} />
        <ItemReceiver col={1} row={5} category={'boots'}  icon={Boots} editable={editable} />


        {/* Right side */}
        <ItemReceiver col={6} row={1} category={'hat'} icon={Hat} editable={editable} />
        <ItemReceiver col={6} row={2} category={'weapon'} icon={Weapon} editable={editable} />
        <ItemReceiver col={6} row={3} category={'ring'} index={1} icon={Ring2} editable={editable} />
        <ItemReceiver col={6} row={4} category={'cloak'} icon={Cloak} editable={editable} />
        <ItemReceiver col={6} row={5} category={'pet'} icon={Pet} editable={editable} />

        {/* Bottom side */}
        { [0, 1, 2, 3, 4, 5].map(index => (
          <ItemReceiver key={`dofus#${index}`} col={index+1} row={6} category={'dofus'} index={index} icon={Dofus} editable={editable} />
        )) }

      </Grid>
    </Element>
  )
}

export default StuffFull
