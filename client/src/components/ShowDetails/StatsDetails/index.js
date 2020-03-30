import React, { Fragment } from 'react';
import debounce from 'lodash.debounce';
import get from 'lodash.get';
import { Grid, Element, Row, Input } from 'muejs';

import { BOOSTABLE_STATS } from '../../../constants/stats';

import './stylesheet.styl';


const StatsDetails = ({ stats, setCharacStat, setParchoStat, ...otherProps }) => {
  const { characterStats, pointsToDispatch } = stats;

  return (
    <>
      <Row className="justify-space-between" col={1} width={3}>
        <div style={{ flex: 3 }} />
        <Element type="span" className="text-center header">Base</Element>
        <div className="flex-1" />
        <Element type="span" className="text-center header">Parchemins</Element>
      </Row>

      { Object.entries(BOOSTABLE_STATS).map(([stat, img]) => (
        <Row key={`charac#stats#${stat}`} className="justify-space-between" col={1} width={3}>
          <span style={{ flex: 3 }}><img src={`//img.shokkoth.fr/assets/stats/${img}`} /><em>{ stat }</em></span>
          <Input className="small text-right" name={`charac#base#stat#${stat}`} defaultValue={get(characterStats, `[${stat}].base`) || 0} size={4} onChange={v => setCharacStat(stat, v.target.value)} type="number" min="0" max="999" />
          <div className="flex-1" />
          <Input className="small text-right" name={`charac#parcho#stat#${stat}`} defaultValue={get(characterStats, `[${stat}].parcho`) || 0} size={4} onChange={v => setParchoStat(stat, v.target.value)} type="number" min="0" max="100" />
        </Row>
      )) }

      <Element className="text-center mt-5" width={3}>Il vous reste { pointsToDispatch } point{ 995 !== 1 && 's' } à distribuer</Element>
    </>
  );
}
export default StatsDetails;
