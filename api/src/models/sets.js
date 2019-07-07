import mongoose from 'mongoose';
import { updateLastModifDate } from '../utils/common';

const SetsSchema = new mongoose.Schema({
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


    imgUrl: String,
    url: String,

    bonus: {
      type: Array,
      default: [],
    },

    equipments: {
      type: [Number],
      ref: 'Equipments',
      default: []
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


SetsSchema.pre('save', updateLastModifDate);

const Sets = mongoose.model('Sets', SetsSchema);
export default Sets;
