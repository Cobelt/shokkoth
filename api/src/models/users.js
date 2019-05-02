import mongoose from 'mongoose';
import { updateLastModifDate } from '../utils/common';

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        index: {
            unique: true
        },
        required: 'Please choose a username',
    },

    hash: {
        type: String,
        required: true,
        match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
        minlength: 12
    },

    characters: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Characters',
      default: []
    },

    // goals: Array,


    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});


UsersSchema.pre('save', updateLastModifDate);
UsersSchema.pre('save', function (next) {
    try {
        if (this.isModified('password') || this.isNew) {

        }
        next();
    } catch (err) {
        next(err);
    }
});


const Users = mongoose.model('Users', UsersSchema);
export default Users;
