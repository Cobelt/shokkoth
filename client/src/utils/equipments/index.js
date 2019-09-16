import get from 'lodash.get';
import memoize from 'lodash.memoize';

export const getItemOfCategory = memoize((stuff, category, index = 0) => {
  if (!get(stuff, 'equipments')) return;
  const equipments = Object.values(stuff.equipments);
  if (equipments.length <= 0) return;

  return get(equipments.filter(i => i && i.category === category), `[${index}]`);
}, (...args) => JSON.stringify(args));
