import get from 'lodash.get'
import pickBy from 'lodash.pickby'
import memoize from 'lodash.memoize'
import { createSelector } from 'reselect'

import { createKey } from '../../utils'

import { STATS } from 'shokkoth-constants'
const {
  AP,
  MP,
  SUMMONS,
  INITIATIVE,
  VITALITY,
  WISDOM,
  AP_MP_PARRY,
  AP_MP_REDUCTION,
  AGILITY,
  ESCAPE_STATS,
  CHANCE,
  PROSPECTING,
  ELEMENTS_STATS,
  STATS: ALL_STATS,
} = STATS

const _getStore = store => store
const _getStuffParam = (_, { stuff } = {}) => stuff
const _getCategoryParam = (_, { category } = {}) => category
const _getIndexParam = (_, { index } = {}) => index
const _getStatNameParam = (_, { name } = {}) => name

export const getEquipmentsStore = (store) => get(store, 'equipments')
export const getStuffStore = store => get(store, 'stuff')


export const getRingToAdd = createSelector(getStuffStore, stuff => get(stuff, 'ringToAdd') || 0)
export const getDofusToAdd = createSelector(getStuffStore, stuff => get(stuff, 'dofusToAdd') || 0)


export const getActiveStep = (store) => get(store, 'step')
export const getActiveCategory = createSelector(getActiveStep, step => get(step, 'category'))
export const getActiveIndex = createSelector(getActiveStep, step => get(step, 'index'))

export const getActiveStuff = createSelector(getStuffStore, stuff => get(stuff, 'active'))

export const getStuff = createSelector(
  _getStore,
  _getStuffParam,
  (store, stuff) => Object.keys(stuff || {}).length > 0 ? stuff : getActiveStuff(store)
)

export const getStatsStore = createSelector(getStuff, stuff => get(stuff, 'stats'))
export const getStuffLevel = createSelector(getStuff, stuff => get(stuff, 'level'))


export const getDisplayedEquipment = createSelector(getEquipmentsStore, store => get(store, 'displayed'))


export const getCharacterBaseStats = createSelector(getStatsStore, stats => {
  try {
    const toReturn = {}
    Object.entries(stats).forEach(([name, { base } = {}]) => toReturn[name] = base)
    return toReturn
  } catch (e) {
    return {}
  }
})
export const getCharacterBaseStat = createSelector(
  getCharacterBaseStats,
  _getStatNameParam,
  (stats, name) => get(stats, name)
)

export const getCharacterParchoStats = createSelector(getStatsStore, stats => {
  try {
    const toReturn = {}
    Object.entries(stats).forEach(([name, { parcho } = {}]) => toReturn[name] = parcho)
    return toReturn
  } catch (e) {
    return {}
  }
})
export const getCharacterParchoStat = createSelector(
  getCharacterParchoStats,
  _getStatNameParam,
  (stats, name) => get(stats, name)
)



// STUFF
export const getStuffEquipments = createSelector(
  getStuff,
  stuff => get(stuff, 'equipments') || {},
)

export const getStuffEquipment = createSelector(
  getStuffEquipments,
  _getCategoryParam,
  _getIndexParam,
  (equipments, category, index) => get(equipments, `${category}.${index}`),
)


// BONUSES
export const getStuffSetsBonuses = createSelector(
  getStuffEquipments,
  equipments => {
  const itemsPerSet = {}
  try {
    const equipmentsList = Object.values(equipments).map(category => Object.values(category)).flat() || []
    const sets = equipmentsList.map(equipment => ({ equipmentId: get(equipment, '_id'), set: get(equipment, 'set') })).filter(e => !!get(e, 'set'))
    sets.forEach(({ equipmentId, set }) => {
      const id = get(set, '_id')
      if (id) {
        if (!itemsPerSet[id]) {
          itemsPerSet[id] = { nbItems: 1, equiped: [equipmentId], set }
        }
        else if (!itemsPerSet[id].equiped.includes(equipmentId)) {
          itemsPerSet[id].nbItems++
          itemsPerSet[id].equiped.push(equipmentId)
        }
      }
    })
    return Object.values(itemsPerSet).filter(i => i.nbItems > 1)
  }
  catch (e) {
    return {}
  }
})



// STATS
export const getInitStats = () => {
  const toReturn = {}
  for (let stat of Object.keys(ALL_STATS)) {
    toReturn[stat] = 0
  }
  return toReturn
}

export const getPointsToDispatch = createSelector(
  getCharacterBaseStats,
  getStuffLevel,
  (base, level) => {
    // todo change 200 by lvl
    let pointsToDispatch = 5*(level - 1)
    pointsToDispatch -= parseInt(base[VITALITY], 10)
    pointsToDispatch -= parseInt(base[WISDOM], 10) * 3

    for (let stat of Object.keys(ELEMENTS_STATS)) {
      let statsPoints = parseInt(base[stat], 10)
      let ratio = 1
      while(statsPoints > 0) {
        const pointsToCount = Math.min(statsPoints, 100)
        pointsToDispatch -= ratio * pointsToCount
        statsPoints -= pointsToCount
        ratio++
      }
    }
    return pointsToDispatch
  }
  )
  
export const getEquipmentsStats = createSelector(
  getInitStats,
  getStuffEquipments,
  getStuffSetsBonuses,
  memoize((initStats, equipments, setsBonuses) => {
    try {
      if (equipments) {
        const equipmentsList = Object.values(equipments).map(category => Object.values(category)).flat()

        for (let equipment of Object.values(equipmentsList)) {
          if (get(equipment, 'statistics.length') > 0)
          for (let stat of equipment.statistics) {
            if (stat && Object.keys(ALL_STATS).includes(stat.name)) {
              initStats[stat.name] += parseInt(stat.value || stat.max || stat.min, 10)
            }
          }
        }

        if (setsBonuses) {
          for (let { nbItems, equiped, set } of setsBonuses) {
            const currentBonus = set.bonus.find(bonus => bonus.number === nbItems - 1)
            if (get(currentBonus, 'statistics')) {
              for (let stat of currentBonus.statistics) {
                if (stat && Object.keys(ALL_STATS).includes(stat.name)) {
                  initStats[stat.name] += parseInt(stat.value || stat.max || stat.min, 10)
                }
              }
            }
          }
        }

      }

      return initStats
    }
    catch (e) {
      console.warn('Error on getEquipmentsStats', e)
      return initStats
    }
  }, (_, equipments) => JSON.stringify(equipments))
)

export const getEquipmentsStat = createSelector(
  getEquipmentsStats,
  _getStatNameParam,
  (stats, name) => get(stats, name)
)


export const getStats = createSelector(
  getInitStats,
  getStatsStore,
  getEquipmentsStats,
  getStuffLevel,
  (initStats, characterStats, equipmentsStats, level) => {
    initStats[AP] = level && level < 100 ? 6 : 7
    initStats[MP] = 3
    initStats[SUMMONS] = 1
    initStats[VITALITY] = 55 + ((level || 200) - 1) * 5

    if (characterStats) {
      for (let [statName, { base = 0, parcho = 0 } = {}] of Object.entries(characterStats)) {
        initStats[statName] += base + parcho
      }
    }

    Object.entries(equipmentsStats).forEach(([name, value]) => 
      initStats[name] += parseInt(value, 10)
    )

    Object.keys(ELEMENTS_STATS).forEach(name => {
      initStats[INITIATIVE] += initStats[name]
    })

    Object.keys(AP_MP_PARRY).forEach(name => {
      initStats[name] += Math.trunc(initStats[WISDOM] / 10)
    })

    Object.keys(AP_MP_REDUCTION).forEach(name => {
      initStats[name] += Math.trunc(initStats[WISDOM] / 10)
    })

    Object.keys(ESCAPE_STATS).forEach(name => {
      initStats[name] += Math.trunc(initStats[AGILITY] / 10)
    })

    initStats[PROSPECTING] += Math.trunc(initStats[CHANCE] / 10)

    return initStats
  }
)

export const getStat = createSelector(
  getStats,
  _getStatNameParam,
  (stats, name) => get(stats, name)
)