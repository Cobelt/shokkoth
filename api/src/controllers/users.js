import axios from 'axios';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../../env'

const User = mongoose.model('Users');

export const signIn = function(req, res) {
    const { password, ...userData } = req.body;

    bcrypt.hash(password, 16.5, function(err, hash) {
        if (err) res.send(err);

        userData.hash = hash;

        const newUser = new User(userData);

        newUser.save(function(err, user) {
            if (err) res.send(err);
            res.json(user);
        });
    });
};

export const login = function(req, res) {
    const { username, password } = req.body;

    User.findOne({ username }, function(err, user) {
        if (err) res.send(err);
        const { hash } = user;
        bcrypt.compare(password, hash, function(err, res) {
            if (err) res.send(err);
            jwt.sign({ user }, SECRET_KEY, { expiresIn: '7d' },(err, token) => {
                if(err) { console.log(err) }
                res.send(token);
            });
            res.send(res);
        });
    });

};


export const get = function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) res.send(new Error('No itemId given. Please tell me what I should search for !'));

    User.findById(itemId, function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};




export const update = function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) res.send(new Error('No itemId given. Please tell me what I should update !'));

    User.findOneAndUpdate({_id: itemId}, req.body, { new: true }, function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};


export const remove = function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) res.send(new Error('No itemId given. Please tell me what I should remove !'));

    User.remove({ _id: itemId
    }, function(err, equipment) {
        if (err) res.send(err);
        res.json({ message: `We successfully removed ${itemId}`});
    });
};
