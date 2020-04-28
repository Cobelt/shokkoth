import React, { useContext, useEffect } from 'react'
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
} from '../../../assets/equipmentsIcons'

import { HPIcon, APIcon, MPIcon } from '../../../assets/svg/stats'

import EquipmentsContext from '../../../store/context/equipments'
import * as selectors from '../../../store/selectors/equipments'
import * as actions from '../../../store/actions/equipments'

import ItemReceiver from '../../ItemReceiver'
import Avatar from '../../Avatar'

import { STATS } from 'shokkoth-constants'
const { VITALITY, AP, MP } = STATS

import './stylesheet.styl'


const Stuff = ({ smallOption = false, smallWidth = false, stuff, className, elementClassName, refetch, setBreed, setGender, editable = true, setActiveAtMount = false, updateStuff, ...otherProps }) => {
  const [store, dispatch] = useContext(EquipmentsContext)

  useEffect(() => {
    if (setActiveAtMount && stuff) {
      actions.setActiveStuff({ stuff }, [store, dispatch])
    }
  }, [!stuff]) // only change if go from null/undefined/... to something and reverse
  
  const ap = selectors.getStat(store, { stuff, name: AP }) || 0
  const mp = selectors.getStat(store, { stuff, name: MP }) || 0
  const vitality = selectors.getStat(store, { stuff, name: VITALITY }) || 0

  const small = smallWidth || smallOption

  return (
    <Element className={elementClassName} {...otherProps}>
      <Grid
        className={['stuff', small ? 'stuff-full' : 'stuff-small', 'justify-center', 'relative', className].filter(e => !!e).join(' ').trim()}
        columnsTemplate={`repeat(${small ? 4 : 6}, 4em)`}
        rowsTemplate={small ? 'auto repeat(4, 4em) auto' : 'repeat(6, 4em)'}
        gap={small ? '1em' : "0.5em"}
      >

        <Avatar smallOption={smallOption} smallWidth={smallWidth} withArrows row={1} col={small ? 1 : 2} width={small ? 1 : 4} height={small ? 1 : 5} breed={stuff.breed} gender={stuff.gender} setBreed={setBreed} setGender={setGender} />

        <Row className="stat" row={small ? 1 : 5} col={small ? 3 : 2} width={small ? 1 : 2} show={ap}>
          <span className="ap">{ ap }</span>
          <APIcon />
        </Row>

        <Row className="stat" row={small ? 1 : 5} col={4} width={small ? 1 : 2} show={mp}>
          <span className="mp">{ mp }</span>
          <MPIcon />
        </Row>

        <Element className="life-points relative" row={small ? 1 : 5} col={small ? 2 : 3} width={small ? 1 : 2} show={vitality}>
          <HPIcon className="max-height-100" />
          <span className={`absolute hp max-width-${small ? '90' : '40'} text-ellipsis`} style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} title={vitality}>{ vitality }</span>
        </Element>

        {/* Left side */}
        <ItemReceiver col={1} row={small ? 2 : 1} category={'amulet'} icon={Amulet} editable={editable} />
        <ItemReceiver col={1} row={small ? 3 : 2} category={'shield'} icon={Shield} editable={editable} />
        <ItemReceiver col={1} row={small ? 4 : 3} category={'ring'} index={0} icon={Ring1} editable={editable} />
        <ItemReceiver col={1} row={small ? 5 : 4} category={'belt'}   icon={Belt} editable={editable} />
        <ItemReceiver col={small ? 3 : 1} row={small ? 2 : 5} category={'boots'}  icon={Boots} editable={editable} />


        {/* Right side */}
        <ItemReceiver col={small ? 2 : 6} row={small ? 2 : 1} category={'hat'} icon={Hat} editable={editable} />
        <ItemReceiver col={small ? 2 : 6} row={small ? 3 : 2} category={'weapon'} icon={Weapon} editable={editable} />
        <ItemReceiver col={small ? 2 : 6} row={small ? 4 : 3} category={'ring'} index={1} icon={Ring2} editable={editable} />
        <ItemReceiver col={small ? 2 : 6} row={small ? 5 : 4} category={'cloak'} icon={Cloak} editable={editable} />
        <ItemReceiver col={small ? 3 : 6} row={small ? 3 : 5} category={'pet'} icon={Pet} editable={editable} />

        {/* Bottom side */}
        { [0, 1, 2, 3, 4, 5].map(index => (
          <ItemReceiver key={`dofus#${index}`} col={small ? (index < 2 ? 3 : 4) : (index + 1)} row={small ? (index < 2 ? index+4 : index) : 6} category={'dofus'} index={index} icon={Dofus} editable={editable} />
        )) }

      </Grid>
    </Element>
  )
}

export default Stuff
