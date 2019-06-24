import mongoose from 'mongoose';

import { EquipmentsTypes } from '../constants/equipments';
import { WeaponsTypes } from '../constants/weapons';
import { PetsTypes } from '../constants/pets';
import { MountsTypes } from '../constants/mounts';


const prefixError = ({ _id }, errorString) => `Error on an Equipment#${_id}: ${errorString}`;

const EquipmentsSchema = new mongoose.Schema({
    _id: {
    type: Number,
    required: 'I need an _id',
    },
    name: {
      type: String,
      required: 'I need a name',
    },
    level: {
      type: Number,
      required: 'I need a level',
    },

    type: {
      type: String,
      enum: [EquipmentsTypes, WeaponsTypes, PetsTypes, MountsTypes].flat(),
      required: 'I need a type',
    },
    category: {
      type: String,
    },

    description: String,

    statistics: {
        type: Array,
        default: [],
    },
    characteristics: {
        type: Array,
        default: [],
    },
    passives: {
        type: Array,
        default: [],
    },

    conditions: {
        type: Array,
        default: [],
    },

    recipe: {
        type: Array,
        default: [],
    },

    setId: Number,


    imgUrl: String,
    url: String,


    // DB infos to compare with dofapi.fr !
    status: {
        type: {
            type: String,
            enum: ['Up to date', 'Outdated']
        },
    },


    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
EquipmentsSchema.index({"$**": "text" });


EquipmentsSchema.pre('save', function (next) {
    try {
        this.updatedAt = Date.now();
        next();
    } catch (err) {
        next(err);
    }
});


const Equipments = mongoose.model('Equipments', EquipmentsSchema);
export default Equipments;
