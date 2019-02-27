import axios from 'axios';
import mongoose from 'mongoose';

const Equipment = mongoose.model('Equipments');

export const getAll = function(req, res) {
    Equipment.find({}, function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};

export const extract = async function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) res.send(new Error('No itemId given. Please tell me what I should extract !'));

    const response = await axios.get(`https://dofapi2.herokuapp.com/equipments/${itemId}`);
    console.log(response.data);

    const newEquipment = new Equipment(response.data);
    newEquipment.save(function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};

export const create = function(req, res) {
    const newEquipment = new Equipment(req.body);

    newEquipment.save(function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};


export const get = function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) res.send(new Error('No itemId given. Please tell me what I should search for !'));

    Equipment.findById(itemId, function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};


export const update = function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) res.send(new Error('No itemId given. Please tell me what I should update !'));

    Equipment.findOneAndUpdate({_id: itemId}, req.body, { new: true }, function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};


export const remove = function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) res.send(new Error('No itemId given. Please tell me what I should remove !'));

    Equipment.remove({ _id: itemId
    }, function(err, equipment) {
        if (err)
            res.send(err);
        res.json({ message: `We successfully removed ${itemId}`});
    });
};
