import mongoose from 'mongoose';
import { WeaponsTypes, translateWeaponsTypes } from '../constants/weapons';

const Equipment = mongoose.model('Equipments');
import { getParam, setLocale, getLocale } from '../utils/common';


// // ENTRY POINTS
export const initLocalState = function(req, res, next) {
  setLocale(res, { typesList: WeaponsTypes, model: Equipment, translations: translateWeaponsTypes })
  next();
}




export const create = function(req, res) {
    const newEquipment = new Equipment(getLocale(res, 'weapon'));
    removeLocale('weapon');

    // do checks here

    newEquipment.save(function(err, weapon) {
        if (err) res.send(err);
        res.json(weapon);
    });
};


export const get = function(req, res) {
    const itemId = getParam(req, 'itemId');
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should search for !'));

    Equipment.findById(itemId, function(err, weapon) {
        if (err) res.send(err);
        res.json(weapon);
    });
};



export const update = function(req, res) {
    const itemId = getParam(req, 'itemId');
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should update !'));

    Equipment.findOneAndUpdate({_id: itemId}, req.body, { new: true }, function(err, weapon) {
        if (err) res.send(err);
        res.json(weapon);
    });
};


export const remove = function(req, res) {
    const itemId = getParam(req, 'itemId');
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should remove !'));

    Equipment.remove({ _id: itemId
    }, function(err, weapon) {
        if (err)
            res.send(err);
        res.json({ message: `We successfully removed ${itemId}`});
    });
};


// // SENDERS
export const sendWeapons = function(req, res) {
  res.send(getLocale(res, 'weapons'));
}
