import mongoose from 'mongoose';
import { COMMON, utils } from 'shokkoth-constants';

const prefixError = ({ _id }, errorString) => `Error on an Equipment#${_id}: ${errorString}`;

export const EquipmentsSchema = new mongoose.Schema({
    ankamaId: {
      type: Number,
      unique: true,
      required: 'I need an _id',
    },

    name: {
      type: String,
      required: 'I need a name',
      index: true,
    },
    level: {
      type: Number,
      required: 'I need a level',
      index: true,
    },

    type: {
      type: String,
      enum: COMMON.ENUM,
      required: 'I need a type',
    },
    category: {
      type: String,
    },
    typeOrder: {
      type: Number,
      sparse: true,
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

EquipmentsSchema.on('index', function(err) {
  if (err) {
    console.error('Equipments index error: %s', err);
  } else {
    console.info('Equipments indexing complete');
  }
});


EquipmentsSchema.pre('save', utils.updateLastModifDate);


const Equipments = mongoose.model('Equipments', EquipmentsSchema);
export default Equipments;
