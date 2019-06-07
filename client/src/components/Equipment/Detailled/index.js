import React, { Fragment } from 'react';
import { Grid, Element, Icon } from 'muejs';
import get from 'lodash.get';

const EquipmentDetailled = ({ idgrid, equipment, onClose }) => {
  if (!equipment) return null;

  return (
    <Grid
      columnsTemplate="fit-content(100%) fit-content(100%) auto auto fit-content(100%)"
      className={["item-details", "align-start", "bg-primary", 'position-relative', 'pad-1-rem', equipment ? "show" : "hide"].filter(e => !!e).join(' ').trim()}
    >
      <Element idgrid={idgrid} row={1} col={1} height={2}>
        <img alt="" src={equipment.imgUrl} style={{ maxWidth: '5rem', maxHeight: '5rem' }} title={equipment.description} />
      </Element>

      {/* need to check every conditions here !equipment.conditions.some(cond => cond is not respected then return true) */}
      { get(equipment, 'condition.length') > 0 && (
        <Element idgrid={idgrid} row={3} col={1} height={2} className="text-center">
          <Icon icon="warning" size="xs" className="font-warning" style={{ maxWidth: '5rem', maxHeight: '5rem' }} title="Attention certaines conditions ne sont pas remplies !" />
        </Element>
      ) }

      <Element idgrid={idgrid} type="span" col={2} row={1} width={3} className="md align-end">
        { equipment.name }
      </Element>

      { equipment.setId > 0 && (
        <Element idgrid={idgrid} type="span" col={2} row={2} width={3} className="align-start">
          Panoplie #{ equipment.setId }
        </Element>
      ) }

      <Icon idgrid={idgrid} col={5} row={1} className="align-start" style={{ margin: 0, justifySelf: 'right' }} icon="close" size="xs" onClick={onClose} />

      { equipment.stats.map((stat, index) => (
        <Fragment key={`${equipment._id}#${stat.name}`}>
          <Element idgrid={idgrid} col={2} row={index+3}>{ stat.name }</Element>
          { stat.from && <Element idgrid={idgrid} col={3} row={index+3} className="text-center" width={stat.to !== undefined ? 1 : 2}>{ stat.from }</Element> }
          { stat.to && <Element idgrid={idgrid} col={4} row={index+3} className="text-center">{ stat.to }</Element> }
        </Fragment>
      )) }
    </Grid>
  );
};

export default EquipmentDetailled;
