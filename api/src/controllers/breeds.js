import mongoose from 'mongoose';
import { BREEDS as ALL_BREEDS } from '../constants/characters';

const Breeds = mongoose.model('Breeds');


const _update = function(itemId, newEquipment) {
    let toReturn = newEquipment;
    Breeds.findOneAndUpdate({ _id: itemId }, newEquipment, { returnNewDocument: true }, function(err, equipment) {
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



export const saveAllBreeds = function(req, res, next) {
  ALL_BREEDS.map(breed, index) {
    Breeds.findOneAndUpdate({ _id: index }, newEquipment, { returnNewDocument: true }, function(err, equipment) {
  }
}
