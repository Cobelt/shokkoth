import mongoose from 'mongoose';

import { CHARACTERS, COMMON, WEAPONS, utils } from 'shokkoth-constants';

export const StuffsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Please give me a name',
    },

    gender: {
      type: String,
      enum: CHARACTERS.ENUM,
      default: CHARACTERS.DEFAULT,
    },

    breed: {
        type: Number,
        ref: 'Breeds',
        required: 'Pas de classe définie',
    },
    
    level: {
        type: Number,
        min: 1,
        default: 200,
    },

    // tags: {
    //     type: Array,
    //     default: [],
    // },

    stats: [{
      attributed: {
        VITALITY: { type: Number, default: 0 },
        WIDSDOM: { type: Number, default: 0 },
        STRENGTH: { type: Number, default: 0 },
        INTELLIGENCE: { type: Number, default: 0 },
        CHANCE: { type: Number, default: 0 },
        AGILITY: { type: Number, default: 0 },
      },
      parchment: {
        VITALITY: { type: Number, default: 0 },
        WIDSDOM: { type: Number, default: 0 },
        STRENGTH: { type: Number, default: 0 },
        INTELLIGENCE: { type: Number, default: 0 },
        CHANCE: { type: Number, default: 0 },
        AGILITY: { type: Number, default: 0 },
      },
    }],

    equipments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipments',
    }],

    public: {
        type: Boolean,
        default: true,
    },

    // likes: [{
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: 'Likes',
    //   default: [],
    // }],


    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export function filterType(equipments, type) {
  return equipments.filter(i => COMMON.validateType(i.type, type));
}

export function filterTypes(equipments, types) {
  return equipments.filter(i => types.some(type => COMMON.validateType(i.type, type)));
}

export function removeSuperflux(equipments = [], equipsOfType, maxCount) {
  if (equipsOfType.length > maxCount) {
    const toRemove = equipsOfType.slice(equipsOfType.length - maxCount, equipsOfType.length);
    return equipments.filter(equip => toRemove.every(toRm => toRm._id !== equip._id));
  }
  return equipments;
}

export async function removeSuperfluxElements(equipments = []) {
  if (equipments.length > 0) {
    const equips = await Equipments.find({ _id: { $in: equipments }}).exec();
    let toReturn = equips;
    // const differenceLength = equipments.length - equips.length;
    // if (differenceLength > 0) throw new Error(`${differenceLength} ids were not found in database.`);

    toReturn = removeSuperflux(toReturn, filterType(equips, 'HAT'), 1);
    toReturn = removeSuperflux(toReturn, filterType(equips, 'AMULET'), 1);
    toReturn = removeSuperflux(toReturn, filterType(equips, 'RING'), 2);
    toReturn = removeSuperflux(toReturn, filterType(equips, 'SHIELD'), 1);
    toReturn = removeSuperflux(toReturn, filterType(equips, 'BELT'), 1);
    toReturn = removeSuperflux(toReturn, filterType(equips, 'BOOTS'), 1);
    toReturn = removeSuperflux(toReturn, filterTypes(equips, ['DOFUS', 'TROPHY']), 6);
    toReturn = removeSuperflux(toReturn, filterTypes(equips, ['CLOAK', 'BACKPACK']), 1);
    toReturn = removeSuperflux(toReturn, filterTypes(equips, ['PET', 'PETSMOUNT', 'MOUNT']), 1);
    toReturn = removeSuperflux(toReturn, filterTypes(equips, WEAPONS.ENUM), 1);

    // console.log('will return :', toReturn);
    toReturn = toReturn.map(equip => equip._id);

    // console.log('return :', toReturn);

    equipments = toReturn;
    return toReturn;
  }
}

export async function verifyBothAreSameCategory(firstEquip, secondEquip) {
  if (!firstEquip || !secondEquip) return;
  const equips = await Equipments.find({ _id: { $in: [firstEquip, secondEquip] }}).exec();
  if (equips.length < 2) return;
  return equips[0].category === equips[1].category;
}


StuffsSchema.pre(['validate', 'updateOne', 'findOneAndUpdate'], async function () {
  await removeSuperfluxElements(this.equipments);
});

StuffsSchema.pre('save', utils.updateLastModifDate);

const Stuffs = mongoose.model('Stuffs', StuffsSchema);
export default Stuffs;
