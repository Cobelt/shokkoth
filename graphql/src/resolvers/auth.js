import get from 'lodash.get';
import { getUserId } from '../utils/auth';

export const canUpdateCharacter = next => rp => {
  console.log('do i own that ?', rp.info);
  const userId = getUserId(rp);

  next(rp);
};
