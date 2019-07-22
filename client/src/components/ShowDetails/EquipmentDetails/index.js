import React from 'react';
import { Element, Icon, Row } from 'muejs';
import get from 'lodash.get';

import Equipment from '../../Equipment';

import Stats from '../../Stats';
import Characteristics from '../../Stats/Characteristics';
import Passives from '../../Stats/Passives';

import './stylesheet.styl';

 const EquipmentDetails = ({ active, equipment, displaySet, equip }) => {
  if (!equipment || !active) return null;

  const statLength = get(equipment, 'statistics.length');
  const characLength = get(equipment, 'characteristics.length');
  const passivesLength = get(equipment, 'passives.length');

  return (
    <>
      <Equipment row={1} col={1} equipment={equipment} title={equipment.description} equip={equip} style={{ maxWidth: '4rem' }}/>

      <Element className="marg-b-15" row={1} col={2} show={equipment.name || get(equipment, 'set.name')}>
        <h4 className="marg-0 align-end">{ equipment.name }</h4>
        <Element type="span" className="equipmentdetails-set align-start" onClick={() => displaySet()}>{ get(equipment, 'set.name') }</Element>
      </Element>

      <Characteristics keyPrefix={`equipment-details#${equipment._id}#`} characteristics={get(equipment, 'characteristics')} col={1} width={3} />

      <Element show={characLength && (statLength || passivesLength)} style={{ margin: "1rem 25%", borderTop: '1px solid #fafafa' }} col={1} width={3} />

      <Stats keyPrefix={`equipment-details#${equipment._id}#`} statistics={get(equipment, 'statistics')} col={2} />

      <Element show={statLength && passivesLength} style={{ margin: "1rem 25%", borderTop: '1px solid #fafafa' }} col={1} width={3} />

      <Passives keyPrefix={`equipment-details#${equipment._id}#`} passives={get(equipment, 'passives')} col={2} />

      {/* need to check every conditions here !equipment.conditions.some(cond => cond is not respected then return true) */}
      { get(equipment, 'conditions').map((condition, index) => (
        <Icon key={`equipment-details#${equipment._id}#condition#${condition}`} col={1} row={index+2} show={condition} icon="warning" size="xs" className="font-warning" style={{ maxWidth: '5rem', maxHeight: '5rem' }}  title={condition} />
      )) }
    </>
  );
};

export default EquipmentDetails;
