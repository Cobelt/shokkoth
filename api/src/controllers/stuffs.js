import axios from 'axios';
import mongoose from 'mongoose';
import { Stuffs } from '../models';



const _update = function(itemId, newStuff) {
    let toReturn = newStuff;
    Stuffs.findOneAndUpdate({ _id: itemId }, newStuff, { returnNewDocument: true }, function(err, stuff) {
        if (err) toReturn = err;
        else toReturn = stuff;
    });
    return toReturn;
};

const _save = toSave => new Promise((resolve, reject) => {
  toSave.save(function(err, stuff) {
    if(err) {
        if (err.code === 11000) {
            resolve(_update(toSave._id, toSave));
        }
        else {
            reject(err);
        }
    }
    resolve(stuff);
  });
});



export const getAll = function(req, res) {
    Stuffs.find({}, 'name', function(err, stuff) {
        if (err) res.send(err);
        res.json(stuff);
    });
};



export const create = function(req, res) {
    const newStuff = new Stuffs(req.body);

    // do checks here
    newStuff.save(function(err, stuff) {
        if (err) res.send(err);
        res.json(stuff);
    });
};


export const getOne = function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should search for !'));

    Stuffs.findById(itemId, function(err, stuff) {
        if (err) res.send(err);
        res.json(stuff);
    });
};


export const update = function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should update !'));

    Stuffs.findOneAndUpdate({_id: itemId}, req.body, { new: true }, function(err, stuff) {
        if (err) res.send(err);
        res.json(stuff);
    });
};


export const remove = function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should remove !'));

    Stuffs.remove({ _id: itemId
    }, function(err, stuff) {
        if (err)
            res.send(err);
        res.json({ message: `We successfully removed ${itemId}`});
    });
};
