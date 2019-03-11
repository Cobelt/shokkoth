import mongoose from 'mongoose';
import { EquipmentsTypes } from '../constants/equipments';

const EquipmentsSchema = new mongoose.Schema({
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
        enum: EquipmentsTypes,
        required: 'Please give me the type of equipment I am !'
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

    recipe: {
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


    updated_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});



EquipmentsSchema.pre('save', function (next) {
    try {
        this.updated_at = Date.now();
        next();
    } catch (err) {
        next(err);
    }
});


const Equipments = mongoose.model('Equipments', EquipmentsSchema);
export default Equipments;