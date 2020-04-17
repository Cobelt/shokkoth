import get from 'lodash.get';
import set from 'lodash.set';

import { Characters, Users } from '../models';
import { getUserId, isAtLeastAdmin } from '../utils/auth';

export const myCharacters = async ({ args, context }) => {
  try {
    let { filter = {}, limit, skip } = args;
    const userId = getUserId({ context });
    if (!userId) throw new Error('No userId found in access token.', { statusCode: 403 });

    const user = await Users.findOne({ _id: userId }).exec();
    if (user.characters.length <= 0) return [];

    const charactersIds = user.characters.filter(character => character && (!filter._id || filter._id == character) && (!filter._ids || filter._ids.find(id => id == character)));
    delete filter._id;
    delete filter._ids;

    set(filter, '_id', { $in: charactersIds });

    return Characters.find(filter).skip(skip).limit(limit);
  }
  catch (e) {
    return e;
  }
}


export const addStuff = async ({ source, args, context, info }) => {
  try {
    let characterFound = await Characters.findOne({ stuffs: { $in: [args.stuffId] } });
    if (characterFound) {
      throw new Error(`This stuff is already linked to ${characterFound._id == args.characterId ? 'this' : 'another'} character`);
    }

    const updated = await Characters.updateOne({ _id: args.characterId }, { $push: { stuffs: args.stuffId } }, { new: true })
    if (!updated) throw new Error('Error on update');
  }
  catch (e) {
    return e;
  }
  return Characters.findOne({ _id: args.characterId }) // return the record
}


export const removeStuff = async ({ source, args, context, info }) => {
  try {
    let characterFound = await Characters.findOne({ stuffs: { $in: [args.stuffId] } });
    if (characterFound._id != args.characterId) {
      throw new Error(`This stuff is not linked this character`);
    }
  }
  catch (e) {
    return e;
  }
  return Characters.updateOne({ _id: args.characterId }, { $pull: { stuffs: args.stuffId } }, { new: true })
}


export const createOne = async ({ args, context }) => {
  try {
    const userId = getUserId(rp);
    const { record } = args;

    const character = await Characters.create(record);
    await Users.updateOne({ _id: userId }, { $push: { characters: character._id } }).exec();

    return Characters.findOne({ _id: character._id });
  }
  catch (e) {
    return e;
  }
}

export const updateOne = async ({ source, args, context, info }) => {
  try {
    const { characterId, record } = args;
    return Characters.updateOne({ _id: characterId }, record, { new: true });
  }
  catch (e) {
    return e;
  }
};


export const removeOne = async ({ source, args, context, info }) => {
  try {
    const { characterId } = args;

    await Users.update({ characters: characterId }, { $pull: { characters: characterId } }).exec();
    return Characters.deleteOne({ _id: characterId }, { ne});
  }
  catch (e) {
    return e;
  }
};
