import mongoose from 'mongoose';

const Set = mongoose.model('Sets');
import { getParam, setLocale, getLocale } from '../utils/common';


// // ENTRY POINTS
export const initLocalState = function(req, res, next) {
  setLocale(res, { model: Set, toPopulate: ['equipments'] })
  next();
}




export const create = function(req, res) {
    const newEquipment = new Set(getLocale(res, 'set'));
    removeLocale('set');

    // do checks here

    newEquipment.save(function(err, set) {
        if (err) res.send(err);
        res.json(set);
    });
};


export const get = function(req, res) {
    const setId = getParam(req, 'setId');
    if (!setId) return res.send(new Error('No setId given. Please tell me what I should search for !'));

    console.log('setId=', setId);
    Set.find({ _id: setId }).exec((err, set) => console.log(set));
    Set.findById(setId, function(err, set) {
        if (err) res.send(err);
        res.json(set);
    });
};



export const update = function(req, res) {
    const setId = getParam(req, 'setId');
    if (!setId) return res.send(new Error('No setId given. Please tell me what I should update !'));

    Set.findOneAndUpdate({_id: setId}, req.body, { new: true }, function(err, set) {
        if (err) res.send(err);
        res.json(set);
    });
};


export const remove = function(req, res) {
    const setId = getParam(req, 'setId');
    if (!setId) return res.send(new Error('No setId given. Please tell me what I should remove !'));

    Set.remove({ _id: setId
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
