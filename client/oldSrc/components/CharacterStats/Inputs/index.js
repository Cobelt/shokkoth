import React, { Fragment, useContext } from 'react'
import get from 'lodash.get'
import { Grid, Element } from 'muejs'

import EquipmentsContext from '../../../store/context/equipments'

import { STATS } from 'shokkoth-constants'
const { BOOSTABLE_STATS } = STATS

import './stylesheet.styl'


const StatsInputs = ({ isOpened, setOpened, ...otherProps }) => {
  const [store, dispatch] = useContext(EquipmentsContext)

  return (
    <Element className={`stats-inputs-container bg-primary ${isOpened ? 'opened' : ''}`.trim()} {...otherProps}>
      <Grid columnsTemplate="max-content repeat(2, minmax(2rem, 1fr))" rowsTemplate="repeat(6, 1fr)" colGap="1.5rem">
        <Element type="span" className="text-center header" col={2}>Base</Element>
        <Element type="span" className="text-center header" col={3}>Parchemins</Element>

        { Object.entries(BOOSTABLE_STATS).map(([stat, img]) => (
          <Fragment key={`charac#stats#${stat}`}>
            <span><img src={`//img.shokkoth.fr/assets/stats/${img}`} /><em>{ stat }</em></span>
            <input name={`charac#base#stat#${stat}`} defaultValue={get(characterStats, `[${stat}].base`) || 0} size={4} onChange={v => setCharacStat(stat, v.target.value)} type="number" className="text-right" min="0" max="999" />
            <input name={`charac#parcho#stat#${stat}`} defaultValue={get(characterStats, `[${stat}].parcho`) || 0} size={4} onChange={v => setParchoStat(stat, v.target.value)} type="number" className="text-right" min="0" max="100" />
          </Fragment>
        )) }

        <Element className="text-center mt-5" width={3}>Il vous reste { pointsToDispatch } point{ 995 !== 1 && 's' } à distribuer</Element>
      </Grid>
    </Element>
  )
}
export default StatsInputs
