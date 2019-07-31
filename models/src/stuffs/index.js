import mongoose from 'mongoose';
import get from 'lodash.get';
import { updateLastModifDate } from '../utils';

import Equipments from '../equipments';
import Likes from '../likes';

import * as COMMON from '../constants/common';
import * as EQUIPMENTS from '../constants/equipments';
import * as WEAPONS from '../constants/weapons';

export const StuffsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Please give me a name',
    },

    tags: {
        type: Array,
        default: [],
    },

    // Chapeau
    hat: {
        type: Number,
        ref: 'Equipments',
        validate: [hat => EQUIPMENTS.validateType(hat.type, 'HAT'), 'Hat should be type hat']
    },
    // Cape ou sac a dos
    cloakOrBackpack: {
        type: Number,
        ref: 'Equipments',
        validate: [cloakOrBackpack => EQUIPMENTS.validateType(cloakOrBackpack.type, 'CLOAK') || EQUIPMENTS.validateType(cloakOrBackpack.type, 'BACKPACK'), 'Cloak/Backpack should be type Cloak or type Backpack']
    },
    // Amulette
    amulet: {
        type: Number,
        ref: 'Equipments',
        validate: [amulet => EQUIPMENTS.validateType(amulet.type, 'AMULET'), 'Amulet should be type amulet']
    },
    // Anneau
    rings: {
        type: [Number],
        ref: 'Equipments',
        validate: [
            { validator: rings => eachShouldBeOneOfType(rings, ['RING']), msg: 'Rings should be rings' },
            { validator: v => v.length <= 2, msg: 'You want to equip more than 2 rings' },
        ]
    },
    // Ceinture
    belt: {
        type: Number,
        ref: 'Equipments',
        validate: [belt => EQUIPMENTS.validateType(belt.type, 'BELT'), 'Belt should be type belt']
    },
    // Bottes
    Boots: {
        type: Number,
        ref: 'Equipments',
        validate: [boots => EQUIPMENTS.validateType(boots.type, 'BOOTS'), 'Boots should be type boots']
    },
    // Arme
    Weapon: {
        type: Number,
        ref: 'Equipments',
        validate: [weapon => WEAPONS.getKey(weapon.type), 'Weapon should be a type of weapon']
    },
    // Bouclier
    Shield: {
        type: Number,
        ref: 'Equipments',
        validate: [shield => EQUIPMENTS.validateType(shield.type, 'SHIELD'), 'Shield should be type shield']
    },
    // Trophées et dofus
    dofusAndTrophies: {
        type: [Number],
        ref: 'Equipments',
        validate: [
            { validator: dofusOrTrophies => eachShouldBeOneOfType(dofusOrTrophies, ['DOFUS', 'TROPHY']), msg: 'Dofus/Trophies should be only types dofus or trophies' },
            { validator: v => v.length <= 6, msg: 'You want to equip more than 6 Dofus and/or trophies' },
        ]
    },

    pet: {
        type: Number,
        ref: 'Equipments',
    },

    // skin: {
    //     hat: {
    //         type: Number,
    //         ref: 'Equipments',
    //         validate: [hat => shouldBeOneOfType(hat, ['HAT', 'LIVING_OBJECT', 'CEREMONIAL']), 'Skin for hat should be one of type: hat, living object or ceremonial object'],
    //     },
    //     cloakOrBackpack: {
    //         type: Number,
    //         ref: 'Equipments',
    //         validate: [cloakOrBackpack => shouldBeOneOfType(cloakOrBackpack, ['CLOAK', 'BACKPACK', 'LIVING_OBJECT', 'CEREMONIAL']), 'Skin for cloak/backpack should be one of type: cloak, backpack, living object or ceremonial object'],
    //     },
    //     shield: {
    //         type: Number,
    //         ref: 'Equipments',
    //         validate: [shield => shouldBeOneOfType(shield, ['SHIELD', 'LIVING_OBJECT', 'CEREMONIAL']), 'Skin for shield should be one of type: shield, living object or ceremonial object'],
    //     },
    //     mountOrPet: {
    //         type: Number,
    //         ref: 'Equipments',
    //         validate: [mountOrPet => shouldBeOneOfType(mountOrPet, ['MOUNT', 'PET', 'PETSMOUNT', 'LIVING_OBJECT', 'CEREMONIAL']), 'Skin for shield should be one of type: shield, living object or ceremonial object'],
    //     },
    // },


    public: {
        type: Boolean,
        default: true,
    },

    imgUrl: String,

    likes: [{
      type: [mongoose.types.ObjectId],
      ref: 'Likes',
      default: [],
    }],


    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});


function shouldBeOneOfType(item, types) {
    return types.some(type => COMMON.validateType(item.type, type))
}

function eachShouldBeOneOfType(items, types) {
    return items.every(item => shouldBeOneOfType(item, types));
}


StuffsSchema.pre('save', updateLastModifDate);

const Stuffs = mongoose.model('Stuffs', StuffsSchema);
export default Stuffs;
