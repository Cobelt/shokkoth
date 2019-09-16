import memoize from 'lodash.memoize'

import { RESOURCES } from 'shokkoth-models';

export const getRealType = memoize((type) => {
  return RESOURCES.getKey(type)
});
