import get from 'lodash.get';
import set from 'lodash.set';

import { Users, Stuffs, Characters, Breeds, Equipments } from '../models';
import { removeSuperfluxElements, verifyBothAreSameCategory } from '../models/stuffs';
import { getUserId, isAtLeastAdmin } from '../utils/auth';

export const myStuffs = async rp => {
  try {
    let { filter = {}, limit, skip } = rp.args;
    const userId = getUserId(rp);
    if (!userId) throw new Error('No userId found in access token.', { statusCode: 403 });

    const user = await Users.findOne({ _id: userId }).exec();
    if (user.characters.length <= 0) return [];

    const myCharacters = await Characters.find({ _id: { $in: user.characters } });

    const stuffsIds = myCharacters.map(character => character.stuffs).flat().filter(stuff => stuff && (!filter._id || filter._id == stuff) && (!filter._ids || filter._ids.find(id => id == stuff)));
    delete filter._id;
    delete filter._ids;


    set(filter, '_id', { $in: stuffsIds });
    if (filter.searchName) {
      set(filter, 'name', new RegExp(filter.searchName, 'i'))
      delete filter.searchName;
    }
    if (filter.search && filter.search.length >= 2) {
      const breeds = await Breeds.find({ name: { $regex: filter.search } });
      const equipments = await Equipments.find({ name: { $regex: filter.search } });
      set(filter, '$or', [
        { name: new RegExp(filter.search, 'i') },
        { 'breed.$in': breeds.map(b => b._id) },
        { 'equipments.$in': equipments.map(e => e._id) },
        { tags: new RegExp(filter.search, 'i') },
      ]);
      delete filter.search;
    }

    return Stuffs.find(filter).sort('-updatedAt').skip(skip).limit(limit);
  }
  catch (e) {
    return e;
  }
}


export const equip = async ({ source, args, context, info }) => {
  try {
    const { equipmentId, replacedEquipmentId, stuffId } = args;

    const stuff = await Stuffs.findOne({ _id: stuffId });
    const { equipments: equipmentsIds } = stuff;

    if (replacedEquipmentId) {
      if (await verifyBothAreSameCategory(equipmentId, replacedEquipmentId)) {
        const indexOfReplaced = equipmentsIds.indexOf(replacedEquipmentId);
        if (indexOfReplaced !== -1) {
          equipmentsIds[indexOfReplaced] = equipmentId;
          stuff.equipments = equipmentsIds;
          const saved = await stuff.save();
          return saved;
        }
      }
    }

    const filteredEquipmentsIds = await removeSuperfluxElements([...equipmentsIds, equipmentId]);
    if (Math.abs((equipmentsIds || []).length - (filteredEquipmentsIds || []).length) <= 1) {
      stuff.equipments = filteredEquipmentsIds
    }
    const saved = await stuff.save();
    return saved;
  }
  catch (e) {
    console.log('error:', e)
    return e;
  }
}

export const removeEquipment = async ({ source, args, context, info }) => {
  try {
    const { equipmentId, stuffId } = args;

    const stuff = await Stuffs.updateOne({ _id: stuffId }, { $pull: { equipments: equipmentId } }, { new: true });
    return stuff;
  }
  catch (e) {
    return e;
  }
}

export const emptyEquipments = async ({ source, args, context, info }) => {
  try {
    const { equipmentId, stuffId } = args;

    const stuff = await Stuffs.updateOne({ _id: stuffId }, { $set: { equipments: [] } }, { new: true });
    return stuff;
  }
  catch (e) {
    return e;
  }
}



export const createOne = async ({ source, args, context }) => {
  try {
    const { characterId, record } = args;

    const stuff = await Stuffs.create(record);
    await Characters.updateOne({ _id: characterId }, { $push: { stuffs: stuff._id } }).exec();

    return Stuffs.findOne({ _id: stuff._id });
  }
  catch (e) {
    return e;
  }
};

export const duplicateOne = async ({ source, args, context }) => {
  try {
    const { characterId, stuffId } = args;

    const existing = await Stuffs.findOne({ _id: stuffId }).exec();
    const stuff = await Stuffs.create({ ...existing._doc, _id: undefined, isNew: true })
    await Characters.updateOne({ _id: characterId }, { $push: { stuffs: stuff._id } }, { new: true }).exec();

    return Stuffs.findOne({ _id: stuff._id });
  }
  catch (e) {
    console.log(e)
    return e;
  }
};


export const createDraft = async ({ source, args, context }) => {
  try {
    const { record } = args;

    const userId = getUserId({ context });
    if (!userId) throw new Error('No userId found in access token.', { statusCode: 403 });

    const stuff = await Stuffs.create(record);
    const user = await Users.findOne({ _id: userId }).exec();
    const character = await Characters.updateOne({ name: 'Brouillon', _id: { $in: user.characters } }, { $push: { stuffs: stuff._id } }, { new: true, upsert: true, setDefaultsOnInsert: true }).exec();
    user.characters.push(character._id);
    user.save()

    return Stuffs.findOne({ _id: stuff._id });
  }
  catch (e) {
    return e;
  }
};


export const updateOne = async ({ source, args, context, info }) => {
  try {
    const { stuffId, record } = args;

    return Stuffs.updateOne({ _id: stuffId }, record, { new: true });
  }
  catch (e) {
    return e;
  }
};

export const removeOne = async ({ source, args, context, info }) => {
  try {
    const { stuffId } = args;

    await Characters.update({ stuffs: stuffId }, { $pull: { stuffs: stuffId } }).exec();
    return Stuffs.deleteOne({ _id: stuffId }, { ne});
  }
  catch (e) {
    return e;
  }
};


export const forcePublicFilter = next => rp => {
  if (!isAtLeastAdmin(rp)) {
    set(rp, 'args.filter.public', true) // added only if not admin
  }
  return next(rp);
}

export const addNotEmptyFilter = next => rp => {
  set(rp, 'args.filter.notEmpty', true)
  return next(rp);
}

export const sortByLatest = next => rp => {
  if (!get(rp, 'args.sort')) {
    set(rp, 'args.sort', '-updatedAt') // added only if no sort are already set
  }
  return next(rp);
}
