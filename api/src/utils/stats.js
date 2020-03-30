import memoize from 'lodash.memoize'

import { toURLValid } from './common'

import { STATS, WEAPONS_CHARACTERISTICS } from '../constants/stats'


export const getStatSrcImg = memoize((label) => {
  let srcImg
  const found = Object.entries(STATS).find(([statName, value]) => toURLValid(statName) === toURLValid(label))
  if (found) {
    const [key, value] = found
    srcImg = value
  }

  return srcImg || null
})


export const getWeaponCharac = memoize((label) => {
  let charac
  const found = Object.entries(WEAPONS_CHARACTERISTICS).find(([statName, value]) => toURLValid(statName) === toURLValid(label))
  if (found) {
    const [statName, value] = found
    charac = value
    charac.imgUrl = value.imgUrl
  }

  return charac || null
})

export const getWeaponCharacSrcImg = (label) => {
  const charac = getWeaponCharac(label)
  return charac ? charac.imgUrl : null
}

export const getDefaultPassiveImg = memoize(() => 'passif.png')



export const isWeaponCharac   = (label) => getWeaponCharacSrcImg(label)  !== null
export const isStat           = (label) => getStatSrcImg(label)          !== null
export const isPassif         = (label) => !getStatSrcImg(label) && !getWeaponCharacSrcImg(label)
