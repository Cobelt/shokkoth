import mongoose from 'mongoose';
import Stuffs from './stuffs';
import { updateLastModifDate } from '../utils/common';

const CharactersSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: 'Please give me a pseudo',
    },
    lvl: {
        type: Number,
        default: 200,
    },
    classe: {
        type: Number,
        min: 1,
        max: 18,
        required: 'Pas de classe définie',
    },

    stuffs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Stuffs',
        default: [],
    },


    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



CharactersSchema.pre('save', updateLastModifDate);


const Characters = mongoose.model('Characters', CharactersSchema);
export default Characters;
