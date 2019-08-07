import set from 'lodash.set';

import { Users } from '../models';
import { getLocale } from '../utils';
import { adminAccess, generateHash, comparePassword, getUserId } from '../utils/auth';

export const updateSelf = async ({ source, args, context, info }) => {
  try {
    const { username, email, password, newPassword } = args;
    const { _id } = getLocale(context.res, 'decoded');
    if (!_id) throw new Error('You are not logged.');
    const user = await Users.findById({ _id });

    const hash = password && await generateHash(newPassword);
    if (username) user.username = username;
    if (email) user.email = email;
    if (newPassword && await comparePassword(password, user.hash)) {
      user.hash = generateHash(newPassword);
    }
    user.save();

    return user;
  }
  catch (e) {
    return e;
  }
};

export const addCharacter = async ({ source, args, context, info }) => {
  try {
    let userFound = await Users.findOne({ characters: { $in: [args.characterId] } });
    if (userFound) throw new Error(`This character is already linked to ${userFound._id == args.userId ? 'this' : 'another'} user`);

    const updated = await Users.updateOne({ _id: args.userId }, { $push: { characters: args.characterId } })
    if (!updated) throw new Error('Error on update');
  }
  catch (e) {
    return e;
  }
  return Users.findOne({ _id: args.userId }) // return the record
};

export const myRoles = async (rp) => {
  const userId = getUserId(rp);
  if (!userId) return [];

  const user = await Users.findOne({ _id: userId }).exec();
  console.log('user found=', user);
  return user.roles;
}
