import axios from 'axios';
import mongoose from 'mongoose';
import { EquipmentsTypes } from '../constants/equipments';

const Equipment = mongoose.model('Equipments');


const _update = function(itemId, newEquipment) {
    let toReturn = newEquipment;
    Equipment.findOneAndUpdate({ _id: itemId }, newEquipment, { returnNewDocument: true }, function(err, equipment) {
        if (err) toReturn = err;
        else toReturn = equipment;
    });
    return toReturn;
};

const _save = toSave => new Promise((resolve, reject) => {
  toSave.save(function(err, equipment) {
    if(err) {
        if (err.code === 11000) {
            resolve(_update(toSave._id, toSave));
        }
        else {
            reject(err);
        }
    }
    resolve(equipment);
  });
});



export const getAll = function(req, res) {
    Equipment.find({}, 'name', function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};

export const getDetailed = function(req, res) {
    const { perPage = 100, page = 0 } = req.params || {};
    Equipment
        .find({ })
        .skip(perPage * page)
        .limit(perPage)
        .exec(function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};





export const create = function(req, res) {
    const newEquipment = new Equipment(req.body);

    // do checks here

    newEquipment.save(function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};


export const get = function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should search for !'));

    Equipment.findById(itemId, function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};


export const searchByType = function(req, res) {
    const { type } = req.params || {};
    console.log('=>', type);
    if (!type) return res.send(new Error('No type given. Please tell me what I should search for !'));

    Equipment.find({ type: new RegExp(type, 'i') }, 'name', function(err, equipments) {
        if (err) res.send(err);
        else res.json(equipments);
    });
}



export const update = function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should update !'));

    Equipment.findOneAndUpdate({_id: itemId}, req.body, { new: true }, function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};


export const remove = function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should remove !'));

    Equipment.remove({ _id: itemId
    }, function(err, equipment) {
        if (err)
            res.send(err);
        res.json({ message: `We successfully removed ${itemId}`});
    });
};
