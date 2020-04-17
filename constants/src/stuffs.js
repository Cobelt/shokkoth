import * as COMMON from './common'
import * as WEAPONS from './weapons'

export function filterType(equipments, type) {
    return equipments.filter(i => COMMON.validateType(i.type, type))
}

export function filterTypes(equipments, types) {
    return equipments.filter(i => types.some(type => COMMON.validateType(i.type, type)))
}

export function removeSuperflux(equipments = [], equipsOfType, maxCount) {
    if (equipsOfType.length > maxCount) {
        const toRemove = equipsOfType.slice(equipsOfType.length - maxCount, equipsOfType.length - 1)
        console.log({ toRemove })
        return equipments.filter(equip => toRemove.every(toRm => toRm._id !== equip._id))
    }
    return equipments
}

export async function removeSuperfluxElements(equipments = []) {
    if (equipments.length > 0) {
        let toReturn = equipments

        toReturn = removeSuperflux(toReturn, filterType(equipments, 'HAT'), 1)
        toReturn = removeSuperflux(toReturn, filterType(equipments, 'AMULET'), 1)
        toReturn = removeSuperflux(toReturn, filterType(equipments, 'RING'), 2)
        toReturn = removeSuperflux(toReturn, filterType(equipments, 'SHIELD'), 1)
        toReturn = removeSuperflux(toReturn, filterType(equipments, 'BELT'), 1)
        toReturn = removeSuperflux(toReturn, filterType(equipments, 'BOOTS'), 1)
        toReturn = removeSuperflux(toReturn, filterTypes(equipments, ['DOFUS', 'TROPHY']), 6)
        toReturn = removeSuperflux(toReturn, filterTypes(equipments, ['CLOAK', 'BACKPACK']), 1)
        toReturn = removeSuperflux(toReturn, filterTypes(equipments, ['PET', 'PETSMOUNT', 'MOUNT']), 1)
        toReturn = removeSuperflux(toReturn, filterTypes(equipments, WEAPONS.ENUM), 1)

        return toReturn
    }
}


export async function verifyBothAreSameCategory(firstEquip, secondEquip) {
    if (!firstEquip || !secondEquip) return null
    return firstEquip.category === secondEquip.category
}