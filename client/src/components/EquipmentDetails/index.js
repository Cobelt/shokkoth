import React, { Fragment } from 'react';
import { Grid, Element, Icon, Row } from 'muejs';
import get from 'lodash.get';

import Stat from '../Stat';
import Characteristic from '../Stat/Characteristic';
import Passive from '../Stat/Passive';

 const EquipmentDetails = ({ equipment, onClose }) => {
  if (!equipment) return null;

  const statLength = get(equipment, 'statistics.length');
  const characLength = get(equipment, 'characteristics.length');
  const passivesLength = get(equipment, 'passives.length');

  return (
    <Grid
      columnsTemplate="repeat(3, fit-content(100%))"
      className={["item-details", "align-start", "bg-primary", 'position-relative', 'pad-1-rem', equipment ? "show" : "hide"].filter(e => !!e).join(' ').trim()}
    >
      <Element row={1} col={1} height={2} show={equipment.imgUrl}>
        <img alt="" src={equipment.imgUrl} style={{ maxWidth: '5rem', maxHeight: '5rem' }} title={equipment.description} />
      </Element>

       {/* need to check every conditions here !equipment.conditions.some(cond => cond is not respected then return true) */}
      <Element row={3} col={1} height={2} className="text-center" show={get(equipment, 'condition.length') > 0}>
        <Icon icon="warning" size="xs" className="font-warning" style={{ maxWidth: '5rem', maxHeight: '5rem' }} title="Attention certaines conditions ne sont pas remplies !" />
      </Element>

      <Element type="h4" col={2} row={1} className="marg marg-0 align-end" show={equipment.name}>
        { equipment.name }
      </Element>

      <Element type="span" col={2} row={2} className="align-start" show={get(equipment, 'set')} onClick={() => console.log('Set is :', get(equipment, 'set'))}>
        { get(equipment, 'set.name') }
      </Element>

       <Icon col={3} row={1} className="align-start" style={{ margin: 0, justifySelf: 'right' }} icon="close" size="xs" onClick={onClose} />

       <Row col={1} row={3} width={3}>
        { !!characLength && equipment.characteristics.map((stat, index) => (
          <Fragment >
            <Characteristic key={`characteristics#${equipment._id}#${stat.name}#${index}`} index={index} stat={stat} />
          </Fragment>
        )) }
        </Row>

        <Element show={characLength && (statLength || passivesLength)} style={{ margin: "1rem 15%", borderTop: '1px solid #fafafa' }} col={1} row={4} width={3} />

       { !!statLength && equipment.statistics.map((stat, index) => (
          <Fragment key={`stat#${equipment._id}#${stat.name}#${index}`}>
            <Stat index={index} stat={stat} col={1} row={index+5} width={3} />
          </Fragment>
        )) }

        <Element show={statLength && passivesLength} style={{ margin: "0 25%" }} col={1} row={statLength+5} width={3} />

       { !!passivesLength && equipment.passives.map((stat, index) => (
         <Fragment key={`characteristics#${equipment._id}#${stat.name}#${index}`}>
           <Passive index={index} stat={stat} col={1} row={index+statLength+6} width={3} />
         </Fragment>
        )) }
    </Grid>
  );
};

export default EquipmentDetails;
