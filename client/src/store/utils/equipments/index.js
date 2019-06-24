import get from 'lodash.get';
import memoize from 'lodash.memoize';


export const createKey = memoize(({ types, order, lvlMin, lvlMax } = {}) => {
  const formattedOrder = JSON.stringify(sortByKeyNames(order));

  const params = [];
  if (types && types !== '') params.push(`types=${types}`);
  if (order && order !== { level: -1, type: 1, _id: -1 }) params.push(`order=${formattedOrder}`);

  if (lvlMin && lvlMin !== 1) params.push(`lvlMin=${lvlMin}`);
  if (lvlMax && lvlMax !== 200) params.push(`lvlMax=${lvlMax}`);

  const key = params.filter(e => !!e).join('&');
  return key === '' ? 'all' : key
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
