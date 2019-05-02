import axios from 'axios';
import mongoose from 'mongoose';

const Stuff = mongoose.model('Stuffs');


const _update = function(itemId, newStuff) {
    let toReturn = newStuff;
    Stuff.findOneAndUpdate({ _id: itemId }, newStuff, { returnNewDocument: true }, function(err, stuff) {
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
    Stuff.find({}, 'name', function(err, stuff) {
        if (err) res.send(err);
        res.json(stuff);
    });
};



export const create = function(req, res) {
    const newStuff = new Stuff(req.body);

    // do checks here
    newStuff.save(function(err, stuff) {
        if (err) res.send(err);
        res.json(stuff);
    });
};


export const get = function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should search for !'));

    Stuff.findById(itemId, function(err, stuff) {
        if (err) res.send(err);
        res.json(stuff);
    });
};


export const update = function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should update !'));

    Stuff.findOneAndUpdate({_id: itemId}, req.body, { new: true }, function(err, stuff) {
        if (err) res.send(err);
        res.json(stuff);
    });
};


export const remove = function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should remove !'));

    Stuff.remove({ _id: itemId
    }, function(err, stuff) {
        if (err)
            res.send(err);
        res.json({ message: `We successfully removed ${itemId}`});
    });
};
