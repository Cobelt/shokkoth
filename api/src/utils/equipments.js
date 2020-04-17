import memoize from 'lodash.memoize'

import { COMMON } from 'shokkoth-constants';


export const getRealType = memoize((type) => {
  return COMMON.getKey(type)
});


export const toCategory = memoize(COMMON.getCategory)

export const toTypeOrder = memoize(COMMON.getOrder)
