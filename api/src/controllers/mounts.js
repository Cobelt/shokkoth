import mongoose from 'mongoose';
import { MountsTypes, translateMountsTypes } from '../constants/mounts';

const Equipment = mongoose.model('Equipments');
import { getParam, setLocale, getLocale } from '../utils/common';


// // ENTRY POINTS
export const initLocalState = function(req, res, next) {
  setLocale(res, { typesList: MountsTypes, model: Equipment, translations: translateMountsTypes, toPopulate: ['set'] })
  next();
}




export const create = function(req, res) {
    const newEquipment = new Equipment(getLocale(res, 'pet'));
    removeLocale('pet');

    // do checks here

    newEquipment.save(function(err, pet) {
        if (err) res.send(err);
        res.json(pet);
    });
};


export const get = function(req, res) {
    const itemId = getParam(req, 'itemId');
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should search for !'));

    Equipment.findById(itemId, function(err, pet) {
        if (err) res.send(err);
        res.json(pet);
    });
};



export const update = function(req, res) {
    const itemId = getParam(req, 'itemId');
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should update !'));

    Equipment.findOneAndUpdate({_id: itemId}, req.body, { new: true }, function(err, pet) {
        if (err) res.send(err);
        res.json(pet);
    });
};


export const remove = function(req, res) {
    const itemId = getParam(req, 'itemId');
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should remove !'));

    Equipment.remove({ _id: itemId
    }, function(err, pet) {
        if (err)
            res.send(err);
        res.json({ message: `We successfully removed ${itemId}`});
    });
};


// // SENDERS
export const sendMounts = function(req, res) {
  res.send(getLocale(res, 'mounts'));
}
