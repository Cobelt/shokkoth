import mongoose from 'mongoose';
import { PetsTypes } from '../constants/pets';
import { updateLastModifDate } from '../utils/common';

const PetsSchema = new mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: 'Please give me a name',
    },
    lvl: {
        type: Number,
        required: 'Please give me a lvl',
    },
    type: {
        type: String,
        enum: PetsTypes,
        required: 'Please give me the type of pet I am !'
    },

    description: String,

    stats: {
        type: Array,
        default: [],
    },

    condition: {
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



PetsSchema.pre('save', updateLastModifDate);


const Pets = mongoose.model('Pets', PetsSchema);
export default Pets;
