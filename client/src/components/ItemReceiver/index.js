import React, { useContext } from 'react';
import isEqual  from 'lodash.isequal';

import { Element } from 'muejs';

import * as actions from '../../store/actions/equipments';
import * as selectors from '../../store/selectors/equipments';

import EquipmentsContext from '../../store/context/equipments';
import Equipment from '../Equipment';


import './stylesheet.styl';


const ItemReceiver = ({ icon: SVGIcon, types, stepName = types, className, ...otherProps }) => {
  const [store, dispatch] = useContext(EquipmentsContext);
  const currentStep = selectors.getActiveStep(store);
  const selected = selectors.getDisplayedEquipment(store);
  const isStoreFullyFetched = selectors.isStuffFullyFetched(store);
  // console.log('stepName=', stepName, 'currentStep', currentStep, 'selected=', selected, 'isStoreFullyFetched', isStoreFullyFetched)
  const equipment = isStoreFullyFetched && selectors.getStuffEquipment(store, stepName);

  return (
    <Element
      className={["equipment-input", types, currentStep === stepName ? "active" : '', className].join(' ').trim()}
      onClick={e => actions.changeStep({ step: stepName, types }, [store, dispatch])}
      {...otherProps}
    >
      {
        equipment ?
        <Equipment equipment={equipment} select={() => actions.display({ equipment }, [store, dispatch])} isSelected={isEqual(equipment, selected)} /> :
        <SVGIcon />
      }
    </Element>
  );
};

/* <Equipment index={index} equipment={equipment} select={setDetailled} isSelected={isEqual(equipment, detailled)} /> : */
export default ItemReceiver;
