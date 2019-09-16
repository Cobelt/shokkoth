import get from 'lodash.get';

import { Users, Characters } from '../models';
import { getUserId, ownCharacter, ownStuff } from '../utils/auth';


export const canUpdateCharacter = next => rp => {
  const userId = get(rp, 'context.userId') || getUserId(rp);
  console.log('yo', userId)
  if (!ownCharacter(userId, get(rp, 'args.characterId')) && !isAtLeastAdmin(rp)) {
    return next(new Error('User does not have access to this character.'))
  };

  next(rp);
};

export const canSeeStuff = next => async rp => {
  const userId = get(rp, 'context.userId') || getUserId(rp);
  const stuffId = get(rp, 'args.stuffId');

  if (!ownStuff(userId, stuffId) && !isAtLeastAdmin(rp)) {
    const stuff = await Stuffs.findOne({ _id: stuffId });
    if (stuff && stuff.public) {
      return next(rp);
    }
    return next(new Error('User does not have access to this character.'))
  };

  next(rp);
}

export const canUpdateStuff = next => rp => {
  const userId = get(rp, 'context.userId') || getUserId(rp);

  if (!ownStuff(userId, get(rp, 'args.stuffId')) && !isAtLeastAdmin(rp)) {
    return next(new Error('User does not have access to this character.'))
  };

  next(rp);
};
