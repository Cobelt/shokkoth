import produce  from 'immer'
import set from 'lodash.set'

import { STATS } from 'shokkoth-constants'

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

const { VITALITY, WISDOM } = STATS


export const EquipmentsReducer = (store, { type, payload = {} } = {}) => {
    if (!type || !payload) return store

    // console.log('DISPATCH:', type)

    return produce(store, (draft) => {
      switch (type) {
        case SAVE_ACTIVE: {
          const { stuff, error } = payload
          if (stuff) set(draft, 'stuff.active', stuff)
          if (error) set(draft, 'stuff.active.error', error)
          break
        }

        case SAVE_STEP: {
          const { category, index } = payload
          set(draft, 'step', { category, index })
          break
        }

        case SAVE_DISPLAYED: {
          const { equipment } = payload
          set(draft, 'equipments.displayed', equipment)
          break
        }


        case RING_ADDED: {
          const ringToAdd = selectors.getRingToAdd(store)
          const nextRingToAdd = !isNaN(ringToAdd) ? (ringToAdd + 1) % 2 : 0
          set(draft, 'stuff.active.ringToAdd', nextRingToAdd)
          break
        }

        case DOFUS_ADDED: {
          const dofusToAdd = selectors.getDofusToAdd(store)
          const nextDofusToAdd = !isNaN(dofusToAdd) ? (dofusToAdd + 1) % 6 : 0
          set(draft, 'stuff.active.dofusToAdd', nextDofusToAdd)
          break
        }

        case SAVE_STAT: {
          const { stats } = payload
          try {
            Object.entries(stats).forEach(([name, value]) => {
              set(draft, `stuff.active.stats[${name}].base`, Math.min(Math.max(value || 0, 0), name === VITALITY ? 995 : name === WISDOM ? 331 : 398 ))
            })
          }
          catch (e) {
            console.warn("Warn: BaseStats store didn't update :", e)
          }
          break
        }

        case SAVE_PARCHO: {
          const { stats } = payload
          try {
            Object.entries(stats).forEach(([name, value]) => {
              set(draft, `stuff.active.stats[${name}].parcho`, Math.min(Math.max(value || 0, 0), 100))
            })
          }
          catch (e) {
            console.warn("Warn: ParchoStats store didn't update :", e)
          }
          break
        }

    }
    return draft
  })
}
