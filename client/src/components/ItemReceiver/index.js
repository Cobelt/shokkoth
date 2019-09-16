import React, { useContext } from 'react';
import isEqual from 'lodash.isequal';
import { Element } from 'muejs';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import EquipmentsContext from '../../store/context/equipments';
import * as selectors from '../../store/selectors/equipments';
import * as actions from '../../store/actions/equipments';

import Equipment from '../Equipment';

import { ALL } from '../../constants/equipments';

import { arrayToClassName } from '../../utils/common';

import * as mutations from '../../queries/mutations';

import './stylesheet.styl';


const ItemReceiver = ({ icon: SVGIcon, index, category, equipment, editable = true, className, ...otherProps }) => {
  const [store, dispatch] = useContext(EquipmentsContext);
  const [unequipMutation] = useMutation(gql(mutations.unequip));

  const selected = selectors.getDisplayedEquipment(store);
  const select = param => actions.display(param, [store, dispatch]);

  const currentStep = selectors.getActiveStep(store) || {};
  const changeStep = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!editable) return false;
    actions.changeStep({ category: currentStep.category === category && currentStep.index === index ? '' : category, index }, [store, dispatch]);
    return false;
  };

  const unequip = props => {
    unequipMutation({ variables: {
      stuffId: stuff._id,
      equipmentId: get(props, 'equipment._id'),
    } })
    // actions.unequip(props, [store, dispatch]);
    refetch();
  };

  return (
    <Element
      className={arrayToClassName(['equipment-input', equipment && 'filled', category, currentStep.category === category && currentStep.index === index && 'active', className])}
      onClick={changeStep}
      {...otherProps}
    >
      {
        equipment ?
        <Equipment equipment={equipment} select={select} isSelected={isEqual(selected, equipment)} equip={unequip} /> :
        <SVGIcon />
      }
    </Element>
  );
};

export default ItemReceiver;
