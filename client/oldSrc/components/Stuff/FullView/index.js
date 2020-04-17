import React, { Fragment, useState, useContext, useEffect } from 'react';
import get from 'lodash.get';
import debounce from 'lodash.debounce';
import { Element, Grid, Input, Icon, Button, Row, Column } from 'muejs';

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
import AvatarWithArrows from '../../AvatarWithArrows';


import { STATS } from 'shokkoth-constants'
const { VITALITY, AP, MP } = STATS

import { getItemOfCategory } from '../../../utils/equipments';

import './stylesheet.styl';


const StuffFull = ({ className, elementClassName, character = {}, stuff = {}, stats = {}, editable = true, updateStuff = () => undefined, showStats, setShowStats = () => undefined, refetch, ...otherProps }) => {
  const { name, level, breed, gender } = character;

  console.log(stuff.name)
  const [currentName, setName] = useState(stuff.name);
  const [currentLevel, setLevel] = useState(stuff.level || level);
  const [currentVisibility, setVisibility] = useState(stuff.public);

  // console.log(currentName !== stuff.name, currentLevel !== stuff.level, currentVisibility !== stuff.public)
  const canSave = currentName !== stuff.name || currentLevel !== stuff.level || currentVisibility !== stuff.public;
  const debounceUpdate = () => {
    if (!canSave) return;
    updateStuff({ variables: { stuffId: stuff._id, record: { name: currentName, level: currentLevel, public: currentVisibility } } });
  };

  useEffect(() => { if (get(stuff, 'name') !== undefined) setName(stuff.name) }, [get(stuff, 'name')])
  useEffect(() => { if (get(stuff, 'level') !== undefined) setLevel(stuff.level) }, [get(stuff, 'level')])
  useEffect(() => { if (get(stuff, 'public') !== undefined) setVisibility(stuff.public) }, [get(stuff, 'public')])

  return (
    <Element className={elementClassName} {...otherProps}>
      <Grid
        className={['stuff', 'stuff-full', 'justify-center', 'relative', showStats && 'stats-mode', className].filter(e => !!e).join(' ').trim()}
        columnsTemplate={'repeat(6, 4em)'}
        rowsTemplate={'3.5em repeat(6, 4em)'}
        gap="0.5em"
      >

        {/* Row 1 */}
        { !editable && (
          <>
            <Element row={1} col={1} className={`level ${parseInt(level, 10) > 200 ? 'over-200' : ''}`.trim()}>
            { Math.min(parseInt(stuff.level || level, 10), 200) }
            </Element>
            <Element row={1} col={2} width={4} className="name justify-center">
             { stuff.name }
            </Element>
          </>
        ) }

        <AvatarWithArrows row={2} col={2} width={4} height={5} breed={character.breed} gender={gender} />

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

        {/* Left side */}
        <ItemReceiver col={1} row={2} category={'amulet'} icon={Amulet} equipment={getItemOfCategory(stuff, 'amulet', 0)} editable={editable} />
        <ItemReceiver col={1} row={3} category={'shield'} icon={Shield} equipment={getItemOfCategory(stuff, 'shield', 0)} editable={editable} />
        <ItemReceiver col={1} row={4} category={'ring'} index={0} icon={Ring} equipment={getItemOfCategory(stuff, 'ring', 0)} editable={editable} />
        <ItemReceiver col={1} row={5} category={'belt'}   icon={Belt} equipment={getItemOfCategory(stuff, 'belt', 0)} editable={editable} />
        <ItemReceiver col={1} row={6} category={'boots'}  icon={Boots} equipment={getItemOfCategory(stuff, 'boots', 0)} editable={editable} />


        {/* Right side */}
        <ItemReceiver col={6} row={2} category={'hat'} icon={Hat} equipment={getItemOfCategory(stuff, 'hat', 0)} editable={editable} />
        <ItemReceiver col={6} row={3} category={'weapon'} icon={Weapon} equipment={getItemOfCategory(stuff, 'weapon', 0)} editable={editable} />
        <ItemReceiver col={6} row={4} category={'ring'} index={1} icon={Ring} equipment={getItemOfCategory(stuff, 'ring', 1)} editable={editable} />
        <ItemReceiver col={6} row={5} category={'cloak,backpack'} icon={Cloak} equipment={getItemOfCategory(stuff, 'cloak', 0)} editable={editable} />
        <ItemReceiver col={6} row={6} category={'pet'} icon={Pet} equipment={getItemOfCategory(stuff, 'pet', 0)} editable={editable} />

        {/* Bottom side */}
        { [0, 1, 2, 3, 4, 5].map(index => (
          <ItemReceiver key={`dofus#${index}`} col={index+1} row={7} category={'dofus'} index={index} icon={Dofus} equipment={getItemOfCategory(stuff, 'dofus', index)} editable={editable} />
        )) }

        {/* editable && (
          <Element col={1} row={1}>
            { showStats
              ? <Icon className="close-icon" icon="close" size="md" onClick={() => setShowStats(false)}/>
              : <Icon className="chart-icon" icon="bar_chart" size="md" onClick={() => setShowStats(!showStats)} title="Répartition des points de stats"/>
            }
          </Element>
        ) */}
      </Grid>
    </Element>
  );
}

export default StuffFull;
