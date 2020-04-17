import axios from 'axios';
import mongoose from 'mongoose';
import { Characters, Users } from '../models';

import { getParam, setLocale, getLocale } from '../utils/common';



const _update = function(itemId, newCharacter) {
    let toReturn;
    Characters.findOneAndUpdate({ _id: itemId }, newCharacter, { returnNewDocument: true }, function(err, character) {
        if (err) toReturn = err;
        else toReturn = character;
    });
    return toReturn;
};

const _save = async (toSave) => {
    let toReturn;
    toSave.save(await function(err, character) {
        if(err) {
            if (err.code === 11000) {
                toReturn = _update(toSave._id, toSave);
            }
            else {
                throw err;
            }
        }
        else toReturn = character;
    });
    return toReturn;
};



export const getAll = function(req, res) {
    Characters.find({}, 'pseudo', function(err, character) {
        if (err) return res.send(err);
        res.json(character);
    });
};

export const getMine = function(req, res) {
  const decoded = getLocale(res, 'decoded');
  const { _id } = decoded || {};

  Users
    .findOne({ _id })
    .select('characters')
    .populate({ path: 'characters', populate: { path: 'stuffs' } })
    .exec((err, { characters } = {}) => {
      if (err) return res.status(500).send(err);
      if (!characters) return res.status(400).send('No character found');
      res.json(characters);
    })
}


export const getDetailed = function(req, res) {
    Characters
      .find({ })
      .populate('stuffs')
      .exec(function(err, character) {
        if (err) return res.send(err);
        res.json(character);
      });
};
