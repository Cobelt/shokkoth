import React, { useState, useContext, useEffect } from 'react';
import get from 'lodash.get';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import { Grid, Element, Icon, Column } from 'muejs';
import { withRouter } from "react-router";

import EquipmentsContext from '../../store/context/equipments';

import * as service from '../../services/equipments';
import * as actions from '../../store/actions/equipments';
import * as selectors from '../../store/selectors/equipments';

import EquipmentsList from '../EquipmentsList';;

import './stylesheet.styl';

const handleSearch = debounce(async (params, context) => {
  actions.fetchEquipments(params, context);
}, 400);

const EquipmentsSearch = ({ select, equip, itemDisplayed, ...otherProps }) => {
  const [store, dispatch] = useContext(EquipmentsContext);

  // custom hook useParams?
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(80);
  const [levelMin, setLevelMin] = useState(1);
  const [levelMax, setLevelMax] = useState(200);
  const types = selectors.getActiveTypes(store);
  const order = types === 'trophy,dofus' ? { type: 1, level: -1, _id: -1 } : undefined;

  const equipments = selectors.getEquipments(store, { types, order, searchText, levelMin, levelMax, page, perPage });
  // if (get(equipments, 'length') > 0) console.log('equipments =', equipments)

  useEffect(() => {
    handleSearch({ types, order, searchText, levelMin, levelMax, page, perPage }, [store, dispatch])
  }, [types, order, searchText, levelMin, levelMax, page, perPage]);

  return (
    <Column className="equipments-search" {...otherProps}>
      <div className="bg-primary pad-1-rem">
        <input type="text" onChange={e => setSearchText(e.target.value)} placeholder="Search for an item" />
        <div>Liste des équipments. Ce titre deviendra une liste d'onglet ainsi que tout le nécessaire à une recherche</div>
      </div>

      <EquipmentsList
        equipments={equipments}
        equip={equip}
        select={select}
        selected={itemDisplayed}
      />
    </Column>
  );
}
export default EquipmentsSearch;
