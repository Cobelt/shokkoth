import mongoose from 'mongoose';
import { updateLastModifDate } from '../utils/common';

const BreedsSchema = new mongoose.Schema({
    _id: Number,

    name: {
        type: String,
        required: 'Please give me a name',
    },

    imgUrl: String,
    url: String,

    description: String,

    roles: {
      type: [String],
      default: []
    },

    spells: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Spells',
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



BreedsSchema.pre('save', updateLastModifDate);


const Breeds = mongoose.model('Breeds', BreedsSchema);
export default Breeds;
