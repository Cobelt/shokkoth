import React, { useState, useContext, useEffect } from 'react';
import get from 'lodash.get';
import { Element, Grid, Icon } from 'muejs';
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

import EquipmentsContext from '../../store/context/equipments';

import * as selectors from '../../store/selectors/equipments';
import * as actions from '../../store/actions/equipments';


import ItemReceiver from '../ItemReceiver';


import { generateImageLink } from '../../utils/hexGenerator';

import { DOFUS_IMG_URI } from '../../constants/URIs';
import { WEAPONS, PETS, MOUNTS, EQUIPMENTS, ALL } from '../../constants/equipments';


import './stylesheet.styl';



const copyUrlToClipboard = () => {
  const urlReceiver = document.createElement('input');
  document.body.appendChild(urlReceiver);
  urlReceiver.value = window.location.href;
  urlReceiver.select();
  document.execCommand('copy');
  document.body.removeChild(urlReceiver);
};



const Stuff = ({ className, character = {}, ...otherProps }) => {
  const [rotation, setRotation] = useState(1);

  const [store, dispatch] = useContext(EquipmentsContext);

  useEffect(() => {
    async function fetchStuffItems() {
        actions.fetchStuffItems([store, dispatch]);
    }
    fetchStuffItems();
  }, [store]);

  const { pseudo, level, breed, gender } = character;
  const avatarLink = get(breed, gender) && generateImageLink({ ...breed[gender], head: breed[gender].heads[0], rotation, padding: 10 });


  return (
    <Grid className={["stuff", "justify-center", className].join(' ')} gap="1rem" columnsTemplate={'repeat(6, minmax(2.5rem, 3vw))'} rowsTemplate={'auto repeat(6, minmax(2.5rem, 3vw))'}>

      {/* Row 1 */}
      <Icon className="share-icon" icon="share" size="small" onClick={copyUrlToClipboard} />

      <Element col={3} width={2} className="pseudo">
          { pseudo }
      </Element>

      <Element col={5} width={2} className="level">
          { level }
      </Element>

      <Element row={2} col={2} height={5} className="rotation-arrow left">
        <Icon icon="keyboard_arrow_left" onClick={() => setRotation((rotation+1)%8)} />
      </Element>

      <Element row={2} col={2} width={4} height={5} className="avatar">
          <img alt="avatar" src={avatarLink} />
      </Element>

      <Element row={2} col={5} height={5} className="rotation-arrow right">
        <Icon icon="keyboard_arrow_right" onClick={() => setRotation(rotation <= 0 ? 7 : rotation-1)} />
      </Element>

      {/* Left side */}
      { console.log('stuff re-render here') }
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
    </Grid>
  );
}

export default Stuff;
