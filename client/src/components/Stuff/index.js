import React, { useContext, useEffect } from 'react';

import EquipmentsContext from '../../store/context/equipments';

import * as selectors from '../../store/selectors/equipments';
import * as actions from '../../store/actions/equipments';

import StuffSmall from './SmallView';
import StuffFull from './FullView';

import './stylesheet.styl';


const Stuff = ({ small = "false", stuff, refetch, setActiveAtMount = true, ...otherProps }) => {
  const [store, dispatch] = useContext(EquipmentsContext);

  useEffect(() => {
    if (setActiveAtMount) {
      actions.setActiveStuff({ stuff }, [store, dispatch])
    }
  }, [stuff]);

  let stuffToDisplay = stuff;
  if (setActiveAtMount) {
    stuffToDisplay = selectors.getActiveStuff(store);
  }

  const stats = selectors.getStats(store, { stuff: stuffToDisplay });

  return (
    small === "true"
    ? <StuffSmall stuff={stuffToDisplay} stats={stats} {...otherProps} />
    : <StuffFull stuff={stuffToDisplay} stats={stats} { ...otherProps} />
  );
}

export default Stuff;
