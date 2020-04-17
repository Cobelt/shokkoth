import set from 'lodash.set';

export const ankamaIdIn = {
  name: 'ankamaIdIn',
  type: '[Float]',
  query: (query, value) => set(query, 'ankamaId', { $in: value }),
};

export const setAnkamaIdIn = {
  name: 'setAnkamaIdIn',
  type: '[Float]',
  query: (query, value) => set(query, 'set.ankamaId', { $in: value }),
};
