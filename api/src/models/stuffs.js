import mongoose from 'mongoose';
import get from 'lodash.get';

import Equipments from './equipments.js';

import {
    AMULET,
    BACKPACK,
    BELT,
    BOOTS, CEREMONIAL,
    CLOAK,
    DOFUS,
    HAT,
    LIVING_OBJECT,
    RING,
    SHIELD,
    TROPHY
} from '../constants/equipments';
import {Mounts} from "../constants/mounts";
import {PET, PETSMOUNT} from "../constants/pets";


const StuffsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Please give me a pseudo',
    },
    breed: {
        type: Number,
        min: 1,
        max: 18,
        required: 'Please give me a breed'
    },

    tags: {
        type: Array,
        default: [],
    },

    // Chapeau
    hat: {
        type: Equipments,
        validate: [hat => hat.type === HAT, 'Hat should be type hat']
    },
    // Cape ou sac a dos
    cloakOrBackpack: {
        type: Equipments,
        validate: [cloakOrBackpack => cloakOrBackpack.type === CLOAK || cloakOrBackpack.type === BACKPACK, 'Cloak/Backpack should be type Cloak or type Backpack']
    },
    // Amulette
    amulet: {
        type: Equipments,
        validate: [amulet => amulet.type === AMULET, 'Amulet should be type amulet']
    },
    // Anneau
    rings: {
        type: [Equipments],
        validate: [
            { validator: rings => eachShouldBeOneOfType(rings, [RING]), msg: 'Rings should be rings' },
            { validator: v => v.length <= 2, msg: 'You want to equip more than 2 rings' },
        ]
    },
    // Ceinture
    belt: {
        type: Equipments,
        validate: [belt => belt.type === BELT, 'Belt should be type belt']
    },
    // Bottes
    Boots: {
        type: Equipments,
        validate: [boots => boots.type === BOOTS, 'Boots should be type boots']
    },
    // Bouclier
    Shield: {
        type: Equipments,
        validate: [shield => shield.type === SHIELD, 'Shield should be type shield']
    },
    // Trophées et dofus
    dofusAndTrophies: {
        type: [Equipments],
        validate: [
            { validator: dofusOrTrophies => eachShouldBeOneOfType(dofusOrTrophies, [DOFUS, TROPHY]), msg: 'Dofus/Trophies should be only types dofus or trophies' },
            { validator: v => v.length <= 6, msg: 'You want to equip more than 6 Dofus and/or trophies' },
        ]
    },
    mountOrPet: {
        use: {
            type: String,
            enum: ['Montilier', 'Familier', 'Monture'],
        },
        // mount: {
        //     type: Mount,
        // },
        // pet: {
        //     type: Pets,
        // }
        // petsmount: {
        //     type: Pets,
        // }
    },

    skin: {
        hat: {
            type: Equipments,
            validate: [hat => [HAT, LIVING_OBJECT, CEREMONIAL].includes(hat.type), 'Skin for hat should be one of type: hat, living object or ceremonial object'],
        },
        cloakOrBackpack: {
            type: Equipments,
            validate: [cloakOrBackpack => [CLOAK, BACKPACK, LIVING_OBJECT, CEREMONIAL].includes(cloakOrBackpack.type), 'Skin for cloak/backpack should be one of type: cloak, backpack, living object or ceremonial object'],
        },
        shield: {
            type: Equipments,
            validate: [shield => [SHIELD, LIVING_OBJECT, CEREMONIAL].includes(shield.type), 'Skin for shield should be one of type: shield, living object or ceremonial object'],
        }
        mountOrPet: {
            type: Equipments,
            validate: [mountOrPet => [Mounts, PET, PETSMOUNT, CEREMONIAL].includes(mountOrPet.type), 'Skin for shield should be one of type: shield, living object or ceremonial object'],
        }
    },


    public: {
        type: Boolean,
        default: true,
    },

    imgUrl: String,



    updated_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});


function eachShouldBeOneOfType(items, types) {
    let everythingFine = true;

    items.forEach(item => {
        if (!types.includes(item.type)) {
            everythingFine = false
        }
    });

    return everythingFine;
}


StuffsSchema.pre('save', function (next) {
    try {
        this.updated_at = Date.now();
        next();
    } catch (err) {
        next(err);
    }
});


const Stuffs = mongoose.model('Stuffs', StuffsSchema);
export default Stuffs;