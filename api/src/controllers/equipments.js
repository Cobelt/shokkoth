import axios from 'axios';
import mongoose from 'mongoose';
import { EquipmentsTypes } from '../constants/equipments';

const Equipment = mongoose.model('Equipments');

const _formatExtractedStat = equipment => {
    const toReturn = equipment;
    if (equipment.stats.length > 0) {
        equipment.stats.forEach((stat, index) => {
            const statEntry = Object.entries(stat)[0];
            toReturn.stats[index] = { name: statEntry[0], ...statEntry[1] };
        });
    }
    return toReturn;
};

const _formatExtractedRecipe = equipment => {
    const toReturn = equipment;
    if (equipment.recipe.length > 0) {
        equipment.recipe.forEach((stat, index) => {
            const statEntry = Object.entries(stat)[0];
            toReturn.recipe[index] = { name: statEntry[0], ...statEntry[1] };
        });
    }
    return toReturn;
};


const _update = function(itemId, newEquipment) {
    let toReturn;
    Equipment.findOneAndUpdate({ _id: itemId }, newEquipment, { returnNewDocument: true }, function(err, equipment) {
        if (err) toReturn = err;
        else toReturn = equipment;
    });
    return toReturn;
};

const _save = async (toSave) => {
    let toReturn;
    toSave.save(await function(err, equipment) {
        if(err) {
            if (err.code === 11000) {
                toReturn = _update(toSave._id, toSave);
            }
            else {
                throw err;
            }
        }
        else toReturn = equipment;
    });
    return toReturn;
};



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


export const extractAll = async function(req, res) {
    const { data } = await axios.get(`https://dofapi2.herokuapp.com/equipments`);

    if (!data) res.send(new Error('Got no data from the API for https://dofapi2.herokuapp.com/equipments/'));

    console.log('=> Extracting', data.length, 'equipments !....');

    const extracted = [];
    data.map((equipmentFromAPI, index) => {
        const formattedEquipment = _formatExtractedRecipe(_formatExtractedStat(equipmentFromAPI));

        const newEquipment = new Equipment(formattedEquipment);
        try {
            const saved = _save(newEquipment);
            extracted.push(saved);
        }
        catch (e) {
            res.send(err);
        }
    });
    res.send(`Done for ${extracted.length} equipments`);
};

export const extract = async function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) res.send(new Error('No itemId given. Please tell me what I should extract !'));

    const { data } = await axios.get(`https://dofapi2.herokuapp.com/equipments/${itemId}`);
    if (!data) res.send(new Error(`Got no data from the API for https://dofapi2.herokuapp.com/equipments/${itemId}`));

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


export const searchByType = function(req, res) {
    const { type } = req.params || {};
    if (!type || !EquipmentsTypes.includes(type)) res.send(new Error('No type given. Please tell me what I should search for !'));

    Equipment.find({ type: new RegExp(type, 'i') }, 'name', function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
}



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
