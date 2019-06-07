import React from 'react';
import { Element } from 'muejs';

import './stylesheet.styl';

const ItemReceiver = ({ icon, type, index, className, style, step, changeStep, ...otherProps }) => {
  const value = index ? `${type}#${index}` : type;
  const SVGIcon = icon;
  const styles = { ...style, '--randomize': - Math.floor(Math.random() * Math.floor(40) + 100) }
  return (
    <Element
      className={["equipment-input", type, step === value ? "active" : '', className].join(' ').trim()}
      onClick={e => changeStep(step !== value ? value : 'unselected')}
      style={styles}
      {...otherProps}
    >
      <SVGIcon />
    </Element>
  );
};

export default ItemReceiver;
