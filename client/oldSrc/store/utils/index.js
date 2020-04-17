import get from 'lodash.get';
import memoize from 'lodash.memoize';

// Give it some utility please
export const action = ({ loading, payload, type }) => ({ type, payload: { ...payload, loading } });


export const createKey = memoize(({ types, order, searchText, levelMin, levelMax } = {}) => {
  const formattedOrder = JSON.stringify(sortByKeyNames(order));

  const params = [];
  if (types && types !== '') params.push(`types=${types}`);
  if (searchText && searchText !== '') params.push(`searchText=${searchText}`);
  if (order && order !== { level: -1, type: 1, _id: -1 }) params.push(`order=${formattedOrder}`);

  if (levelMin && levelMin !== 1) params.push(`levelMin=${levelMin}`);
  if (levelMax && levelMax !== 200) params.push(`levelMax=${levelMax}`);

  const key = params.filter(e => !!e).join('&');
  return key === '' ? 'all' : key;
});

export const sortByKeyNames = (obj) => {
  if (!obj) return '';
  const ordered = {};
  Object.keys(obj).sort().forEach((key) => {
    ordered[key] = obj[key];
  });
  return ordered;
};

export const setDefaultStuffValues = memoize((equipment) => {
  const toReturn = equipment;
  const fixedStats = [];

  get(equipment, 'statistics').forEach(stat => {
    stat.value = stat.max || stat.min;
    fixedStats.push(stat);
  })

  toReturn.statistics = fixedStats;
  return toReturn;
});
