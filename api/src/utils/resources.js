import memoize from 'lodash.memoize'

import { RESOURCES } from 'shokkoth-constants';

export const getRealType = memoize((type) => {
  return RESOURCES.getKey(type)
});
