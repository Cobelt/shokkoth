import deepEqual from 'lodash.isequal';
import get from 'lodash.get';
import { action } from '../../utils';
import * as cookies from '../../../utils/cookies';

import { setDefaultStuffValues } from '../../utils/equipments';

import {
  SAVE_CHARACTERS,
  SAVE_MY_CHARACTERS,
} from '../../constants/data';

import * as selectors from '../../selectors/data/characters';
import * as services from '../../../services/data/characters';


export async function saveSearch(data, [store, dispatch]) {
  // [data].flat().map(character => character.id);
};

export async function saveMines({ data, params }, [store, dispatch]) {
  dataArray = [data].flat();
  const ids = dataArray.map(character => character.id);

  dispatch(action({ type: SAVE_CHARACTERS, loading: true, payload: { params } }));

  try {
    dispatch(action({ type: SAVE_MY_CHARACTERS, payload: { data: ids, params } }));
    dispatch(action({ type: SAVE_CHARACTERS, loading: true, payload: { data: dataArray } }));
  } catch (error) {
    dispatch(action({ type: SAVE_CHARACTERS, loading: true, payload: { error, params } }));
  }

}
