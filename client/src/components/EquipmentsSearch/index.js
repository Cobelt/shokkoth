import React, { useState, useContext, useEffect, useRef } from 'react';
import get from 'lodash.get';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Grid, Element, Icon, Column } from 'muejs';

import EquipmentsContext from '../../store/context/equipments';

import * as service from '../../services/equipments';
import * as actions from '../../store/actions/equipments';
import * as selectors from '../../store/selectors/equipments';

import EquipmentsList from '../EquipmentsList';

import { arrayToClassName } from '../../utils/common';
import { equipmentsList } from '../../queries';

import './stylesheet.styl';


const EquipmentsSearch = ({ select, equip, itemDisplayed, className, ...otherProps }) => {
  const [store, dispatch] = useContext(EquipmentsContext);

  // custom hook useParams?
  const [searchText, setSearchText] = useState('');
  const updateSearchBar = debounce(e => setSearchText(e.target.value), 200);
  
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(80);
  const [levelMin, setLevelMin] = useState(1);
  const [levelMax, setLevelMax] = useState(200);
  const types = selectors.getActiveTypes(store);
  const order = types === 'trophy,dofus' && { type: 1, level: -1, _id: -1 };


  return (
    <Query query={gql(equipmentsList)} variables={{ perPage, skip: (page - 1) * perPage, types, levelMin, levelMax }}>
      {({ loading, error, data: { equipmentMany: equipments = [] } = {} }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <Column className={arrayToClassName(['equipments-search', className])} {...otherProps}>
            <Column className="bg-primary pad-1-rem">
              <input className="searchbar justify-center pad-1-rem" type="text" onChange={updateSearchBar} placeholder="Search for an item" />
              <div className="justify-center">
                <label><input type="checkbox" name="strength" />Force</label>
                <label><input type="checkbox" name="intel" />Intel</label>
                <label><input type="checkbox" name="agility" />Agilité</label>
                <label><input type="checkbox" name="chance" />Change</label>
              </div>
            </Column>

            <EquipmentsList
              equipments={equipments}
              equip={equip}
              select={select}
              selected={itemDisplayed}
            />
          </Column>
        );
      }}
    </Query>
  );
}
export default EquipmentsSearch;
