import get from 'lodash.get'
import setWith from 'lodash.setwith'
import clone from 'lodash.clonedeep'

import { action, setDefaultStuffValues } from '../../utils'
import * as cookies from '../../../utils/cookies'
import { STUFFS } from 'shokkoth-constants'

import {
  SAVE_ACTIVE,

  SAVE_STEP,
  SAVE_DISPLAYED,

  RING_ADDED,
  DOFUS_ADDED,

  SAVE_STAT,
  SAVE_PARCHO,
} from '../../constants/equipments'

import * as selectors from '../../selectors/equipments'




export async function equip({ equipment } = {}, [store, dispatch]) {
    if (!equipment) return null

    const stuff = { ...(selectors.getActiveStuff(store) || {}) }
    if (!stuff) return null

    try {
      const { _id, name: equipName, category: equipmentCategory } = equipment || {}

      const { category: activeCategory, index: activeIndex } = selectors.getActiveStep(store) || { index: 0 }
      
      let category = activeCategory
      let index = activeIndex

      if (!activeCategory || !activeCategory.match(equipmentCategory)) {
        // todo use "last ring added" and "last dofus added"
        if (equipmentCategory) {
          if (['hat', 'weapon', 'belt', 'amulet', 'boots', 'shield'].includes(equipmentCategory)) {
            category = equipmentCategory
          }
          else if (['cloak', 'backpack'].includes(equipmentCategory)) {
            category = 'cloak'
          }
          else if (equipmentCategory === 'ring') {
            const ringToAdd = selectors.getRingToAdd(store)
            category = 'ring'
            index = ringToAdd
            dispatch(action({ type: RING_ADDED }))
          }
          else if (['trophy', 'dofus'].includes(equipmentCategory)) {
            const dofusToAdd = selectors.getDofusToAdd(store)
            category = 'dofus'
            index = dofusToAdd
            dispatch(action({ type: DOFUS_ADDED }))
          }
        }
      }

      if (!category) return console.warn('No category found')

      const replacedEquipment = get(stuff, `equipments.[${category}][${index}]`)

      if (replacedEquipment && replacedEquipment._id === _id) return null
      
      dispatch(action({ type: SAVE_ACTIVE, payload: { stuff: {
        ...stuff,
        equipments: {
          ...(get(stuff, 'equipments') || {}),
          [category]: {
            ...(get(stuff, `equipments.${category}`) || {}),
            [index]: equipment,
          }
        }
      } } }))

      // const idsOfItems = {}
      // Object.entries(stuff).forEach(([category, item]) => {
      //   if (item._id && category) {
      //     idsOfItems[category] = { _id: item._id }
      //   }
      // })
      // cookies.set('STUFF_DRAFT', JSON.stringify(idsOfItems))

    }
    catch (error) {
      console.error('EQUIP ERROR:', error)
      dispatch(action({ type: SAVE_ACTIVE, payload: { error } }))
    }
}

export async function unequip({ equipment } = {}, [store, dispatch]) {
    if (!equipment) return null

    const stuff = selectors.getActiveStuff(store)
    if (!stuff || stuff.equipments.length <= 0) return null

    stuff.equipments.splice(stuff.equipments.findIndex(equip => equip._id === equipment._id), 1)

    try {
      dispatch(action({ type: SAVE_ACTIVE, payload: { stuff } }))
      // cookies.set('STUFF_DRAFT', JSON.stringify(idsOfItems))
    }
    catch (error) {
      dispatch(action({ type: SAVE_ACTIVE, payload: { error } }))
    }
}




export async function changeStep({ category, index }, [store, dispatch]) {
  dispatch(action({ type: SAVE_STEP, payload: { category, index } }))
  return true
}


export async function display({ equipment } = {}, [store, dispatch]) {
  if (!equipment) return null
  dispatch(action({ type: SAVE_DISPLAYED, payload: { equipment } }))
}

export function setBaseStats(stats, [store, dispatch]) {
  if (!stats) return null
  dispatch(action({ type: SAVE_STAT, payload: { stats } }))
  // cookies.set('STATS', JSON.stringify(selectors.getCharacterStats(store)))
}

export function setParchoStats(stats, [store, dispatch]) {
  if (!stats) return null
  dispatch(action({ type: SAVE_PARCHO, payload: { stats } }))
  // cookies.set('STATS', JSON.stringify(selectors.getCharacterStats(store)))
}

export function setActiveStuff({ stuff }, [store, dispatch]) {
  dispatch(action({ type: SAVE_ACTIVE, payload: { stuff } }))
}

export function changeStuffBreed(breed, [store, dispatch]) {
  const stuff = selectors.getActiveStuff(store)
  if (stuff) {
    dispatch(action({ type: SAVE_ACTIVE, payload: { stuff: { ...stuff, breed } } }))
  }
}
export function changeStuffName(name, [store, dispatch]) {
  const stuff = selectors.getActiveStuff(store)
  if (stuff) {
    dispatch(action({ type: SAVE_ACTIVE, payload: { stuff: { ...stuff, name } } }))
  }
}
export function changeStuffLevel(level, [store, dispatch]) {
  const stuff = selectors.getActiveStuff(store)
  if (stuff) {
    dispatch(action({ type: SAVE_ACTIVE, payload: { stuff: { ...stuff, level } } }))
  }
}
export function changeStuffGender(gender, [store, dispatch]) {
  const stuff = selectors.getActiveStuff(store)
  if (stuff) {
    dispatch(action({ type: SAVE_ACTIVE, payload: { stuff: { ...stuff, gender } } }))
  }
}
