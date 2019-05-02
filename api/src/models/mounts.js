import mongoose from 'mongoose';
import { MOUNTS } from '../constants/mounts';
import { updateLastModifDate } from '../utils/common';

const MountsSchema = new mongoose.Schema({
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
        enum: [MOUNTS],
        required: 'Please give me the type of mount I am !'
    },

    stats: {
        type: Array,
        default: [],
    },

    characteristic: {
        type: Array,
        default: [],
    },

    condition: {
        type: Array,
        default: [],
    },

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


MountsSchema.pre('save', updateLastModifDate);


const Mounts = mongoose.model('Mounts', MountsSchema);
export default Mounts;
