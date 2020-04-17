import get from 'lodash.get';
import memoize from 'lodash.memoize';

export const getItemOfCategory = memoize((stuff, category, index = 0) => {
  if (!get(stuff, 'equipments')) return null
  const equipments = Object.values(stuff.equipments);
  if (equipments.length <= 0) return null

  return get(equipments, `[${category}][${index}]`);
}, (...args) => JSON.stringify(args));
