import React, { Fragment, useState } from 'react';
import { Element, Icon, Row } from 'muejs';
import get from 'lodash.get';

import Stats from '../../Stats';
import Equipment from '../../Equipment';

import './stylesheet.styl';


 const SetDetails = ({ active, set, displayEquipment, selectEquipment, equip }) => {
   if (!set || !active) return null;

   const [bonusDisplayed, setBonusDisplayed] = useState(get(set, 'bonus[0].number'));
   const bonus = get(set, 'bonus[0].number') && set.bonus.find(bonus => bonus && bonus.number === bonusDisplayed);

   return (
    <>
      <Icon row={1} col={1} height={2} icon="arrow_back_ios" style={{ maxWidth: '4rem', maxHeight: '4rem' }} title="Retourner au détail de l'équipment" onClick={() => displayEquipment()} />

      <Element type="h4" col={2} row={1} className="setdetails-name marg marg-0 align-end" show={set.name} title={set.name}>
        { set.name }
      </Element>

      {/* TODO same panels for every bonuses */}


      { bonus && (
        <Row
          className="bonus-arrows align-center justify-center marg-b-15"
          col={2}
          row={2}
          show={bonus}
        >
          <div style={{ flex: 1, textAlign: 'right' }}>
            <Icon
              show={bonusDisplayed > get(set, 'bonus[0].number')}
              icon="arrow_back_ios"
              size="xs"
              title="Bonus précédent"
              className="align-center"
              style={{ fontSize: '1.3rem', margin: 0 }}
              onClick={() => setBonusDisplayed(bonusDisplayed - 1)}
            />
          </div>

          <Element className="align-center">
            { bonus.number + 1 } équipements
          </Element>

          <div style={{ flex: 1, textAlign: 'left' }}>
            <Icon
              show={bonusDisplayed < get(set, `bonus[${get(set, 'bonus.length') - 1}].number`)}
              icon="arrow_forward_ios"
              size="xs"
              title="Bonus suivant"
              className="align-center"
              style={{ fontSize: '1.3rem', margin: 0 }}
              onClick={() => setBonusDisplayed(bonusDisplayed + 1)}
            />
          </div>
        </Row>
      ) }

      <Stats key={`set#${set._id}#bonus#${bonus.number}`} statistics={get(bonus, 'statistics')} col={2} />

      <Row className="other-equipments justify-evenly" col={1} width={3}>
        { get(set, 'equipments') && set.equipments.map((equipment, index) => equipment._id && (
          <Equipment key={`set#${set._id}#equipments#equipment#${equipment._id}`} index={index} equipment={equipment} select={() => selectEquipment({ id: equipment._id })} equip={equip} style={{ maxWidth: '5rem' }} />
        )) }
      </Row>
    </>
  );
};

export default SetDetails;
