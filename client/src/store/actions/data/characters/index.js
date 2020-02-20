import deepEqual from 'lodash.isequal';
import get from 'lodash.get';
import { action, setDefaultStuffValues } from '../../../utils';
import * as cookies from '../../../../utils/cookies';

import {
  SAVE_CHARACTERS,
  SAVE_MY_CHARACTERS,
} from '../../../constants/data';

import * as selectors from '../../../selectors/data/characters';


export async function saveSearch(data, [store, dispatch]) {
  // [data].flat().map(character => character.id);
};

export async function saveMines({ fetched, params }, [store, dispatch]) {
  const dataArray = [fetched].flat();
  const data = {};
  dataArray.forEach(item => {
    data[item._id] = item;
  });
  const ids = dataArray.map(character => character._id);

  dispatch(action({ type: SAVE_CHARACTERS, loading: true, payload: { params } }));

  try {
    dispatch(action({ type: SAVE_MY_CHARACTERS, payload: { ids, params } }));
    dispatch(action({ type: SAVE_CHARACTERS, loading: true, payload: { data } }));
  } catch (error) {
    dispatch(action({ type: SAVE_CHARACTERS, loading: true, payload: { error, params } }));
  }

}
