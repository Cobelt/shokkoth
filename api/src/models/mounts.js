import mongoose from 'mongoose';
import { MOUNTS } from '../constants/mounts';

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


    updated_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});



MountsSchema.pre('save', function (next) {
    try {
        this.updated_at = Date.now();
        next();
    } catch (err) {
        next(err);
    }
});


const Mounts = mongoose.model('Mounts', MountsSchema);
export default Mounts;