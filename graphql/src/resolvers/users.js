import set from 'lodash.set';
import get from 'lodash.get';

import { Users } from '../models';
import { getLocale } from '../utils';
import { generateJWT, getJWTDecoded, generateHash, comparePassword, getUserId } from '../utils/auth';
import { setCookie } from '../utils/cookies';

export const updateSelf = async ({ source, args, context, info }) => {
  try {
    const { username, email, password, newPassword } = args;
    const { _id } = getLocale(context.res, 'decoded');
    if (!_id) throw new Error('You are not logged.');
    const user = await Users.findOne({ _id });

    if (username) user.username = username;
    if (email) user.email = email;
    if (newPassword && await comparePassword(password, user.hash)) {
      const hash = password && await generateHash(newPassword);
      if (hash) user.hash = hash
    }
    user.save();

    return User.findOne({ _id });
  }
  catch (e) {
    return e;
  }
};

export const addCharacter = async ({ source, args, context, info }) => {
  try {
    let userFound = await Users.findOne({ characters: { $in: [args.characterId] } });
    if (userFound) throw new Error(`This character is already linked to ${userFound._id == args.userId ? 'this' : 'another'} user`);

    const updated = await Users.updateOne({ _id: args.userId }, { $push: { characters: args.characterId } }, { new: true })
    if (!updated) throw new Error('Error on update');

    return Users.findOne({ _id: args.userId }) // return the record
  }
  catch (e) {
    return e;
  }
};

export const getSelf = async (rp) => {
  const userId = getUserId(rp);
  if (!userId) return {};
  return Users.findOne({ _id: userId });
}

export const myRoles = async (rp) => {
  const userId = getUserId(rp);
  if (!userId) return [];

  const user = await Users.findOne({ _id: userId }).exec();
  return user.roles;
}

export async function signin(rp) {
  try {
    const { args } = rp

    const username = (args.username || '').toLowerCase();
    const hash = await generateHash(args.password);

    await Users.create({ username: username.toLowerCase(), hash });

    return await login(rp);
  } catch (e) {
    return e;
  }
}

export async function login(rp) {
  try {
    const { args, context } = rp

    // if (getJWTDecoded(rp) && Date.now() < exp * 1000) throw new Error('You are already logged with another account');
    
    const username = (args.username || '').toLowerCase();
    const email = (args.email || '').toLowerCase();
    if (!username && !email) throw new Error("L'username ou l'email est requis pour se connecter")

    const user = await Users.findOne({ $or: [
      { username: username.toLowerCase() },
      { email: email.toLowerCase() },
    ] }).exec();

    if (!user) throw new Error("L'username ou le mot de passe est incorrect");

    const passwordMatch = await comparePassword(args.password, user.hash)
    if (!passwordMatch) throw new Error("L'username ou le mot de passe est incorrect");

    else {
      const token = await generateJWT(user);
      setCookie(context.res, { name: 'login/TOKEN', value: token, expiresIn: 1/24 })
      return token;
    }
  } catch (e) {
    return e;
  }
}

