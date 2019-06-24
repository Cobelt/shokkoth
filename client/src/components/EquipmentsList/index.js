import React, { useContext, useEffect } from 'react';
import isEqual from 'lodash.isequal';

import { Grid } from 'muejs';

import * as actions from '../../store/actions/equipments';
import * as selectors from '../../store/selectors/equipments';

import EquipmentsContext from '../../store/context/equipments';
import Equipment from '../Equipment';

import './stylesheet.styl';

const EquipmentsList = ({ className, ...otherProps }) => {
  const [store, dispatch] = useContext(EquipmentsContext);
  const types = selectors.getActiveTypes(store);
  const selected = selectors.getDisplayedEquipment(store);

  const order = types.split(',').length > 1 ? { type: 1, level: -1, _id: -1 } : undefined;
  const equipments = selectors.getEquipments(store, { types, order });

  useEffect(() => {
    async function fetchItems() {
      actions.fetchEquipments({ types, order }, [store, dispatch]);
    }
    fetchItems();
  }, [types]);

  return (
    <Grid
      columnsTemplate={'repeat(auto-fit, minmax(2vw, 5rem))'}
      rowsTemplate={'repeat(auto-fit, 1fr)'}
      className={["equipments-list", "justify-center", className].filter(e => !!e).join(' ').trim()}
      style={{ minHeight: '22rem' }}
      {...otherProps}
    >
      { equipments.length > 0 && equipments.map((equip, index) => <Equipment key={equip._id} index={index} equipment={equip} select={() => actions.display({ equipment: equip }, [store, dispatch])} isSelected={isEqual(equip, selected)} /> ) }
    </Grid>
  );
}

export default EquipmentsList;
