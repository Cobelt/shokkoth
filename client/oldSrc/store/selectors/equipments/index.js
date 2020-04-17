import get from 'lodash.get'
import pickBy from 'lodash.pickby'
import memoize from 'lodash.memoize'
import { createSelector } from 'reselect'

import { createKey } from '../../utils'

import { STATS } from 'shokkoth-constants'
const {
  STATS,
  AP,
  MP,
  SUMMONS,
  VITALITY,
  WISDOM,
  INITIATIVE,
  ELEMENTS_STATS,
} = STATS


export const getEquipmentsStore = (store) => get(store, 'equipments')
export const getStuffStore = store => get(store, 'stuff')
export const getStatStore = store => get(store, 'stats')


export const getRingToAdd = createSelector(getStuffStore, stuff => get(stuff, 'ringToAdd') || 'Left')
export const getDofusToAdd = createSelector(getStuffStore, stuff => get(stuff, 'dofusToAdd') || 1)


export const getActiveStep = (store) => get(store, 'step')
export const getActiveCategory = createSelector(getActiveStep, step => get(step, 'category'))
export const getActiveIndex = createSelector(getActiveStep, step => get(step, 'index'))

export const getActiveStuff = createSelector(getStuffStore, stuff => get(stuff, 'active'))
export const getDemoStuff = createSelector(getStuffStore, stuff => get(stuff, 'demo'))


export const getDisplayedEquipment = createSelector(getEquipmentsStore, store => get(store, 'displayed'))


export const getCharacterStatsBase = createSelector(getStatStore, stat => get(stat, 'base'))
export const getCharacterStatsParcho = createSelector(getStatStore, stat => get(stat, 'parcho'))


export const areEquipmentsLoading = createSelector(getEquipmentsStore, store => get(store, 'loading'))
export const getAllEquipments = createSelector(getEquipmentsStore, store => get(store, 'data'))
export const getAllEquipmentsLength = createSelector(getAllEquipments, allEquipments => allEquipments && Object.keys(allEquipments).length)



export const getEquipmentsIds = (store, { page = 0, perPage = 100, ...params } = {}) => {
  const equipments = get(store, `search.${createKey(params)}.data`) || []
  if (equipments.length <= 0) return equipments

  const offset = Math.max(0, page * perPage - 1)
  return equipments.slice(offset, offset+perPage)
}
export const areEquipmentsIdsLoading = (store, params) => get(store, `search.${createKey(params)}.loading`)


// Get populated equip
export const getEquipment = (store, id) => get(getAllEquipments(store), id)
export const getEquipments = (store, params) => {
  const ids = getEquipmentsIds(store, params)
  const equipments = []
  for (let id of ids) {
    const equipment = getEquipment(store, id)
    equipments.push(equipment)
  }
  return equipments
}



// STUFF
export const getStuffEquipments = createSelector(
  getActiveStuff,
  stuff => get(stuff, 'equipments') || {},
)

export const isStuffFullyFetched = createSelector(
  getStuffEquipments,
  equipments => {
    if (!pickBy(stuffIds) || !pickBy(populatedStuff)) return
    return Object.keys(pickBy(stuffIds)).length === Object.keys(pickBy(populatedStuff)).length
  }
)

export const getStuffEquipment = createSelector(
  getStuffEquipments,
  (store, category) => category,
  (store, category, index) => index,
  (equipments, category, index) => get(equipments.filter(i => i.category === category), `[${index}]`),
)


// BONUSES
export const getCurrentSetsBonus = createSelector(getStuffEquipments, equipments => {
  const itemsPerSet = {}
  const sets = Object.values(equipments).map(equipment => ({ equipmentId: get(equipment, '_id'), set: get(equipment, 'set') })).filter(e => !!get(e, 'set'))
  sets.forEach(({ equipmentId, set }) => {
    const id = get(set, '_id')
    if (id) {
      if (!itemsPerSet[id]) {
        itemsPerSet[id] = { nbItems: 1, equiped: [equipmentId], set }
      }
      else {
        itemsPerSet[id].nbItems++
        itemsPerSet[id].equiped.push(equipmentId)
      }
    }
  })
  return Object.values(itemsPerSet).filter(i => i.nbItems > 1)
})



// STATS
export const getInitStats = () => {
  const toReturn = {}
  for (let stat of Object.keys(STATS)) {
    toReturn[stat] = 0
  }
  return toReturn
}

export const getCharacterStats = createSelector(getCharacterStatsBase, getCharacterStatsParcho, (base, parcho) => {
  const stats = {}
  Object.entries(base).forEach(([name, value]) => stats[name] = { base: parseInt(value, 10) || 0, parcho: parseInt(parcho[name], 10) || 0 })
  return stats
})

export const getPointsToDispatch = createSelector(
  getCharacterStatsBase,
  base => {
    // todo change 200 by lvl
    let pointsToDispatch = 5*(200 - 1)
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


export const getStats = createSelector(
  getInitStats,
  getCharacterStats,
  (store, { stuff = {} } = {}) => Object.keys(stuff).length > 0 ? stuff : getActiveStuff(store),
  getCurrentSetsBonus,
  (initStats, characterStats, stuff, setsBonuses) => {
    const { level, equipments } = stuff || {}

    initStats[AP] = level && level < 100 ? 6 : 7
    initStats[MP] = 3
    initStats[SUMMONS] = 1
    initStats[VITALITY] = 55 + (level || 200) * 5

    if (characterStats) {
      for (let [statName, { base = 0, parcho = 0 } = {}] of Object.entries(characterStats)) {
        initStats[statName] += base + parcho
      }
    }

    if (equipments) {
      for (let equipment of Object.values(equipments)) {
        if (get(equipment, 'statistics.length') > 0)
        for (let stat of equipment.statistics) {
          if (stat && Object.keys(STATS).includes(stat.name)) {
            initStats[stat.name] += parseInt(stat.value || stat.max || stat.min, 10)
          }
        }
      }

      if (setsBonuses) {
        for (let { nbItems, equiped, set } of setsBonuses) {
          const currentBonus = set.bonus.find(bonus => bonus.number === nbItems - 1)
          if (get(currentBonus, 'statistics')) {
            for (let stat of currentBonus.statistics) {
              if (stat && Object.keys(STATS).includes(stat.name)) {
                initStats[stat.name] += parseInt(stat.value || stat.max || stat.min, 10)
              }
            }
          }
        }
      }
    }

    Object.keys(ELEMENTS_STATS).forEach(name => {
      initStats[INITIATIVE] += initStats[name]
    })

    return initStats
  }
)
