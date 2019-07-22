import mongoose from 'mongoose';
import FuzzySearchPlugin from 'mongoose-fuzzy-searching';

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

    equipments: [{
      type: Number,
      ref: 'Equipments',
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

SetsSchema.index({ name: 'text' })

// SetsSchema.plugin(FuzzySearchPlugin, {
//   fields: [{
//     name: 'name',
//     weight: 10,
//   }]
// });

SetsSchema.on('index', function(err) {
    if (err) {
        console.error('Sets index error: %s', err);
    } else {
        console.info('Sets indexing complete');
    }
});


SetsSchema.pre('save', updateLastModifDate);

const Sets = mongoose.model('Sets', SetsSchema);
export default Sets;
