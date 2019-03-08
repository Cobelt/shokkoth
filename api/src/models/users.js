import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
    _id: Number,

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

    characters: Array,
    goals: Array,


    updated_at: {
        type: Date,
        default: Date.now
    },
    saved_at: {
        type: Date,
        default: Date.now
    },
});


UsersSchema.pre('save', function (next) {
    try {
        this.updated_at = Date.now();
        if (this.isModified('password') || this.isNew) {

        }
        next();
    } catch (err) {
        next(err);
    }
});


const Users = mongoose.model('Users', UsersSchema);
export default Users;