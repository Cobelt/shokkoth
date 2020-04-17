import mongoose from 'mongoose';
import { PETS } from 'shokkoth-constants';
import { Equipments } from '../models';

import { getParam, setLocale, getLocale } from '../utils/common';

// // ENTRY POINTS
export const initLocalState = function(req, res, next) {
  setLocale(res, { CONSTANTS: PETS, model: Equipments, toPopulate: { path: 'set', populate: { path: 'equipments', select: '-recipe -createdAt -updatedAt' } } })
  next();
}




export const create = function(req, res) {
    const newEquipment = new Equipments(getLocale(res, 'pet'));
    removeLocale('pet');

    // do checks here

    newEquipment.save(function(err, pet) {
        if (err) res.send(err);
        res.json(pet);
    });
};


export const getOne = function(req, res) {
    const itemId = getParam(req, 'itemId');
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should search for !'));

    Equipments.findById(itemId).populate('set').exec((err, pet) => {
        if (err) res.send(err);
        res.json(pet);
    });
};



export const update = function(req, res) {
    const itemId = getParam(req, 'itemId');
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should update !'));

    Equipments.findOneAndUpdate({_id: itemId}, req.body, { new: true }, function(err, pet) {
        if (err) res.send(err);
        res.json(pet);
    });
};


export const remove = function(req, res) {
    const itemId = getParam(req, 'itemId');
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should remove !'));

    Equipments.remove({ _id: itemId
    }, function(err, pet) {
        if (err)
            res.send(err);
        res.json({ message: `We successfully removed ${itemId}`});
    });
};


// // SENDERS
export const sendPets = function(req, res) {
  res.send(getLocale(res, 'pets'));
}
