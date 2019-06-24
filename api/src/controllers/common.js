import mongoose from 'mongoose';
import { getParam, setLocale, getLocale, toURLValid } from '../utils/common';

import { AllTypes, allTranslations } from '../constants/common';


const Equipment = mongoose.model('Equipments');


export const _save = (model, toSave) => new Promise((resolve, reject) => {
  const Model = model;

  toSave.save(function(err, saved) {
    if(err) {
        if (err.code === 11000) {
          Model.findOneAndUpdate({ _id: toSave.id }, toSave, { returnNewDocument: true }, (updateError, updated) => {
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
export const initLocalState = function(req, res, next) {
  setLocale(res, { typesList: AllTypes, model: Equipment, translations: allTranslations })
  next();
}



export const createTypesRegex = ({ chosenTypes, TYPES, translations }) => {
  const types = chosenTypes.split(',').map(type => TYPES.some(t => toURLValid(type) === toURLValid(t)) ? type : translations[type]).filter(e => !!e);
  return `(${types.join('|')})`;
}


export const getIdsParam = function(req, res, next) {
  const ids = getParam(req, 'ids');
  setLocale(res, { ids });
  next();
}

export const getPlainTextParam = function(req, res, next) {
  const plainText = getParam(req, 'plainText');
  setLocale(res, { plainText });
  next();
}


export const getSearchParams = function(req, res, next) {
    const { typesList: TYPES, translations } = getLocale(res, ['typesList', 'translations']);

    const {
      levelMin = 1,
      levelMax = 200,
      perPage = 100,
      page = 0,
      types = '',
      order = JSON.stringify({ level: -1, type: 1, _id: -1 })
    } = getParam(req, ['levelMin', 'levelMax', 'perPage', 'page', 'types', 'order']);

    let regexTypes = createTypesRegex({ chosenTypes: types, TYPES, translations });

    if (regexTypes.match(/\(\|?\)/)) {
      if (types !== '') {
        return next('Sorry but the type(s) you mentioned doesn\'t match anything of this route.')
      }
      else {
        regexTypes = createTypesRegex({ chosenTypes: TYPES.join(','), TYPES, translations });
      }
    }

    setLocale(res, { levelMin, levelMax, perPage, page, types: regexTypes, order: JSON.parse(order) });
    next();
}


export const search = function(req, res, next) {
    const { model: Model, levelMin, levelMax, perPage, page, types, order } = getLocale(res, ['model', 'levelMin', 'levelMax', 'perPage', 'page', 'types', 'order']);

    const filters = {};
    if (types) filters.type = new RegExp(types, 'i');

    filters.level = { $gte: Math.max(levelMin, 1), $lte: Math.min(levelMax, 200) }

    Model.find(filters)
      .sort(order)
      .skip(parseInt(perPage * page, 10))
      .limit(parseInt(perPage, 10))
      .exec((err, searchResult) => {
        if (err) return next(err);
        setLocale(res, { searchResult });
        next();
      });
};


export const searchPlainText = function(req, res, next) {
    const { model: Model, levelMin, levelMax, perPage, page, types, order, plainText } = getLocale(res, ['model', 'levelMin', 'levelMax', 'perPage', 'page', 'types', 'order', 'plainText']);

    const filters = {};
    if (types) filters.type = new RegExp(types, 'i');

    filters.level = { $gte: Math.max(levelMin, 1), $lte: Math.min(levelMax, 200) }

    Model.find({$text: {$search: plainText}})
      .sort(order)
      .skip(parseInt(perPage * page, 10))
      .limit(parseInt(perPage, 10))
      .exec((err, searchResult) => {
        if (err) return next(err);
        setLocale(res, { searchResult });
        next();
      });
};


export const getAll = function(req, res) {
  const { typesList: TYPES, model: Model, translations } = getLocale(res, ['typesList', 'model', 'translations']);

  const filters = {};
  const types = createTypesRegex({ chosenTypes: TYPES.join(','), TYPES, translations });
  if (types) filters.type = new RegExp(types, 'i');

  Model.find(filters, 'name', function(err, result) {
      if (err) res.send(err);
      res.json(result);
  });
};

export const get = function(req, res) {
    const Model = getLocale(res, 'model');

    const itemId = getParam(req, 'itemId');
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should search for !'));

    Model.findById(itemId, function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};

export const getEquipements = function(req, res) {
    const { model: Model, ids } = getLocale(res, ['model', 'ids']);

    if (!ids) return res.send(new Error('No ids given. Please tell me what I should search for !'));

    Model.find()
      .where('_id')
      .in(ids)
      .exec(function(err, equipments) {
        if (err) res.send(err);
        res.json(equipments);
      });
};


export const sendSearchResult = function(req, res) {
  res.send(getLocale(res, 'searchResult'));
}

export const sendTypes = function(req, res) {
  res.send(getLocale(res, 'typesList'));
}
