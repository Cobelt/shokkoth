import React, { useState, useEffect } from 'react';
import { Element, Icon, Row } from 'muejs';
import get from 'lodash.get';

import Equipment from '../../Equipment';

import Stats from '../../Stats';
import Characteristics from '../../Stats/Characteristics';
import Passives from '../../Stats/Passives';
import Conditions from '../../Stats/Conditions';

import './stylesheet.styl';

const STATS = 'details/stats';
const CHARACS = 'details/characteristics';
const PASSIVES = 'details/passives';
const CONDITIONS = 'details/conditions';

const EquipmentDetails = ({ active, equipment, displaySet, equip }) => {
  const statsLength = get(equipment, 'statistics.length');
  const characsLength = get(equipment, 'statistics.length');
  const passivesLength = get(equipment, 'passives.length');
  const conditionsLength = get(equipment, 'conditions.length');

  const defaultActive = statsLength > 0 ? STATS : characsLength > 0 ? CHARACS : passivesLength > 0 ? PASSIVES : CONDITIONS
  const [display, setDisplay] = useState(defaultActive);

  useEffect(() => {
    if (display !== defaultActive) setDisplay(defaultActive);
  }, [equipment]);

  if (!equipment || !active) return null;

  return (
    <>
      <Equipment row={1} col={1} equipment={equipment} title={equipment.description} equip={equip} style={{ maxWidth: '4rem' }}/>

      <Element className="mb-15" row={1} col={2} show={equipment.name || get(equipment, 'set.name')}>
        <h4 className="m-0 align-end">{ equipment.name }</h4>
        <Element type="span" className="equipmentdetails-set align-start" onClick={() => displaySet()}>{ get(equipment, 'set.name') }</Element>
      </Element>

      <Row className="justify-around" row={2} col={1} width={3}>
        { statsLength > 0 && <img src="//img.shokkoth.tk/assets/stats/PA.png" className={`display-btn ${display === STATS ? 'active' : ''}`} onClick={() => setDisplay(STATS)} /> }
        { characsLength > 0 && <img src="//img.shokkoth.tk/assets/stats/arme.png" className={`display-btn ${display === CHARACS ? 'active' : ''}`} onClick={() => setDisplay(CHARACS)} /> }
        { passivesLength > 0 && <img src="//img.shokkoth.tk/assets/stats/passif.png" className={`display-btn ${display === PASSIVES ? 'active' : ''}`} onClick={() => setDisplay(PASSIVES)} /> }
        { conditionsLength > 0 && <Icon icon="warning" className={`display-btn m-0 ${display === PASSIVES ? 'active' : ''}`} onClick={() => setDisplay(CONDITIONS)} /> }
      </Row>


      <Stats
        show={display === STATS}
        keyPrefix={`equipment-details#${equipment._id}#`}
        statistics={get(equipment, 'statistics')}
        col={1}
        width={3}
      />

      <Characteristics
        show={display === CHARACS}
        keyPrefix={`equipment-details#${equipment._id}#`}
        characteristics={get(equipment, 'characteristics')}
        col={1}
        width={3}
      />

      <Passives
        show={display === PASSIVES}
        keyPrefix={`equipment-details#${equipment._id}#`}
        passives={get(equipment, 'passives')}
        col={1}
        width={3}
      />

      <Conditions
        show={display === CONDITIONS}
        keyPrefix={`equipment-details#${equipment._id}#`}
        conditions={get(equipment, 'conditions')}
        col={1}
        width={3}
      />
    </>
  );
};

export default EquipmentDetails;
