import React, { useState, useContext } from 'react';
import { Grid, Element, Column } from 'muejs';
import debounce from 'lodash.debounce';
import get from 'lodash.get';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import EquipmentsContext from '../../../store/context/equipments';
import * as actions from '../../../store/actions/equipments';
import * as selectors from '../../../store/selectors/equipments';


import Stuff from '../index.js';
import ShowDetails from '../../ShowDetails';
import EquipmentsSearch from '../../EquipmentsSearch';
import CharacterStats from '../../CharacterStats';

import * as mutations from '../../../queries/mutations';
import { getItemOfCategory } from '../../../utils/equipments';

import './stylesheet.styl';


const StuffForm = ({ character, stuff, refetch = () => undefined, ...otherProps}) => {
  const [showStats, setShowStats] = useState(true);
  const [store, dispatch] = useContext(EquipmentsContext);

  const [updateStuff] = useMutation(gql(mutations.updateStuff));
  const [equipMutation] = useMutation(gql(mutations.equip));


  const characterStats = selectors.getCharacterStats(store);
  const pointsToDispatch = selectors.getPointsToDispatch(store);

  const setCharacStat = debounce((name, value) => actions.setCharacStat({ name, value }, [store, dispatch]), 200);
  const setParchoStat = debounce((name, value) => actions.setParchoStat({ name, value }, [store, dispatch]), 200);


  const equipmentToDetail = selectors.getDisplayedEquipment(store);
  const currentStep = selectors.getActiveStep(store) || {};

  const select = props => actions.display(props, [store, dispatch]);


  const equip = async ({ equipment, replaced }) => {
    // actions.equip({ equipment, replaced }, [store, dispatch]); to fix
    await equipMutation({ variables: {
      stuffId: stuff._id,
      equipmentId: get(equipment, '_id'),
      replacedEquipmentId: get(getItemOfCategory(stuff, get(currentStep, 'category') || get(equipment, 'category'), get(currentStep, 'index') || 0), '_id'),
    } })
    refetch();
  };

  const updateAndRefetchStuff = ({ variables }) => {
    updateStuff({ variables });
    refetch();
  }

  return (
    <Element className="stuff-form-container" {...otherProps}>
      <Grid className="stuff-form" columnsTemplate="minmax(30rem, min-content) auto" rowsTemplate="max-content repeat(2, fit-content(100%))" gap="3rem">

        <Stuff elementClassName="stuff-preview align-start" character={character} stuff={stuff} updateStuff={updateStuff} showStats={showStats} setShowStats={setShowStats} row={1} col={1} />
        <ShowDetails
          showStats={showStats}
          stats={{ characterStats, pointsToDispatch }}
          setCharacStat={setCharacStat}
          setParchoStat={setParchoStat}
          equipment={equipmentToDetail}
          selectEquipment={select}
          equip={equip}
          row={2}
          col={1}
          height={{ md: 2 }}
        />

        <EquipmentsSearch row={{ xs: 3, md: 1 }} col={{ xs: 1, md: 2 }} height={{ md: 2 }} select={select} equip={equip} itemDisplayed={equipmentToDetail} />

        <Element className="stats-container" row={{ xs: 4, md: 3 }} col={{ xs: 1, md: 2 }} width={{ xs: 2, md: 1 }} height={{ md: 2}}>
          <Grid columnsTemplate={`1fr 1fr`} colGap="5em">
            <CharacterStats />
          </Grid>
        </Element>
      </Grid>
    </Element>
  );
};

export default StuffForm;
