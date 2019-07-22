import React, { useState, useContext, useEffect } from 'react';
import get from 'lodash.get';
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


import ItemReceiver from '../ItemReceiver';


import { generateImageLink } from '../../utils/hexGenerator';

import { DOFUS_IMG_URI } from '../../constants/URIs';
import { WEAPONS, PETS, MOUNTS, EQUIPMENTS, ALL } from '../../constants/equipments';
import { PRIMARY_STATS, VITALITY, WISDOM, STRENGTH, INTELLIGENCE, CHANCE, AGILITY, AP, MP } from '../../constants/stats';


import './stylesheet.styl';




const Stuff = ({ className, elementClassName, character = {}, stats, characterStats, setCharacStat, setParchoStat, ...otherProps }) => {
  const [rotation, setRotation] = useState(1);
  const [showStats, setShowStats] = useState(false);

  const [store, dispatch] = useContext(EquipmentsContext);
  const isEquipmentsFetchedOnce = selectors.getAllEquipmentsLength(store) > 0;

  useEffect(() => {
    async function fetchStuffItems() {
        actions.fetchStuffItems([store, dispatch]);
    }
    if (isEquipmentsFetchedOnce) {
      fetchStuffItems();
    }
  }, [isEquipmentsFetchedOnce]);

  const { pseudo, level, breed, gender } = character;
  const avatarLink = get(breed, gender) && generateImageLink({ ...breed[gender], head: breed[gender].heads[0], rotation, padding: 10 });


  return (
    <Element className={elementClassName} {...otherProps}>
      <Grid
        className={["stuff", "justify-center", showStats ? "stats-mode" : "", className].filter(e => !!e).join(' ').trim()}
        columnsTemplate={'repeat(6, minmax(2.5rem, 4.5rem))'}
        rowsTemplate={'3.5rem repeat(6, auto)'}
        gap="1rem"
      >

        {/* Row 1 */}
        <Element row={1} className="position-relative" style={{ overflow: 'hidden' }}>
          <Icon className="chart-icon" icon="bar_chart" size="md" onClick={() => setShowStats(!showStats)}/>
        </Element>

        <Element row={1} col={3} width={2} className="pseudo">
          { pseudo }
        </Element>

        <Element row={1} col={5} width={2} className="level">
          { level }
        </Element>

        <Element row={2} col={2} height={5} className="rotation-arrow left">
          <Icon icon="keyboard_arrow_left" onClick={() => setRotation((rotation+1)%8)} />
        </Element>

        <Element row={2} col={2} width={4} height={5} className="avatar">
            <img alt="avatar" src={avatarLink} />
        </Element>

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
        <ItemReceiver col={1} row={2} types={'amulet'} icon={Amulet} />
        <ItemReceiver col={1} row={3} types={'shield'} icon={Shield} />
        <ItemReceiver col={1} row={4} types={'ring'} stepName={'ringLeft'} icon={Ring} />
        <ItemReceiver col={1} row={5} types={'belt'}  icon={Belt} />
        <ItemReceiver col={1} row={6} types={'boots'} icon={Boots} />


        {/* Right side */}
        <ItemReceiver col={6} row={2} types={'hat'} icon={Hat} />
        <ItemReceiver col={6} row={3} types={WEAPONS} stepName={'weapon'} icon={Weapon} />
        <ItemReceiver col={6} row={4} types={'ring'} stepName={'ringRight'} icon={Ring} />
        <ItemReceiver col={6} row={5} types={'cloak,backpack'} stepName={'cloak'} icon={Cloak} />
        <ItemReceiver col={6} row={6} types={'mount,pet,petsmount'} stepName={'pet'} icon={Pet} />

        {/* Bottom side */}
        { Array(6).fill('trophy,dofus').map((type, index) => {
          const value = `dofus#${index+1}`;
          return <ItemReceiver key={value} col={index+1} row={7} stepName={value} types={type} icon={Dofus} />
        }) }


        <Element col={6} row={1} style={{ position: 'relative', overflow: 'hidden' }}>
          <Icon className="close-icon" icon="close" size="md" onClick={() => setShowStats(false)}/>
        </Element>

        <Element className="stats-inputs-container bg-primary" col={0} row={1}>
          <Grid columnsTemplate="max-content repeat(2, minmax(2rem, 1fr))" rowsTemplate="repeat(6, 1fr)" colGap="1.5rem">
            <Element type="span" className="text-center header" col={2}>Base</Element>
            <Element type="span" className="text-center header" col={3}>Parchemins</Element>

            <span><img src={`//img.shokkoth.tk/assets/stats/${PRIMARY_STATS[VITALITY]}`} /><em>{ VITALITY }</em></span>
            <input type="number" className="text-right" min="0" max="999" defaultValue={0} size={4} onChange={v => setCharacStat(VITALITY, v.target.value)} />
            <input type="number" className="text-right" min="0" max="100" value={get(characterStats, `[${VITALITY}].parcho`) || 0} size={4} onChange={v => setParchoStat(VITALITY, v.target.value)} />

            <span><img src={`//img.shokkoth.tk/assets/stats/${PRIMARY_STATS[WISDOM]}`} /><em>{ WISDOM }</em></span>
            <input type="number" className="text-right" min="0" max="999" defaultValue={0} size={4} onChange={v => setCharacStat(WISDOM, v.target.value)} />
            <input type="number" className="text-right" min="0" max="100" value={get(characterStats, `[${WISDOM}].parcho`) || 0} size={4} onChange={v => setParchoStat(WISDOM, v.target.value)} />

            <span><img src={`//img.shokkoth.tk/assets/stats/${PRIMARY_STATS[STRENGTH]}`} /><em>{ STRENGTH }</em></span>
            <input type="number" className="text-right" min="0" max="999" defaultValue={0} size={4} onChange={v => setCharacStat(STRENGTH, v.target.value)} />
            <input type="number" className="text-right" min="0" max="100" value={get(characterStats, `[${STRENGTH}].parcho`) || 0} size={4} onChange={v => setParchoStat(STRENGTH, v.target.value)} />

            <span><img src={`//img.shokkoth.tk/assets/stats/${PRIMARY_STATS[INTELLIGENCE]}`} /><em>{ INTELLIGENCE }</em></span>
            <input type="number" className="text-right" min="0" max="999" defaultValue={0} size={4} onChange={v => setCharacStat(INTELLIGENCE, v.target.value)} />
            <input type="number" className="text-right" min="0" max="100" value={get(characterStats, `[${INTELLIGENCE}].parcho`) || 0} size={4} onChange={v => setParchoStat(INTELLIGENCE, v.target.value)} />

            <span><img src={`//img.shokkoth.tk/assets/stats/${PRIMARY_STATS[CHANCE]}`} /><em>{ CHANCE }</em></span>
            <input type="number" className="text-right" min="0" max="999" defaultValue={0} size={4} onChange={v => setCharacStat(CHANCE, v.target.value)} />
            <input type="number" className="text-right" min="0" max="100" value={get(characterStats, `[${CHANCE}].parcho`) || 0} size={4} onChange={v => setParchoStat(CHANCE, v.target.value)} />

            <span><img src={`//img.shokkoth.tk/assets/stats/${PRIMARY_STATS[AGILITY]}`} /><em>{ AGILITY }</em></span>
            <input type="number" className="text-right" min="0" max="999" defaultValue={0} size={4} onChange={v => setCharacStat(AGILITY, v.target.value)} />
            <input type="number" className="text-right" min="0" max="100" value={get(characterStats, `[${AGILITY}].parcho`) || 0} size={4} onChange={v => setParchoStat(AGILITY, v.target.value)} />

            <Element className="text-center marg-t-5" width={3}>Il vous reste 995 point{ 995 !== 1 && 's' } à distribuer</Element>
          </Grid>
        </Element>
      </Grid>
    </Element>
  );
}

export default Stuff;
