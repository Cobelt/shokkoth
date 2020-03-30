import React, { Fragment, useState, useContext, useEffect } from 'react';
import get from 'lodash.get';
import debounce from 'lodash.debounce';
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
} from '../../../assets/svg/equipments-icons';

import { HPIcon, APIcon, MPIcon } from '../../../assets/svg/stats';

import ItemReceiver from '../../ItemReceiver';
import StatsInputs from '../../CharacterStats/Inputs';


import { WEAPONS, PETS, MOUNTS, EQUIPMENTS, ALL } from '../../../constants/equipments';
import { BOOSTABLE_STATS, VITALITY, AP, MP } from '../../../constants/stats';

import { getItemOfCategory } from '../../../utils/equipments';

import { generateImageLink } from '../../../utils/hexGenerator';

import './stylesheet.styl';


const StuffSmall = ({ className, elementClassName, character = {}, stuff = {}, stats = {}, editable = true, ...otherProps }) => {
  const [showStats, setShowStats] = useState(false);
  const { name, level, breed, gender } = character;

  return (
    <Element className={elementClassName} {...otherProps}>
      <Grid
        className={['stuff', 'stuff-small', 'justify-center', 'relative', showStats && 'stats-mode', className].filter(e => !!e).join(' ').trim()}
        columnsTemplate={'repeat(4, 4em)'}
        rowsTemplate={'auto repeat(4, 4em) auto'}
        gap="1rem"
      >

        {/* Row 1 */}

        <Element row={1} col={1} width={2} className="name">
          { stuff.name }
        </Element>

        <Element row={1} col={3} width={1} className="breed-icon">
          <img src={`//img.shokkoth.fr/assets/breeds/heads/${breed.name.toLowerCase()}/${get(gender.toLowerCase(), '[0]')}-1.png`} />
        </Element>

        <Element row={1} col={4} width={1} className={`level ${parseInt(level, 10) > 200 ? 'over-200' : ''}`.trim()} data-title={`Omega ${level}`}>
          { Math.min(parseInt(level, 10), 200) }
        </Element>

        <Row className="stat" row={6} col={1} show={stats}>
          <span className="ap">{ stats[AP] }</span>
          <APIcon />
        </Row>

        <Row className="stat" row={6} col={4} show={stats}>
          <span className="mp">{ stats[MP] }</span>
          <MPIcon />
        </Row>

        <Element className="life-points relative" row={6} col={2} width={2} show={stats && stats[VITALITY]}>
          <HPIcon />
          <span className="absolute hp">{ stats[VITALITY] }</span>
        </Element>

        {/* Left side */}
        <ItemReceiver col={1} row={2} category={'amulet'} icon={Amulet} equipment={getItemOfCategory(stuff, 'amulet', 0)} editable={editable} />
        <ItemReceiver col={1} row={3} category={'shield'} icon={Shield} equipment={getItemOfCategory(stuff, 'shield', 0)} editable={editable} />
        <ItemReceiver col={1} row={4} category={'ring'} index={0} icon={Ring} equipment={getItemOfCategory(stuff, 'ring', 0)} editable={editable} />
        <ItemReceiver col={1} row={5} category={'belt'}   icon={Belt} equipment={getItemOfCategory(stuff, 'belt', 0)} editable={editable} />
        <ItemReceiver col={3} row={2} category={'boots'}  icon={Boots} equipment={getItemOfCategory(stuff, 'boots', 0)} editable={editable} />


        {/* Right side */}
        <ItemReceiver col={2} row={2} category={'hat'} icon={Hat} equipment={getItemOfCategory(stuff, 'hat', 0)} editable={editable} />
        <ItemReceiver col={2} row={3} category={'weapon'} icon={Weapon} equipment={getItemOfCategory(stuff, 'weapon', 0)} editable={editable} />
        <ItemReceiver col={2} row={4} category={'ring'} index={1} icon={Ring} equipment={getItemOfCategory(stuff, 'ring', 1)} editable={editable} />
        <ItemReceiver col={2} row={5} category={'cloak,backpack'} icon={Cloak} equipment={getItemOfCategory(stuff, 'cloak', 0)} editable={editable} />
        <ItemReceiver col={3} row={3} category={'pet'} icon={Pet} equipment={getItemOfCategory(stuff, 'pet', 0)} editable={editable} />

        {/* Bottom side */}
        { [0, 1, 2, 3, 4, 5].map(index => (
          <ItemReceiver key={`dofus#${index}`} row={index < 2 ? index+4 : index} col={index < 2 ? 3 : 4} category={'dofus'} index={index} icon={Dofus} equipment={getItemOfCategory(stuff, 'dofus', index)} editable={editable} />
        )) }


        { editable && (
          <Element row={8} col={1} style={{ overflow: 'hidden' }}>
            <Icon className="chart-icon" icon="bar_chart" size="md" onClick={() => setShowStats(!showStats)} title="Répartition des points de stats"/>
          </Element>
        ) }

        { editable && (
          <Element col={1} row={8} style={{ position: 'relative', overflow: 'hidden' }}>
            <Icon className="close-icon" icon="close" size="md" onClick={() => setShowStats(false)}/>
          </Element>
        )}

        { editable && <StatsInputs col={0} row={1} isOpened={showStats} setOpened={setShowStats}/> }
      </Grid>
    </Element>
  );
}

export default StuffSmall;
