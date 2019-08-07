import React, { useContext } from 'react';
import isEqual  from 'lodash.isequal';
import { Element } from 'muejs';

import Equipment from '../Equipment';

import { ALL } from '../../constants/equipments';

import { arrayToClassName } from '../../utils/common';
import './stylesheet.styl';


const ItemReceiver = ({ icon: SVGIcon, types, stepName = types, equipment, className, currentStep, select, ...otherProps }) => {
  return (
    <Element
      className={arrayToClassName(['equipment-input', types, currentStep === stepName && 'active', className])}
      onClick={e => actions.changeStep(currentStep === stepName ? { step: '', types: ALL } : { step: stepName, types }, [store, dispatch])}
      {...otherProps}
    >
      {
        equipment ?
        <Equipment equipment={equipment} select={select} /> :
        <SVGIcon />
      }
    </Element>
  );
};

export default ItemReceiver;
