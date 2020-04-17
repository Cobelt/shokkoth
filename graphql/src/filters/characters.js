import get from 'lodash.get';
import set from 'lodash.set';
import { Breeds, Stuffs } from '../models';

export const hasStuff = {
  name: 'hasStuffIn',
  type: '[MongoID]',
  query: (query, value) => set(query, 'stuffs.$in', value),
};

export const withStuffs = {
  name: 'withStuffs',
  type: 'Boolean',
  query: (query, value) => set(query, 'stuffs', { $exists: value, $ne: [] }),
};

export const draft = {
  name: 'draft',
  type: 'Boolean',
  query: (query, value) => set(query, 'name', drafts ? "Brouillon" : get(query, 'name')),
};

export const searchStuffs = {
  name: 'searchStuffs',
  type: 'String',
  query: async (query, value) => {
    if (!value.length >= 2) return query;
    const breeds = await Breeds.find({ name: { $regex: value } });
    const stuffs = await Stuffs.find({ $or: [
      { breed: { $in: breeds.map(b => b._id) } },
      { name: { $regex: value } },
    ] });
    set(query, 'stuffs.$in', stuffs.map(s => s._id));
    return query;
  }
};
