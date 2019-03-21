import mongoose from 'mongoose';
import Stuffs from './stuffs.js';

const CharactersSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: 'Please give me a pseudo',
    },
    level: {
        type: Number,
        required: 'Please give me a level',
    },
    breed: {
        type: Number,
        min: 1,
        max: 18,
        required: 'Please give me a breed id'
    },

    equipments: {
        type: [Stuffs],
        default: [],
    },

    imgUrl: String,


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