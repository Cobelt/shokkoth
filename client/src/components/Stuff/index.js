import React, { useState } from 'react';
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
import Sword from '../../assets/svg/sword';

import ItemReceiver from '../ItemReceiver';

import { generateImageLink } from '../../utils/hexGenerator';
import { DOFUS_IMG_URI } from '../../constants/URIs';

import './stylesheet.styl';



const copyUrlToClipboard = () => {
  const urlReceiver = document.createElement('input');
  document.body.appendChild(urlReceiver);
  urlReceiver.value = window.location.href;
  urlReceiver.select();
  document.execCommand('copy');
  document.body.removeChild(urlReceiver);
};



const Stuff = ({ className, character = {}, step, changeStep = () => undefined, ...otherProps }) => {
  const [rotation, setRotation] = useState(1);

  const { pseudo, level, breed, gender } = character;
  const avatarLink = get(breed, gender) && generateImageLink({ ...breed[gender], head: breed[gender].heads[0], rotation });


  return (
    <Grid className={["stuff", "justify-center", className].join(' ')} gap="1rem" columnsTemplate={'minmax(3rem, 3.5vw) '.repeat(6)} rowsTemplate={`auto ${'minmax(3rem, 3.5vw) '.repeat(6)}`}>

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
      <ItemReceiver col={1} row={2} type={'amulet'} step={step} changeStep={changeStep} icon={Amulet} />
      <ItemReceiver col={1} row={3} type={'shield'} step={step} changeStep={changeStep} icon={Shield} />
      <ItemReceiver col={1} row={4} type={'ring'} index={'1'} step={step} changeStep={changeStep} icon={Ring} />
      <ItemReceiver col={1} row={5} type={'belt'}   step={step} changeStep={changeStep} icon={Belt} />
      <ItemReceiver col={1} row={6} type={'boots'} step={step} changeStep={changeStep} icon={Boots} />


      {/* Right side */}
      <ItemReceiver col={6} row={2} type={'hat'} step={step} changeStep={changeStep} icon={Hat} />

      {/* Need to change this one, it"s not an "ItemReceiver", it's a "Weapon" */}
      <ItemReceiver col={6} row={3} type={'weapon'} step={step} changeStep={changeStep} icon={Sword} />
      <ItemReceiver col={6} row={4} type={'ring'} index={'2'} step={step} changeStep={changeStep} icon={Ring} />
      <ItemReceiver col={6} row={5} type={'cloak'} step={step} changeStep={changeStep} icon={Cloak} />

      {/* Need to change this one, it"s not an "ItemReceiver", it's a "PetOrMount" */}
      <ItemReceiver col={6} row={6} type={'mount,pet,petsmount'} step={step} changeStep={changeStep} icon={Pet} />

      {/* Bottom side */}
      { Array(6).fill('trophy,dofus').map((type, index) => {
        const value = `${type}#${index+1}`;
        return <ItemReceiver key={value} col={index} row={7} index={index} type={type} step={step} changeStep={changeStep} icon={Dofus} />
      }) }
    </Grid>
  );
}

export default Stuff;
