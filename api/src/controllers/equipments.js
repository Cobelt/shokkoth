import mongoose from 'mongoose';
import { EquipmentsTypes, translateEquipmentsTypes } from '../constants/equipments';

const Equipment = mongoose.model('Equipments');
import { getParam, setLocale, getLocale } from '../utils/common';


// // ENTRY POINTS
export const initLocalState = function(req, res, next) {
  setLocale(res, { typesList: EquipmentsTypes, model: Equipment, translations: translateEquipmentsTypes, toPopulate: { path: 'set', select: '_id name level bonus equipments', populate: { path: 'equipments', select: '-recipe -createdAt -updatedAt' } } })
  next();
}



export const create = function(req, res) {
    const newEquipment = new Equipment(getLocale(res, 'equipment'));
    removeLocale('equipment');

    // do checks here

    newEquipment.save(function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};


export const get = function(req, res) {
    const itemId = getParam(req, 'itemId');
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should search for !'));

    Equipment.findById(itemId).populate('set').exec((err, equipment) => {
        if (err) res.send(err);
        res.json(equipment);
    });
};



export const update = function(req, res) {
    const itemId = getParam(req, 'itemId');
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should update !'));

    Equipment.findOneAndUpdate({_id: itemId}, req.body, { new: true }, function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};


export const remove = function(req, res) {
    const itemId = getParam(req, 'itemId');
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should remove !'));

    Equipment.remove({ _id: itemId
    }, function(err, equipment) {
        if (err)
            res.send(err);
        res.json({ message: `We successfully removed ${itemId}`});
    });
};


// // SENDERS
export const sendEquipments = function(req, res) {
  res.send(getLocale(res, 'equipments'));
}
// // SENDERS
export const sendTypes = function(req, res) {
  res.send(EquipmentsTypes);
}
