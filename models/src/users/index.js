import mongoose from 'mongoose';
import { updateLastModifDate } from '../utils';

import * as USERS from '../constants/users';

export const UsersSchema = new mongoose.Schema({
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

    role: {
      type: String,
      enum: USERS.ENUM,
      default: USERS.DEFAULT,
    },

    email: String,

    // goals: Array,

    lastConnection: Date,
    ip: String,

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
