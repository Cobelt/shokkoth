import mongoose from 'mongoose';
import get from 'lodash.get';
import { updateLastModifDate } from '../utils';
import { validateEquipments } from '../utils/stuffs';

import { EquipmentsSchema } from '../equipments';
import { LikesSchema } from '../likes';

import * as COMMON from '../constants/common';
import * as EQUIPMENTS from '../constants/equipments';
import * as WEAPONS from '../constants/weapons';
import * as PETS from '../constants/pets';

export const StuffsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Please give me a name',
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

    imgUrl: String,

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


StuffsSchema.pre('save', updateLastModifDate);
StuffsSchema.pre(['validate', 'updateOne', 'findOneAndUpdate'], async function () {
  await validateEquipments(this.equipments);
});

const Stuffs = mongoose.model('Stuffs', StuffsSchema);
export default Stuffs;
