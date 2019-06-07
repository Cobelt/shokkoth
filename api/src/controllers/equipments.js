import axios from 'axios';
import mongoose from 'mongoose';
import { EquipmentsTypes, translateEquipmentsTypes, HIGHEST_LEVEL } from '../constants/equipments';

const Equipment = mongoose.model('Equipments');
import { getParam, setLocale, getLocale } from '../utils/common';

export const _save = toSave => new Promise((resolve, reject) => {
  toSave.save(function(err, saved) {
    if(err) {
        if (err.code === 11000) {
          Equipment.findOneAndUpdate({ _id: toSave.id }, toSave, { returnNewDocument: true }, (updateError, updated) => {
            if (updateError) {
              reject(updateError)
            }
            else {
              resolve(updated);
            }
          });
        }
        else {
          reject(err);
        }
    }
    resolve(saved);
  });
});

// // ENTRY POINTS
export const getSearchParams = function(req, res, next) {
    const { currentLevel = 200, lvlMin = currentLevel-50, lvlMax = currentLevel+50, perPage = 100, page = 0, type = '', order = JSON.stringify({ lvl: -1, type: 1 }) } = getParam(req, ['currentLevel', 'lvlMin', 'lvlMax', 'perPage', 'page', 'type', 'order']);

    const types = type.split(',').map(type => EquipmentsTypes.some(t => t.normalize('NFC').toLowerCase() === type.normalize('NFC').toLowerCase()) ? type : translateEquipmentsTypes[type]);
    console.log('types found :', types);
    const trueType = `(${types.join('|')})`;

    setLocale(res, { currentLevel, lvlMin, lvlMax, perPage, page, type: trueType, order: JSON.parse(order) });

    next();
}


export const getAll = function(req, res) {
    Equipment.find({}, 'name', function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};



export const search = function(req, res, next) {
    const { currentLevel, lvlMin, lvlMax, perPage, page, type, order } = getLocale(res, ['currentLevel', 'lvlMin', 'lvlMax', 'perPage', 'page', 'type', 'order']);

    const filters = {};
    if (type) filters.type = new RegExp(type, 'i');
    if (currentLevel) filters.lvl = { $gte: Math.max(lvlMin, 1), $lte: Math.min(lvlMax, 200) }

    Equipment.find(filters)
      .sort(order)
      .skip(parseInt(perPage * page, 10))
      .limit(parseInt(perPage, 10))
      .exec((err, equipments) => {
        if (err) return next(err);
        setLocale(res, { equipments });
        next();
      });
};





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
    const { itemId } = req.params || {};
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should search for !'));

    Equipment.findById(itemId, function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};



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


// // SENDERS
export const sendEquipments = function(req, res) {
  res.send(getLocale(res, 'equipments'));
}
// // SENDERS
export const sendTypes = function(req, res) {
  res.send(EquipmentsTypes);
}
