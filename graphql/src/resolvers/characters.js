import set from 'lodash.set';

import { Characters, Users } from '../models';
import { adminAccess, getUserId } from '../utils/auth';

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

export const myCharacters = async (rp) => {
  let { filter, limit, skip } = rp.args;
  const userId = getUserId(rp);
  if (!userId) throw new Error('No userId found in access token.', { statusCode: 403 });

  const user = await Users.findOne({ _id: userId }).exec();
  if (user.characters.length <= 0) return null;
  set(filter, '_id', { $in: user.characters });
  return Characters.find(filter).skip(skip).limit(limit);
}
