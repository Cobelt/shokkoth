import mongoose from 'mongoose';
import { Sets } from '../models';

import { getParam, setLocale, getLocale } from '../utils/common';


// // ENTRY POINTS
export const initLocalState = function(req, res, next) {
  setLocale(res, { model: Sets })
  next();
}




export const create = function(req, res) {
    const newEquipment = new Sets(getLocale(res, 'set'));
    removeLocale('set');

    // do checks here

    newEquipment.save(function(err, set) {
        if (err) res.send(err);
        res.json(set);
    });
};


export const getOne = async function(req, res) {
  try {
    const setId = getParam(req, 'setId');
    if (!setId) throw new Error('No setId given. Please tell me what I should search for !', { statusCode: '400' });

    res.json(await Sets.findById(setId).exec());
  } catch(e) {
    res.send(e);
  }
};



export const update = function(req, res) {
    const setId = getParam(req, 'setId');
    if (!setId) return res.send(new Error('No setId given. Please tell me what I should update !'));

    Sets.findOneAndUpdate({_id: setId}, req.body, { new: true }, function(err, set) {
        if (err) res.send(err);
        res.json(set);
    });
};


export const remove = function(req, res) {
    const setId = getParam(req, 'setId');
    if (!setId) return res.send(new Error('No setId given. Please tell me what I should remove !'));

    Sets.remove({ _id: setId
    }, function(err, set) {
        if (err)
            res.send(err);
        res.json({ message: `We successfully removed ${setId}`});
    });
};


// // SENDERS
export const sendSets = function(req, res) {
  res.send(getLocale(res, 'sets'));
}
