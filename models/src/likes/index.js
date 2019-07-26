import mongoose from 'mongoose';
import { updateLastModifDate } from '../utils/common';

const LikesSchema = new mongoose.Schema({
    _id: Number,
    user: {
      type: Number,
      ref: 'Users',
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



LikesSchema.pre('save', updateLastModifDate);


const Likes = mongoose.model('Likes', LikesSchema);
export default Likes;
