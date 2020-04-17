import React, { useState, useContext, useEffect, useRef } from 'react';
import get from 'lodash.get';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid, Element, Icon, Column, Input, Spinner } from 'muejs';

import EquipmentsContext from '../../store/context/equipments';

import * as service from '../../services/equipments';
import * as actions from '../../store/actions/equipments';
import * as selectors from '../../store/selectors/equipments';

import EquipmentsList from '../EquipmentsList';

import { arrayToClassName } from '../../utils/common';
import { equipmentsList } from '../../queries';

import './stylesheet.styl';

import { STATS_IMG_URI } from '../../constants/URIs'
import { STATS } from 'shokkoth-constants'
const { ELEMENTS_STATS, AGILITY, STRENGTH, INTELLIGENCE, CHANCE } = STATS


const EquipmentsSearch = ({ select, equip, itemDisplayed, className, ...otherProps }) => {
  const [store, dispatch] = useContext(EquipmentsContext);

  // custom hook useParams?
  const [search, setSearch] = useState('');
  const updateSearchBar = debounce(newValue => setSearch(newValue), 200);

  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(80);
  const [levelMin, setLevelMin] = useState(190);
  const [levelMax, setLevelMax] = useState(200);
  const categories = selectors.getActiveCategory(store) || '';
  // const order = types === 'trophy,dofus' && { type: 1, level: -1, _id: -1 };


  const { loading, error, data: { equipmentMany: equipments = [] } = {}, refetch } = useQuery(gql(equipmentsList), {
    variables: {
      filter: { search, 'categoryIn': categories ? categories.split(',') : undefined, levelMin, levelMax },
      skip: Math.max((page - 1), 0) * perPage, // page 0 and page 1 are the same
      perPage,
      sort: 'TYPEORDER_ASC',
    }
  });

  useEffect(() => {
    refetch();
  }, [page, perPage, levelMin, levelMax, search])

  return (
    <Column className={arrayToClassName(['equipments-search', className])} {...otherProps}>
      <Input className="searchbar justify-center ph-24 pv-20" type="text" onChange={e => updateSearchBar(e.target.value)} placeholder="Écrivez le nom d'un équipement" />
      <Column className="filters bg-primary p-15">
        <div className="justify-center">
          <label>
            <input type="checkbox" name="strength" className="hidden" />
            <img src={`${STATS_IMG_URI}/${ELEMENTS_STATS[STRENGTH]}`} />
          </label>
          <label>
            <input type="checkbox" name="intelligence" className="hidden" />
            <img src={`${STATS_IMG_URI}/${ELEMENTS_STATS[INTELLIGENCE]}`} />
          </label>
          <label>
            <input type="checkbox" name="agility" className="hidden" />
            <img src={`${STATS_IMG_URI}/${ELEMENTS_STATS[AGILITY]}`} />
          </label>
          <label>
            <input type="checkbox" name="chance" className="hidden" />
            <img src={`${STATS_IMG_URI}/${ELEMENTS_STATS[CHANCE]}`} />
          </label>
        </div>
      </Column>

      { loading ? <Spinner style={{ alignSelf: 'center', margin: 'auto' }} /> : (
        <EquipmentsList
          equipments={equipments}
          equip={equip}
          select={select}
          selected={itemDisplayed}
        />
      ) }
    </Column>
  );
}
export default EquipmentsSearch;
