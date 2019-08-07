import get from 'lodash.get';

export const getItemOfCategory = (equipments, category, index = 0) => get(equipments.filter(i => i.category === category), `[${index}]`);
