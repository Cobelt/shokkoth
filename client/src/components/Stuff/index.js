import React, { Fragment, useState, useContext, useEffect } from 'react';
import get from 'lodash.get';
import debounce from 'lodash.debounce';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Element, Grid, Icon, Row, Column } from 'muejs';

import {
    Amulet,
    Belt,
    Boots,
    Cloak,
    Dofus,
    Hat,
    Pet,
    Ring,
    Shield,
    Weapon,
} from './equipments-icons';

import HPIcon from '../../assets/svg/heart';
import APIcon from '../../assets/svg/star';
import MPIcon from '../../assets/svg/isoSquares';

import EquipmentsContext from '../../store/context/equipments';

import * as selectors from '../../store/selectors/equipments';
import * as actions from '../../store/actions/equipments';

import Avatar from '../Avatar';
import ItemReceiver from '../ItemReceiver';
import StatsInputs from '../CharacterStats/Inputs';


import { WEAPONS, PETS, MOUNTS, EQUIPMENTS, ALL } from '../../constants/equipments';
import { BOOSTABLE_STATS, VITALITY, AP, MP } from '../../constants/stats';

import { getItemOfCategory } from '../../utils/equipments';

import { getStuffEquipments } from '../../queries';

import './stylesheet.styl';


const Stuff = ({ className, elementClassName, character = {}, stuff = {}, ...otherProps }) => {
  const [rotation, setRotation] = useState(1);
  const [showStats, setShowStats] = useState(false);

  const [store, dispatch] = useContext(EquipmentsContext);

  useEffect(() => {
    actions.setActiveStuff({ stuff }, [store, dispatch])
  }, [stuff]);

  const currentStep = selectors.getActiveStep(store);
  const stats = selectors.getStats(store);

  const showEquipment = (param) => actions.display(param, [store, dispatch]);

  const { name, level, breed, gender, stuffs } = character;
  const { equipments } = stuff;

  return (
    <Element className={elementClassName} {...otherProps}>
      <Grid
        className={['stuff', 'justify-center', 'relative', showStats && 'stats-mode', className].filter(e => !!e).join(' ').trim()}
        columnsTemplate={'repeat(6, minmax(2.5rem, 4.5rem))'}
        rowsTemplate={'3.5rem repeat(6, auto)'}
        gap="1rem"
      >

        {/* Row 1 */}
        <Element row={1} col={1} style={{ overflow: 'hidden' }}>
          <Icon className="chart-icon" icon="bar_chart" size="md" onClick={() => setShowStats(!showStats)} title="Répartition des points de stats"/>
        </Element>

        <Element row={1} col={3} width={2} className="name" data-title={get(breed, 'name')}>
          { name }
        </Element>

        <Element row={1} col={5} width={2} className={`level ${parseInt(level, 10) > 200 ? 'over-200' : ''}`.trim()} data-title={`Omega ${level}`}>
          { Math.min(parseInt(level, 10), 200) }
        </Element>

        <Element row={2} col={2} height={5} className="rotation-arrow left">
          <Icon icon="keyboard_arrow_left" onClick={() => setRotation((rotation+1)%8)} />
        </Element>

        <Avatar row={2} col={2} width={4} height={5} breed={breed} gender={gender} rotation={rotation} />

        <Row className="stat" row={6} col={2} width={2} show={stats}>
          <span className="ap">{ stats[AP] }</span>
          <APIcon />
        </Row>

        <Row className="stat" row={6} col={4} width={2} show={stats}>
          <span className="mp">{ stats[MP] }</span>
          <MPIcon />
        </Row>

        <Element className="life-points relative" row={6} col={3} width={2} show={stats && stats[VITALITY]}>
          <HPIcon />
          <span className="absolute hp">{ stats[VITALITY] }</span>
        </Element>

        <Element row={2} col={5} height={5} className="rotation-arrow right">
          <Icon icon="keyboard_arrow_right" onClick={() => setRotation(rotation <= 0 ? 7 : rotation-1)} />
        </Element>

        {/* Left side */}
        <ItemReceiver col={1} row={2} types={'amulet'} icon={Amulet} currentStep={currentStep} equipment={getItemOfCategory(equipments, 'amulet', 0)} select={showEquipment} />
        <ItemReceiver col={1} row={3} types={'shield'} icon={Shield} currentStep={currentStep} equipment={getItemOfCategory(equipments, 'shield', 0)} select={showEquipment} />
        <ItemReceiver col={1} row={4} types={'ring'} stepName={'ringLeft'} icon={Ring} currentStep={currentStep} equipment={getItemOfCategory(equipments, 'ring', 0)} select={showEquipment} />
        <ItemReceiver col={1} row={5} types={'belt'}  icon={Belt} currentStep={currentStep} equipment={getItemOfCategory(equipments, 'belt', 0)} select={showEquipment} />
        <ItemReceiver col={1} row={6} types={'boots'} icon={Boots} currentStep={currentStep} equipment={getItemOfCategory(equipments, 'boots', 0)} select={showEquipment} />


        {/* Right side */}
        <ItemReceiver col={6} row={2} types={'hat'} icon={Hat} currentStep={currentStep} equipment={getItemOfCategory(equipments, 'hat', 0)} select={showEquipment} />
        <ItemReceiver col={6} row={3} types={WEAPONS} stepName={'weapon'} icon={Weapon} currentStep={currentStep} equipment={getItemOfCategory(equipments, 'weapon', 0)} select={showEquipment} />
        <ItemReceiver col={6} row={4} types={'ring'} stepName={'rings'} icon={Ring} currentStep={currentStep} equipment={getItemOfCategory(equipments, 'ring', 1)} select={showEquipment} />
        <ItemReceiver col={6} row={5} types={'cloak,backpack'} stepName={'cloak'} icon={Cloak} currentStep={currentStep} equipment={getItemOfCategory(equipments, 'cloak', 0)} select={showEquipment} />
        <ItemReceiver col={6} row={6} types={'mount,pet,petsmount'} stepName={'pet'} icon={Pet} currentStep={currentStep} equipment={getItemOfCategory(equipments, 'pet', 0)} select={showEquipment} />

        {/* Bottom side */}
        { Array(6).fill('trophy,dofus').map((type, index) => {
          return <ItemReceiver key={`dofus#${index}`} col={index+1} row={7} stepName={'dofus'} types={type} icon={Dofus} currentStep={currentStep} equipment={getItemOfCategory(equipments, 'dofus', index)} select={showEquipment} />
        }) }


        <Element col={1} row={1} style={{ position: 'relative', overflow: 'hidden' }}>
          <Icon className="close-icon" icon="close" size="md" onClick={() => setShowStats(false)}/>
        </Element>

        <StatsInputs col={0} row={1} isOpened={showStats} setOpened={setShowStats}/>
      </Grid>
    </Element>
  );
}


const StuffQuery = ({ stuff = {}, ...otherProps }) => (
  <Query query={gql(getStuffEquipments)} variables={{ ankamaIds: get(stuff, 'equipments') }}>
    {({ loading, error, data: { equipmentMany: equipments = [] } = {} }) => {
      if (loading) return 'Loading...';
      if (error) console.error(`Error on StuffQuery! ${error.message}`);

      const populatedStuff = stuff;
      populatedStuff.equipments = equipments;

      return <Stuff stuff={populatedStuff} {...otherProps} />;
    }}
  </Query>
);
export default StuffQuery;
