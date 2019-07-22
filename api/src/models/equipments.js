import mongoose from 'mongoose';
import FuzzySearchPlugin from 'mongoose-fuzzy-searching';

import { updateLastModifDate } from '../utils/common';

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

    set: {
        type: Number,
        ref: 'Sets',
    },

    imgUrl: String,
    url: String,

    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

EquipmentsSchema.index({ name: 'text', type: 'text', category: 'text' })

// EquipmentsSchema.plugin(FuzzySearchPlugin, {
//   fields: [{
//     name: 'name',
//     minSize: 10,
//   }]
// });

EquipmentsSchema.on('index', function(err) {
  if (err) {
    console.error('Equipments index error: %s', err);
  } else {
    console.info('Equipments indexing complete');
  }
});


EquipmentsSchema.pre('save', updateLastModifDate);


const Equipments = mongoose.model('Equipments', EquipmentsSchema);
export default Equipments;
